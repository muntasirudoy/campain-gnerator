<template>
  <div class="p-6 border rounded-2xl shadow-sm bg-white ">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h3 class="text-lg font-semibold text-gray-800">{{ title }}</h3>
      <div class="flex gap-2">
        <button
          @click="$emit('edit')"
          class="text-sm text-blue-600 hover:underline transition"
        >
          Edit
        </button>
        <button
          @click="$emit('delete')"
          class="text-sm text-red-500 hover:underline transition"
        >
          Delete
        </button>
      </div>
    </div>

    <!-- Meta Info -->
    <div class="text-sm text-gray-500">Total Users: {{ total }}</div>

    <!-- User Chips -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="user in users"
        
        class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full border"
      >
        {{ user }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoleStore } from '@/store/common/role-permission-store';

defineProps({
  title: String,
  total: Number,
  users: Array
});
defineEmits(['edit', 'delete']);

const roleStore = useRoleStore();
</script>












