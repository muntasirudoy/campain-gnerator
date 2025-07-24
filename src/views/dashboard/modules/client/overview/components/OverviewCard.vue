<template>
  <div class="bg-white rounded-lg shadow-sm p-6">
    <div class="flex justify-between items-center mb-4">
      <h3 class="text-lg font-medium" :class="titleClass">{{ title }}</h3>
      <button
        v-if="showAction"
        @click="onAction"
        class="text-red-500 text-sm hover:text-red-700"
      >
        {{ actionText }}
      </button>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  titleClass: { type: String, default: 'text-orange-500' },
  actionText: { type: String, default: 'View details' },
  showAction: { type: Boolean, default: true }
})

const emit = defineEmits(['action'])

const onAction = () => {
  emit('action')
}
</script>

