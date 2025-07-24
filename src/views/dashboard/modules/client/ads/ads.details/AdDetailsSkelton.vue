<template>
  <div class="border-2 max-w-2xl bg-white mt-5 rounded-lg p-6 space-y-6">
    <!-- Skeleton when loading -->
 
      <!-- Status Skeleton -->
      <div class="space-y-2">
        <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div class="flex items-center space-x-2">
          <div class="w-2 h-2 bg-gray-300 rounded-full animate-pulse"></div>
          <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <hr class="border-gray-200" />

      <!-- Ad Name Skeleton -->
      <div class="space-y-2">
        <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
      </div>

      <!-- Audience Skeleton -->
      <div class="space-y-4">
        <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div class="border border-gray-200 rounded-md p-4 space-y-4">
          <div class="h-8 bg-gray-100 rounded animate-pulse"></div>
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-1">
              <div class="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
            </div>
            <div class="space-y-1">
              <div class="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-28 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Video Skeleton -->
      <div class="space-y-4">
        <div class="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
        <div class="w-48 h-64 bg-gray-200 rounded-md animate-pulse"></div>
      </div>

      <!-- Button Skeleton -->
      <div class="pt-4">
        <div class="h-10 w-24 bg-gray-300 rounded animate-pulse"></div>
      </div>
 

  </div>
</template>
