<template>
  <h1 class="text-[22px] font-primary font-semibold">Setup your Ad</h1>
  <div class="max-w-full mt-5 p-6 bg-gray-50 min-h-screen rounded-lg space-y-6">
    <!-- ✅ Ad Name -->
    <FormField name="name" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Ad Name</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="Enter ad name"
            maxlength="255"
            class="form-input"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- ✅ Audiences -->
    <div class="bg-white rounded-lg border p-4">
      <h3 class="font-semibold text-gray-800 mb-2">Target Audience</h3>
<div
  v-for="(audience, index) in audiences"
  :key="'audience-' + index"
  class="border border-gray-200 rounded-md p-4 space-y-4"
>
  <!-- Gender -->
  <FormField :name="`audiences.${index}.gender`" v-slot="{ componentField }">
    <FormItem>
      <FormLabel>Gender</FormLabel>
      <FormControl>
        <div class="flex space-x-4">
          <label class="flex items-center">
            <input
              type="radio"
              class="form-radio"
              value="female"
              
              v-bind="componentField"
              
            />
            <span class="ml-2 text-sm">Female</span>
          </label>
          <label class="flex items-center">
            <input
              type="radio"
              class="form-radio"
              value="male"
              v-bind="componentField"
            />
            <span class="ml-2 text-sm">Male</span>
          </label>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>

  <!-- Age Group -->
  <FormField :name="`audiences.${index}.age_group`" v-slot="{ componentField }">
    <FormItem>
      <FormLabel>Age Group</FormLabel>
      <FormControl>
        <select
          v-bind="componentField"
          class="w-full px-3 py-2 border rounded-md text-sm"
        >
          <option value="">Select Age Group</option>
          <option
            v-for="([val, label], i) in ageGroups"
            :key="i"
            :value="Number(val)"
          >
            {{ label }}
          </option>
        </select>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</div>

    </div>

    <!-- Hidden Field for Video -->
    <FormField name="video_url" v-slot="{ componentField }">
      <input type="hidden" v-bind="componentField" />
    </FormField>

    <!-- ✅ Video Upload -->
    <div class="bg-white rounded-lg border p-6">
      <h3 class="text-lg font-medium mb-2">Upload your video ad</h3>
      <p class="text-xs text-gray-600 mb-4">
        MP4 | 15-sec | 1080x1920 | No audio
      </p>

      <div
        class="dropzone rounded-lg p-8 text-center cursor-pointer transition-colors"
        :class="[
          'border-2 border-dashed',
          isDragOver ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white',
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

        <template v-else-if="videoFileUrl">
          <div class="flex items-center justify-center flex-col space-y-2">
            <span class="text-sm text-green-600 font-medium">✔ Video Uploaded</span>
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

        <template v-else>
          <PlusIcon class="w-6 h-6 text-red-600 mx-auto mb-2" />
          <span class="text-sm text-red-600 font-medium">Add video</span>
        </template>
      </div>
    </div>

    <!-- Progress -->
    <div v-if="uploadProgress > 1" class="mt-2">
      <div class="bg-gray-200 rounded-full h-4 mb-1">
        <div
          class="bg-red-500 h-full transition-all duration-200"
          :style="{ width: uploadProgress + '%' }"
        ></div>
      </div>
      <span class="text-sm text-gray-500">{{ uploadProgress }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon } from "lucide-vue-next";
import { AdConstant } from "@/constant/ads";
import { adService } from "@/services/common/ads-service";
import { ref, watch, onMounted } from "vue";
import { useFieldArray } from "vee-validate";
import { useFormContext } from "vee-validate";

const { setFieldValue } = useFormContext();
const props = defineProps<{ values: any }>();

const { fields: audiences, push, remove, replace } = useFieldArray("audiences");

const ageGroups = Object.entries(AdConstant.getAgeGroupOptions());

const fileInput = ref<HTMLInputElement | null>(null);
const videoFileUrl = ref("");
const file_path = ref("");
const uploadProgress = ref(0);
const isUploading = ref(false);
const isDragOver = ref(false);

onMounted(() => {
  if (Array.isArray(props.values.audiences) && props.values.audiences.length) {
    replace([...props.values.audiences]);
  } else {
    replace([{ gender: '', age_group: 1 }]);
  }
});

watch(
  () => props.values.video_url,
  (val) => {
    videoFileUrl.value = val || "";
  },
  { immediate: true }
);
// ✅ Video Upload
const triggerFileUpload = () => fileInput.value?.click();
const handleFileSelect = async (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) await handleVideoUpload(file);
};
const handleVideoUpload = async (file: File) => {
  const payload = new FormData();
  payload.append("file_name", file.name);
  payload.append("file_type", file.type);
  isUploading.value = true;
  uploadProgress.value = 0;
  try {
    const { data } = await adService.adsVideoUpload(payload);
    const presignedUrl = data.s3_data.upload_url;
    file_path.value = data.s3_data.file_path;

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", presignedUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable)
        uploadProgress.value = Math.round((e.loaded / e.total) * 100);
    };
    xhr.onload = () => {
      if (xhr.status === 200) {
        videoFileUrl.value = presignedUrl.split("?")[0];
        setFieldValue("video_url", file_path.value);
      }
      isUploading.value = false;
    };
    xhr.send(file);
  } catch (err) {
    console.error(err);
    isUploading.value = false;
  }
};
const handleDragEnter = () => (isDragOver.value = true);
const handleDragLeave = () => (isDragOver.value = false);
const handleFileDrop = async (e: DragEvent) => {
  isDragOver.value = false;
  const file = e.dataTransfer?.files?.[0];
  if (file) await handleVideoUpload(file);
};
const removeVideo = () => {
  videoFileUrl.value = "";
  file_path.value = "";
  uploadProgress.value = 0;
  setFieldValue("video_url", "");
};

// ✅ Add Audience
const addAudience = () => push({ gender: '', age_group: 1 });
</script>

<style scoped>
.dropzone {
  transition: border-color 0.2s, background-color 0.2s;
}
</style>
