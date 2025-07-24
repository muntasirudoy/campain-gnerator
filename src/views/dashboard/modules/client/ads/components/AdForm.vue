<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { useToast } from "@/composeable/useToast";
import { AdConstant } from "@/constant/ads";
import { adService } from "@/services/common/ads-service";
import { ChevronUpIcon, PlusIcon, XIcon } from "lucide-vue-next";
import { ErrorMessage, Field, useFieldArray, useForm } from "vee-validate";
import { computed, onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as yup from "yup";
const ageGroups = Object.entries(AdConstant.getAgeGroupOptions());
const fileInput = ref<HTMLInputElement | null>(null);
const videoFile = ref<File | string>();
const videoFileUrl = ref("");
const route = useRoute();
const router = useRouter();
const campaignId = route.query.campaignId;
const isUploading = ref(false);
const isDragOver = ref(false);
const file_path = ref("");
const isSubmitting = ref(false);
const { showToast } = useToast();
const isEditMode = computed(() =>
  Boolean(route.params.id && route.path.includes("edit"))
);
const adId = route.params.id;
const uploadProgress = ref(0);
const isLoadingAd = ref(false);

const sections = reactive({
  adName: true,
  targetAudience: true,
  adCreation: true,
});

const schema = yup.object({
  adName: yup.string().max(255).required("Ad name is required!"),
  campaign_id: yup.number().required(),
  audiences: yup
    .array()
    .of(
      yup.object({
        gender: yup.string().required("Gender is required"),
        age_group: yup.number().required("Age group is required"),
      })
    )
    .test(
      "no-duplicate-audience",
      "Duplicate audience not allowed",
      (audiences) => {
        if (!audiences) return true;
        const seen = new Set();
        for (const { gender, age_group } of audiences) {
          const key = `${gender}-${age_group}`;
          if (seen.has(key)) return false;
          seen.add(key);
        }
        return true;
      }
    ),
});
onMounted(async () => {
  if (isEditMode.value) {
    isLoadingAd.value = true;
    try {
      const { data } = await adService.getAd(Number(adId));

      if (data) {
        resetForm({
          values: {
            adName: data.name,
            campaign_id: String(data.campaign.id),
            audiences: data.audiences.map((a: any) => {
              return {
                gender: a.gender.value,
                age_group: a.age_group.value,
              };
            }),
          },
        });

        if (data.video_url) {
          videoFileUrl.value = data.video_url;
          file_path.value = data.video_url;
          videoFile.value = "existing";
        }
      }
    } catch (err) {
      showToast(
        "Failed to load ad",
        "Something went wrong loading ad data",
        "error"
      );
    } finally {
      isLoadingAd.value = false;
    }
  }
});
const { handleSubmit, values, resetForm, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    adName: "",
    campaign_id: campaignId,
    audiences: [
      {
        gender: AdConstant.AUDIENCE_TARGET_FEMALE,
        age_group: AdConstant.AGE_GROUP_18_24,
      },
    ],
  },
});

const { remove, push, fields } = useFieldArray("audiences");

const addAudience = () => {
  push({ gender: "", age_group: "" });
};

const removeAudience = (index: number) => {
  remove(index);
};

const triggerFileUpload = () => {
  fileInput.value?.click();
};

const handleVideoUpload = async (file: File) => {
  const payload = new FormData();
  payload.append("file_name", file.name);
  payload.append("file_type", file.type);

  isUploading.value = true;
  uploadProgress.value = 0;

  try {
    const { data } = await adService.adsVideoUpload(payload);
    const presignedUrl = data?.s3_data?.upload_url;
    file_path.value = data?.s3_data?.file_path;
    if (!presignedUrl) throw new Error("No presigned URL returned");

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        uploadProgress.value = Math.round((event.loaded / event.total) * 100);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200 || xhr.status === 204) {
        videoFileUrl.value = presignedUrl.split("?")[0];
        videoFile.value = file;
         isUploading.value = false;
      } else {
        throw new Error("Upload failed with status " + xhr.status);
      }
    };

    xhr.onerror = () => {
      throw new Error("Upload error occurred.");
    };

    xhr.send(file);
  } catch (error) {
    console.error("Upload failed:", error);
    showToast("Upload Failed", "Video upload failed!", "error");
  } 
};

const handleFileSelect = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) await handleVideoUpload(file);
};

const handleDragEnter = () => {
  isDragOver.value = true;
};

