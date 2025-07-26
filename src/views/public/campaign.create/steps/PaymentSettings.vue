<template>
  <div class="bg-white rounded-lg p-6 shadow-sm space-y-6">
    <h3 class="text-lg font-semibold">Billing Details</h3>

    <!-- Billing Country -->
    <div>
      <label class="block mb-2 font-medium text-sm">Billing Country</label>
      <select v-model="store.paymentSettings.billing_country" class="w-full border rounded px-3 py-2">
        <option value="">Select Country</option>
        <option value="1">Bangladesh</option>
      </select>
    </div>

    <!-- Timezone -->
    <div>
      <label class="block mb-2 font-medium text-sm">Timezone</label>
      <select v-model="store.paymentSettings.time_zone" class="w-full border rounded px-3 py-2">
        <option value="Asia/Dhaka">Asia/Dhaka</option>
      </select>
    </div>

    <!-- Currency -->
    <div>
      <label class="block mb-2 font-medium text-sm">Currency</label>
      <select v-model="store.paymentSettings.currency" class="w-full border rounded px-3 py-2">
        <option value="">Select Currency</option>
        <option value="1">BDT (Bangladeshi Taka)</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOnboardingStore } from '../store/campaign.store';


const store = useOnboardingStore();
</script>
