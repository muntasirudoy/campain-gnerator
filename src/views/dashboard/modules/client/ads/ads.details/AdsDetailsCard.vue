<script setup lang="ts">
import { clientVideoService } from '@/services/client/client-video-service';
import { ref } from 'vue';
import AdDetailsSkelton from './AdDetailsSkelton.vue';

defineProps({
  adInfo: Object,
  isLoading: Boolean
})

const videoUrl = ref<string | null>(null);

const isVideoLoading = ref(false);

const getVideourl = async (path: string) => {
  if (!videoUrl.value) {
    isVideoLoading.value = true;
    try {
      const res = await clientVideoService.getVideoURL(path);
      videoUrl.value = res?.data.s3_data?.original?.download_url || null;
    } catch (error) {
      console.error("Error fetching video URL", error);
    } finally {
      isVideoLoading.value = false;
    }
  }
};




</script>

<template>
  <AdDetailsSkelton v-if="isLoading" />

  <div v-else class="border-2 max-w-2xl bg-white mt-5 rounded-lg p-6 space-y-6">
    <!-- Status -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium text-gray-700">Status</h3>
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <span class="text-sm text-gray-900">{{ adInfo.status.label }}</span>
      </div>
    </div>

    <hr class="border-gray-200" />

    <!-- Ad Name -->
    <div class="space-y-2">
      <h3 class="text-sm font-medium text-gray-700">Ad name</h3>
      <p class="text-sm text-gray-600">{{ adInfo.name }}</p>
    </div>

    <!-- Target Audience -->
    <div class="space-y-4">
      <h3 class="text-sm font-medium text-gray-700">Target Audience</h3>

      <div
        v-for="(audience, index) in adInfo.audiences"
        :key="index"
        class="border border-gray-200 rounded-md p-4 space-y-4"
      >
        <div>
          <input
            type="text"
            :value="`Audience ${index + 1}`"
            class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            readonly
          />
        </div>

        <div class="grid grid-cols-1 gap-4">
          <div>
            <span class="text-sm font-medium text-gray-700">Gender</span>
            <p class="text-sm text-gray-600 mt-1">{{ audience.gender.label }}</p>
          </div>
          <div>
            <span class="text-sm font-medium text-gray-700">Age</span>
            <p class="text-sm text-gray-600 mt-1">{{ audience.age_group.label }}</p>
          </div>
        </div>
      </div>
    </div>


<!-- Video -->
<div class="space-y-4">
  <h3 class="text-sm font-medium text-gray-700">Ad creation video</h3>

  <div
    v-if="!videoUrl && !isVideoLoading"
    class="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center relative"
  >
    <div class="mb-3">
      <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
        />
      </svg>
    </div>

    <div
      @click="getVideourl(adInfo.video_url)"
      class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3 hover:bg-blue-600 transition-colors cursor-pointer"
    >
      <svg class="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>

    <span class="text-sm text-gray-500 font-medium">Video File</span>
    <span class="text-xs text-gray-400 mt-1">Click to play</span>
  </div>

  <!-- Loading state -->
  <div v-else-if="isVideoLoading" class="w-full h-64 flex items-center justify-center">
    <svg class="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 018 8h-4l3.5 3.5L20 12h-4a8 8 0 01-8 8v-4l-3.5 3.5L4 20v-4a8 8 0 01-8-8h4l-3.5-3.5L0 12h4z" />
    </svg>
  </div>

  <!-- Video player -->
  <div v-else class="w-full">
    <video
      controls
      class="w-full rounded-md border border-gray-300"
      :src="videoUrl"
      preload="metadata"
    />
  </div>
</div>


    
  </div>
</template>
