<template>
  <div class="onboarding-container space-y-6">
    <div class="text-lg font-semibold mb-4">
      Step {{ currentStep + 1 }} of {{ steps.length }}
    </div>

    <component
      :is="steps[currentStep].component"
      :values="currentValues"
      :loading="loading"
      @updateFormData="updateFormData"
      @next="handleNext"
      @back="handleBack"
    />

    <div v-if="loading" class="text-blue-600 font-medium mt-4">Saving...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useOnboardingStore } from "@/stores/useOnboardingStore";
import BusinessInfo from "./BusinessInfo.vue";
import GoalCampaign from "./GoalCampaign.vue";
import AdSettings from "./AdSettings.vue";
import PaymentSettings from "./PaymentSettings.vue";

const store = useOnboardingStore();

const steps = [
  { component: BusinessInfo, api: "/api/business", section: "businessInfo" },
  { component: GoalCampaign, api: "/api/campaign", section: "goalCampaign" },
  { component: AdSettings, api: "/api/adsettings", section: "adSettings" },
  { component: PaymentSettings, api: "/api/payment", section: "paymentSettings" },
];

const currentStep = ref(0);
const loading = ref(false);

const currentValues = computed(() => {
  return store[steps[currentStep.value].section];
});

function updateFormData(field: string, value: any) {
  const section = steps[currentStep.value].section;
  store.updateField(section, field, value);
}

async function handleNext() {
  const apiUrl = steps[currentStep.value].api;
  try {
    loading.value = true;
    await hitApi(apiUrl, currentValues.value);

    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
    } else {
      alert("Onboarding Completed!");
      console.log("Final Data:", store.getFullData());
    }
  } catch (err) {
    alert(err.message || "Something went wrong");
  } finally {
    loading.value = false;
  }
}

function handleBack() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

async function hitApi(url: string, data: any) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("API Request Failed");
  return res.json();
}
</script>
