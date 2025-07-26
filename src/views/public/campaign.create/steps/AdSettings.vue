<template>
  <div>
    <h1 class="text-[22px] font-primary font-semibold mb-4">Setup your Ad</h1>

    <div class="max-w-full bg-gray-50 rounded-lg p-4 space-y-4">
      <!-- Ad Name - Compact -->
      <div class="bg-white rounded-lg p-4">
        <label class="block mb-1 font-medium text-sm">Ad Name</label>
        <Input v-model="store.adSettings.name" placeholder="Enter ad name" class="form-input" />
      </div>

      <!-- Target Audience - Optimized Layout -->
      <div class="bg-white rounded-lg border p-4">
        <div class="flex justify-between items-center mb-3">
          <h3 class="font-semibold text-gray-800">Target Audience</h3>
          <button @click="addAudience" class="text-blue-600 text-sm hover:text-blue-800">
            + Add Audience
          </button>
        </div>

        <div class="grid gap-3">
          <div v-for="(audience, index) in store.adSettings.audiences" :key="index"
            class="border border-gray-200 bg-gray-50 rounded-lg p-3">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <!-- Gender - Inline -->
              <div>
                <label class="block mb-1 font-medium text-sm">Gender</label>
                <div class="flex gap-3">
                  <label class="flex items-center text-sm">
                    <input type="radio" value="female" v-model="audience.gender" class="mr-1" />
                    Female
                  </label>
                  <label class="flex items-center text-sm">
                    <input type="radio" value="male" v-model="audience.gender" class="mr-1" />
                    Male
                  </label>
                </div>
              </div>

              <!-- Age Group - Compact -->
              <div>
                <label class="block mb-1 font-medium text-sm">Age Group</label>
                <select v-model="audience.age_group" class="w-full border rounded px-2 py-1 text-sm">
                  <option value="1">18–24</option>
                  <option value="2">25–34</option>
                  <option value="3">35–44</option>
                </select>
              </div>
            </div>

            <button @click="removeAudience(index)" class="text-red-500 text-xs hover:text-red-700">
              Remove
            </button>
          </div>
        </div>
      </div>

      <!-- Video Upload - Compact -->
      <div class="bg-white rounded-lg border p-4">
        <h3 class="font-medium mb-3">Upload Video Ad</h3>

        <!-- When no video exists -->
        <div v-if="!store.adSettings.video_url" class="space-y-3">
          <div
            class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors"
            @dragover.prevent @drop.prevent="handleDrop">
            <div class="space-y-2">
              <svg class="mx-auto h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <div class="text-sm text-gray-600">
                <label class="cursor-pointer text-blue-600 hover:text-blue-800">
                  Click to upload
                  <input type="file" @change="handleFile" accept="video/mp4,video/mov,video/avi" class="hidden" />
                </label>
                or drag and drop
              </div>
              <p class="text-xs text-gray-500">MP4, MOV, AVI up to 50MB</p>
            </div>
          </div>
        </div>

        <!-- When video exists - Enhanced Preview -->
        <div v-else class="space-y-3">
          <div class="bg-gray-50 rounded-lg p-4 border">
            <div class="flex items-start space-x-4">
              <!-- Video Thumbnail/Preview -->
              <div class="flex-shrink-0">
                <div class="w-20 h-16 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                  <!-- If you have video preview capability -->
                  <video v-if="videoPreviewUrl" :src="videoPreviewUrl" class="w-full h-full object-cover rounded-lg"
                    muted></video>
                  <!-- Fallback video icon -->
                  <svg v-else class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <!-- Play button overlay -->
                  <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Video Details -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm font-medium text-gray-900 truncate">
                      {{ store.adSettings.video_url }}
                    </p>
                    <div class="flex items-center space-x-4 mt-1">
                      <span class="text-xs text-gray-500">
                        {{ videoDetails.size || 'Calculating...' }}
                      </span>
                      <span class="text-xs text-gray-500">
                        {{ videoDetails.duration || 'Loading...' }}
                      </span>
                      <span
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                        ✓ Uploaded
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center space-x-2 mt-3">
                  <button @click="previewVideo"
                    class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </button>

                  <label
                    class="inline-flex items-center px-3 py-1 border border-blue-300 shadow-sm text-xs font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100 cursor-pointer">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                    Replace
                    <input type="file" @change="handleFile" accept="video/mp4,video/mov,video/avi" class="hidden" />
                  </label>

                  <button @click="removeVideo"
                    class="inline-flex items-center px-3 py-1 border border-red-300 shadow-sm text-xs font-medium rounded text-red-700 bg-red-50 hover:bg-red-100">
                    <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Upload Progress (if uploading) -->
          <div v-if="uploadProgress > 0 && uploadProgress < 100" class="w-full bg-gray-200 rounded-full h-2">
            <div class="bg-blue-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: uploadProgress + '%' }"></div>
            <p class="text-xs text-gray-600 mt-1">Uploading... {{ uploadProgress }}%</p>
          </div>
        </div>

        <!-- Video Preview Modal (optional) -->
        <div v-if="showPreview" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          @click="closePreview">
          <div class="bg-white rounded-lg p-4 max-w-2xl w-full mx-4">
            <div class="flex justify-between items-center mb-4">
              <h4 class="text-lg font-medium">Video Preview</h4>
              <button @click="closePreview" class="text-gray-400 hover:text-gray-600">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <video v-if="videoPreviewUrl" :src="videoPreviewUrl" controls class="w-full rounded-lg"></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Input } from "@/components/ui/input";
import { useOnboardingStore } from "../store/campaign.store";
import { reactive, ref } from "vue";

const store = useOnboardingStore();

function addAudience() {
  store.adSettings.audiences.push({ gender: '', age_group: 1 });
}

function removeAudience(index: number) {
  store.adSettings.audiences.splice(index, 1);
}



const uploadProgress = ref(0);
const showPreview = ref(false);
const videoPreviewUrl = ref('');
const videoDetails = reactive({
  size: '',
  duration: ''
});

function handleFile(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    // Validate file size (50MB limit)
    if (file.size > 50 * 1024 * 1024) {
      alert('File size must be less than 50MB');
      return;
    }

    // Update store
    store.adSettings.video_url = file.name;

    // Get file details
    videoDetails.size = formatFileSize(file.size);

    // Create preview URL
    videoPreviewUrl.value = URL.createObjectURL(file);

    // Get video duration
    getVideoDuration(file);

    // Simulate upload progress
    simulateUpload();
  }
}

function handleDrop(event: DragEvent) {
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    const file = files[0];
    if (file.type.startsWith('video/')) {
      // Create a fake event to reuse handleFile logic
      const fakeEvent = {
        target: { files: [file] }
      } as any;
      handleFile(fakeEvent);
    }
  }
}

function removeVideo() {
  store.adSettings.video_url = '';
  videoPreviewUrl.value = '';
  videoDetails.size = '';
  videoDetails.duration = '';
  uploadProgress.value = 0;
}

function previewVideo() {
  showPreview.value = true;
}

function closePreview() {
  showPreview.value = false;
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function getVideoDuration(file: File) {
  const video = document.createElement('video');
  video.preload = 'metadata';
  video.onloadedmetadata = () => {
    const duration = video.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    videoDetails.duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    URL.revokeObjectURL(video.src);
  };
  video.src = URL.createObjectURL(file);
}

function simulateUpload() {
  uploadProgress.value = 0;
  const interval = setInterval(() => {
    uploadProgress.value += 10;
    if (uploadProgress.value >= 100) {
      clearInterval(interval);
    }
  }, 200);
}
</script>