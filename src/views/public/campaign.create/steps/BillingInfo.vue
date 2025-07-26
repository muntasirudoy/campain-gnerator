<template>
  <div>
    <h2 class="text-[22px] font-semibold mb-4">Billing Details</h2>

    <div class="bg-white p-6 rounded shadow space-y-4">
      <!-- Legal Name -->
      <div>
        <label class="text-sm font-medium text-gray-700 mb-1.5">Legal Name*</label>
        <input v-model="store.paymentProfile.legal_name" placeholder="Legal Name" class="form-input" />
      </div>

      <!-- Street Address -->
      <div>
        <label class="text-sm font-medium text-gray-700 mb-1.5">Street Address*</label>
        <input v-model="store.paymentProfile.street_address" placeholder="Street Address" class="form-input" />
      </div>

      <!-- Apt Suite -->
      <div>
        <label class="text-sm font-medium text-gray-700 mb-1.5">Apt, Suite, Building</label>
        <input v-model="store.paymentProfile.detail_address" placeholder="Optional" class="form-input" />
      </div>

      <!-- City -->
      <div>
        <label class="text-sm font-medium text-gray-700 mb-1.5">City*</label>
        <select v-model="store.paymentProfile.city_district" class="form-input">
          <option disabled value="">Select City</option>
          <option :value="1">Dhaka</option>
          <option :value="2">Chittagong</option>
          <option :value="3">Sylhet</option>
        </select>
      </div>

      <!-- Province + Postal Code -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium text-gray-700 mb-1.5">Province*</label>
          <select v-model="store.paymentProfile.province" class="form-input">
            <option disabled value="">Select Province</option>
            <option :value="1">Dhaka Division</option>
          </select>
        </div>
        <div>
          <label class="text-sm font-medium text-gray-700 mb-1.5">Postal Code*</label>
          <input v-model="store.paymentProfile.postal_code" placeholder="Postal Code" class="form-input" />
        </div>
      </div>

      <!-- File Upload -->
      <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 space-y-2">
        <div class="flex items-center gap-4">
          <button type="button" class="btn" @click="triggerFileUpload">
            Upload ID Document
          </button>
          <span class="text-sm text-gray-500">Attach ID card/passport photo</span>
        </div>

        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileSelect" />

        <div v-if="previewImage" class="relative w-32 h-32 mt-2">
          <img :src="previewImage" class="w-full h-full object-cover rounded-md border" />
          <button type="button" @click="removeImage"
            class="absolute top-1 right-1 bg-white rounded-full shadow px-1 text-red-600">✕</button>
        </div>
        <p v-else class="text-sm text-gray-400">No image selected</p>
      </div>

      <!-- Billing Contact Info -->
      <div>
        <label class="text-sm font-medium text-gray-700 mb-1.5">Billing Contact Name*</label>
        <input v-model="store.paymentProfile.contact_name" placeholder="Billing Contact Name" class="form-input" />
      </div>
      <div>
        <label class="text-sm font-medium text-gray-700 mb-1.5">Billing Contact Phone*</label>
        <input v-model="store.paymentProfile.phone" placeholder="Billing Contact Phone" class="form-input" />
      </div>

      <!-- Billing Emails -->
      <div>
        <label class="text-sm font-medium text-gray-700 mb-1.5">Billing Emails*</label>
        <div class="form-input flex flex-wrap gap-2 items-center" @click="focusEmailInput">
          <span v-for="(email, index) in store.paymentProfile.email" :key="index"
            class="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded flex items-center gap-1">
            {{ email }}
            <button type="button" @click="removeEmail(index)"
              class="text-blue-500 hover:text-red-500 text-sm">✕</button>
          </span>
          <input ref="emailInputRef" v-model="newEmail" @keydown.enter.prevent="addEmail"
            @keydown="e => e.key === ',' && addEmail(e)" @blur="addEmail" type="email"
            placeholder="Type and press Enter" class="flex-1 outline-none text-sm min-w-[120px]" />
        </div>
        <p v-if="emailError" class="text-red-500 text-xs mt-1">{{ emailError }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useOnboardingStore } from '../store/campaign.store';
const store = useOnboardingStore();

const fileInput = ref<HTMLInputElement | null>(null);
const previewImage = ref('');
const emailInputRef = ref<HTMLInputElement | null>(null);
const newEmail = ref('');
const emailError = ref('');

function triggerFileUpload() {
  fileInput.value?.click();
}
function handleFileSelect(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (file) {
    previewImage.value = URL.createObjectURL(file);
    store.paymentProfile.image = file.name;
  }
}
function removeImage() {
  previewImage.value = '';
  store.paymentProfile.image = '';
}
function focusEmailInput() {
  emailInputRef.value?.focus();
}
function addEmail(e?: Event) {
  const email = newEmail.value.trim().replace(',', '');
  if (email) {
    if (!/\S+@\S+\.\S+/.test(email)) {
      emailError.value = 'Invalid email format';
      return;
    }
    store.paymentProfile.email.push(email);
    newEmail.value = '';
    emailError.value = '';
  }
}
function removeEmail(index: number) {
  store.paymentProfile.email.splice(index, 1);
}

console.log(store.paymentProfile);

</script>