const handleDragLeave = () => {
  isDragOver.value = false;
};

const handleFileDrop = async (event: DragEvent) => {
  isDragOver.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) await handleVideoUpload(file);
};

const cancel = () => {
  resetForm();
  videoFile.value = null;
};
const removeVideo = () => {
  videoFile.value = null;
  videoFileUrl.value = "";
  file_path.value = "";
  uploadProgress.value = 0;
};
const save = handleSubmit(async (formValues) => {
  isSubmitting.value = true;

  const formData = new FormData();
  formData.append("name", formValues.adName);
  formData.append("campaign_id", String(Number(formValues.campaign_id)));
  if (file_path.value) {
    formData.append("video_url", file_path.value);
  }

  formValues.audiences.forEach((audience, i) => {
    formData.append(`audiences[${i}][gender]`, audience.gender);
    formData.append(
      `audiences[${i}][age_group]`,
      String(Number(audience.age_group))
    );
  });

  try {
    const res = isEditMode.value
      ? await adService.update(Number(adId), {
          ...formValues,
          name: formValues.adName,
        })
      : await adService.create(formData);
    if (res.success) {
      showToast(res.message, "Your ad is successfully created", "success");

      resetForm();
      videoFile.value = null;
      videoFileUrl.value = "";
      file_path.value = "";
      router.push(`/client/campaigns/${formValues.campaign_id}`);
    }
  } catch (error) {
    showToast(
      error.message || "Something went wrong!",
      "Failed to create ad!",
      "error"
    );
  } finally {
    isSubmitting.value = false;
  }
});

defineExpose({
  save,
  cancel,
  formData: computed(() => ({ ...values, videoFile: videoFile.value })),
});
</script>

