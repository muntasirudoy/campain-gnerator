<template>
  <div>
    <h1 class="text-[22px] font-primary font-semibold">Tell us about your business</h1>
    <p class="text-[16px] text-gray-600">You'll get suggestions based on the information you provide.</p>

    <div class="bg-white rounded-md mt-8 p-6">
      <label class="block mb-2 text-sm font-medium">Business Name</label>
      <input type="text" v-model="store.businessInfo.businessName" placeholder="Enter your business name"
        maxlength="255" class="w-full border rounded px-3 py-2 text-sm" @input="handleInput" @blur="handleInput" />
      <p class="text-xs text-gray-500 mt-1">Example: ABC Digital Ltd.</p>

      <!-- Dynamic Error -->
      <p v-if="errors['businessInfo.businessName']" class="text-red-500 text-xs mt-1">
        {{ errors['businessInfo.businessName'] }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOnboardingStore } from '../store/campaign.store';

const store = useOnboardingStore();

// Props
const props = defineProps<{ errors: Record<string, string>; validateField: (path: string, value: any) => void }>();

function handleInput() {
  props.validateField('businessInfo.businessName', store.businessInfo.businessName);
}
</script>