<template>
  <form @submit.prevent="save">
    <div
      class="max-w-2xl mt-5 p-6 bg-gray-50 min-h-screen rounded-lg space-y-6"
    >
      <!-- Ad Name -->
      <div class="bg-white rounded-lg border">
        <div
          class="flex justify-between items-center p-4 cursor-pointer"
          @click="sections.adName = !sections.adName"
        >
          <h3 class="text-sm font-medium text-gray-900">Ad name</h3>
          <ChevronUpIcon
            :class="[
              'w-4 h-4 transition-transform',
              { 'rotate-180': !sections.adName },
            ]"
          />
        </div>
        <div v-show="sections.adName" class="px-4 pb-4">
          <div class="relative">
            <Field
              name="adName"
              type="text"
              as="input"
              maxlength="255"
              placeholder="Ad Name"
              class="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500"
            />
            <div class="absolute right-3 top-2 text-xs text-gray-400">
              {{ values.adName.length }}/255
            </div>
            <ErrorMessage name="adName" class="text-red-500 text-xs mt-1" />
          </div>
        </div>
      </div>

      <!-- Audience -->
      <div class="bg-white rounded-lg border">
        <div
          class="flex justify-between items-center p-4 cursor-pointer"
          @click="sections.targetAudience = !sections.targetAudience"
        >
          <h3 class="text-sm font-medium text-gray-900">Target Audience</h3>
          <ChevronUpIcon
            :class="[
              'w-4 h-4 transition-transform',
              { 'rotate-180': !sections.targetAudience },
            ]"
          />
        </div>
        <div v-show="sections.targetAudience" class="px-4 pb-4 space-y-4">
          <div
            v-for="(audience, index) in fields"
            :key="audience.key"
            class="border border-gray-200 rounded-md p-4 space-y-4"
          >
            <div class="flex justify-between items-center">
              <p class="text-xs font-medium text-gray-600">
                Audience #{{ index + 1 }}
              </p>
              <button
                v-if="index > 0"
                type="button"
                @click="removeAudience(index)"
              >
                <XIcon class="w-4 h-4 text-red-500" />
              </button>
            </div>

            <!-- Gender -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div class="flex space-x-4">
                <label class="flex items-center">
                  <Field
                    type="radio"
                    :name="`audiences[${index}].gender`"
                    :value="AdConstant.AUDIENCE_TARGET_FEMALE"
                    v-model="values.audiences[index].gender"
                    class="w-4 h-4"
                  />
                  <span class="ml-2 text-sm">Female</span>
                </label>
                <label class="flex items-center">
                  <Field
                    type="radio"
                    :name="`audiences[${index}].gender`"
                    :value="AdConstant.AUDIENCE_TARGET_MALE"
                    v-model="values.audiences[index].gender"
                    class="w-4 h-4"
                  />
                  <span class="ml-2 text-sm">Male</span>
                </label>
              </div>
              <ErrorMessage
                :name="`audiences[${index}].gender`"
                class="text-red-500 text-xs mt-1"
              />
            </div>

            <!-- Age Group -->
            <div>
              <label class="block text-xs font-medium text-gray-700 mb-1">
                Age Group
              </label>
              <Field
                as="select"
                :name="`audiences[${index}].age_group`"
                v-model="values.audiences[index].age_group"
                class="w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="">Select Age Group</option>
                <option
                  v-for="([value, label], index) in ageGroups"
                  :key="index"
                  :value="value"
                >
                  {{ label }}
                </option>
              </Field>
              <ErrorMessage
                :name="`audiences[${index}].age_group`"
                class="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          <Button type="button" @click="addAudience" class="mt-2 btn">
            <PlusIcon class="w-4 h-4 mr-1" /> Add Audience
          </Button>

          <!-- Show array-level error (like duplicate audience) -->
          <p v-if="errors.audiences" class="text-red-500 text-xs mt-1">
            {{ errors.audiences }}
          </p>
        </div>
      </div>

      <!-- Upload Video -->
      <div class="bg-white rounded-lg border p-6">
        <h3 class="text-lg font-medium mb-2">Upload your video ad</h3>
        <p class="text-xs text-gray-600 mb-4">
          MP4 | 15-sec | 1080x1920 | No audio
        </p>

        <div
          class="dropzone rounded-lg p-8 text-center cursor-pointer transition-colors"
          :class="[
            'border-2 border-dashed',
            isDragOver
              ? 'border-red-500 bg-red-50'
              : 'border-gray-300 bg-white',
          ]"
          @click="triggerFileUpload"
          @dragover.prevent
          @dragenter.prevent="handleDragEnter"
          @dragleave.prevent="handleDragLeave"
          @drop.prevent="handleFileDrop"
        >
          <input
            ref="fileInput"
            type="file"
            accept="video/mp4"
            class="hidden"
            @change="handleFileSelect"
          />

          <template v-if="isUploading">
            <svg
              class="animate-spin h-6 w-6 text-red-600 mx-auto mb-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              />
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
            <span class="text-sm text-gray-500 font-medium">Uploading...</span>
          </template>
          <template v-else-if="videoFileUrl.length">
  <div class="flex items-center justify-center flex-col space-y-2">
    <span class="text-sm text-green-600 font-medium">
      ✔ Video Uploaded
    </span>
    <Button
      type="button"
      variant="destructive"
      class="px-3 py-1 text-xs"
      @click.stop="removeVideo"
    >
      Remove Video
    </Button>
  </div>
</template>


          <template v-else-if="videoFileUrl.length">
            <span class="text-sm text-green-600 font-medium">
              ✔ Video Uploaded
            </span>
          </template>

          <template v-else>
            <PlusIcon class="w-6 h-6 text-red-600 mx-auto mb-2" />
            <span class="text-sm text-red-600 font-medium">Add video</span>
          </template>
        </div>
      </div>
      <template v-if="uploadProgress > 1">
        <div class="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
          <div
            class="bg-red-500 h-full transition-all duration-200"
            :style="{ width: uploadProgress + '%' }"
          ></div>
        </div>
        <span class="text-sm text-gray-500 font-medium">
          {{ uploadProgress == 100 ? "Upload" : "Uploading..." }}
          {{ uploadProgress }}%
        </span>
      </template>

      <!-- Actions -->
      <div class="flex justify-end gap-3">
        <Button
          type="button"
          class="rounded-[3px]"
          variant="outline"
          @click="cancel"
        >
          Cancel
        </Button>
        <Button
          :disabled="isUploading || !file_path || isSubmitting"
          type="submit"
          class="btn flex items-center gap-2"
        >
          <svg
            v-if="isSubmitting"
            class="animate-spin h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
          <span>{{ isSubmitting ? "Saving..." : "Save" }}</span>
        </Button>
      </div>
    </div>
  </form>
</template>

<style scoped>
input[type="radio"]:checked {
  background-color: #f97316;
  border-color: #f97316;
}
input[type="radio"]:focus {
  box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.2);
}
.dropzone {
  transition: border-color 0.2s, background-color 0.2s;
}
</style>
