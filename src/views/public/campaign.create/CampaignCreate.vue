<template>
  <div class="flex w-full h-screen overflow-hidden">
    <!-- Sidebar -->
    <div class="max-w-[300px] bg-[#E0DCD6] p-8 border-r">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="relative flex items-start gap-4 pb-8"
      >
        <div
          v-if="index < steps.length - 1"
          class="absolute left-4 top-8 w-0.5 h-16 bg-primary"
          :class="{ 'bg-secondary': currentStep > index + 1 }"
        ></div>
        <div class="flex items-center gap-4">
          <div
            class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
            :class="{
              'bg-secondary text-white': currentStep >= index + 1,
              'bg-gray-200 text-black': currentStep < index + 1,
            }"
          >
            {{ currentStep > index + 1 ? "✓" : index + 1 }}
          </div>
          <span
            :class="
              currentStep === index + 1
                ? 'text-primary font-bold'
                : 'text-gray-600'
            "
          >
            {{ step.title }}
          </span>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-6 bg-[#E0DCD6] overflow-y-scroll h-screen">
      <div class="mx-auto max-w-[800px]">
        <div v-if="!formReady" class="text-center py-10">Loading...</div>

        <Form
          :key="currentStep + '-' + formReady"
          :validation-schema="schemas[currentStep - 1]"
          :initial-values="store[steps[currentStep - 1].section]"
          keep-values
          v-slot="{ handleSubmit, values }"
        >
          <form @submit.prevent="handleSubmit(onSubmit)">
            <component
              :is="steps[currentStep - 1].component"
              :values="values"
            />

            <div class="mt-6 flex justify-between">
              <Button
                type="button"
                variant="outline"
                @click="prevStep"
                :disabled="currentStep === 1 || isLoading"
              >
                Back
              </Button>
              <Button type="submit" class="btn" :disabled="isLoading">
                <Loader v-if="isLoading" class="animate-spin" />
                {{ currentStep === steps.length ? "Finish" : "Next" }}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Form, useForm } from "vee-validate";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-vue-next";

import BusinessInfo from "./steps/BusinessInfo.vue";
import GoalCampaign from "./steps/GoalCampaign.vue";
import AdSettings from "./steps/AdSettings.vue";
import PaymentSettings from "./steps/PaymentSettings.vue";

import { campaignService } from "@/services/common/campain-service";
import { adService } from "@/services/common/ads-service";
import { useAuthStore } from "@/store/client/client-auth-store";
import { useRoute, useRouter } from "vue-router";
import { OnboardingState, useOnboardingStore } from "./store/campaign.store";
import { clientBillingService } from "@/services/client/client-billing-service";

const authStore = useAuthStore();
const store = useOnboardingStore();
const currentStep = ref(1);
const isLoading = ref(false);
const formReady = ref(false);
const route = useRoute();
const router = useRouter();
const originalData = ref<{ [key in StepKey]: any }>({
  businessInfo: {},
  goalCampaign: {},
  adSettings: {},
  paymentSettings: {},
});

type StepKey = keyof OnboardingState;

const steps: { title: string; component: any; section: StepKey }[] = [
  {
    title: "About your business",
    component: BusinessInfo,
    section: "businessInfo",
  },
  { title: "Campaign Setup", component: GoalCampaign, section: "goalCampaign" },
  { title: "Ad Setup", component: AdSettings, section: "adSettings" },
  {
    title: "Payment Settings",
    component: PaymentSettings,
    section: "paymentSettings",
  },
];

const schemas = [
  yup.object({
    businessName: yup.string().required("Business name is required"),
  }),
  yup.object({
    goal_id: yup.number().required(),
    name: yup.string().required(),
    budget_type: yup.number().required(),
    budget: yup.string().required(),
    start_time: yup.string().required(),
    end_time: yup.string().required(),
  }),
  yup.object({
    name: yup.string().required("Ad name is required"),
    audiences: yup.array().of(
      yup.object({
        gender: yup.string().required(),
        age_group: yup.number().required(),
      })
    ),
    video_url: yup.string().optional(),
  }),
  yup.object({
    billing_country: yup.number().required("Country is required"),
    currency: yup.number().required("Currency is required").default(1),
    time_zone: yup.string().required("Timezone is required"),
  }),
];


async function loadInitialData() {
  const { data } = await campaignService.getInitialData();

  store.updateSection('businessInfo', { businessName: data.client?.name || '' });
  originalData.value.businessInfo = { businessName: data.client?.name || '' };

  if (data.campaign) {
    const campaignData = {
      goal_id: data.campaign.goal?.id || 1,
      name: data.campaign.name || '',
      budget_type: data.campaign.budget_type?.value || 1,
      budget: data.campaign.budget || '',
      start_time: data.campaign.start_time?.split('T')[0] || '',
      end_time: data.campaign.end_time?.split('T')[0] || '',
      location: data.campaign.location?.value || 1,
      out_url: data.campaign.out_url || 'http://abc.com',
      type: data.campaign.type || 'Video ads',
      format_ads: data.campaign.format_ads?.value || 1,
      bid_strategy: data.campaign.bid_strategy?.value || 1,
      id:data.campaign.id || null
    };
    store.updateSection('goalCampaign', campaignData);
    originalData.value.goalCampaign = campaignData;
  }

  if (data.ad) {
    const adData = {
      name: data.ad.name || '',
      audiences:
        Array.isArray(data.ad.audiences) && data.ad.audiences.length > 0
          ? data.ad.audiences
          : [{ gender: '', age_group: 1 }],
      video_url: data.ad.video_url || '',
    };
    
    store.updateSection('adSettings', adData);
    originalData.value.adSettings = adData;
  }

  if (data.paymentSetting) {
     const paymentData = { 
      billing_country: data.paymentSetting.billing_country,
      time_zone:data.paymentSetting.time_zone,
      currency: data.paymentSetting.currency
    };
    store.updateSection('paymentSettings', paymentData);
    originalData.value.paymentSettings = paymentData;
  }

  currentStep.value = data.stepper_count || 1;
  router.replace({ query: { step: currentStep.value.toString() } });
  store.persistData();
  formReady.value = true;
}


onMounted(async () => {
  formReady.value = false;
  await loadInitialData();
  const stepFromUrl = parseInt(route.query.step as string);
  if (!isNaN(stepFromUrl) && stepFromUrl >= 1 && stepFromUrl <= steps.length) {
    currentStep.value = stepFromUrl;
  }
  formReady.value = true;
});


async function onSubmit(values: any) {
  const currentSection = steps[currentStep.value - 1].section;
  const actionType = getApiActionType(currentSection, values);

  isLoading.value = true;
  try {
    if (actionType === 'create' || actionType === 'update') {
      await callApiService(currentStep.value, values, actionType);
      // ✅ Update original snapshot after successful API
      originalData.value[currentSection] = { ...values };
    }

    // ✅ Always sync Pinia
    store.updateSection(currentSection, values);


    if (currentStep.value < steps.length) {
      currentStep.value++;
      router.replace({ query: { step: currentStep.value.toString() } });
    } else {
      alert('Onboarding Completed!');
    }
  } finally {
    isLoading.value = false;
  }
}



function isStepChanged(section: StepKey, values: any): boolean {
  const original = originalData.value[section];
  if (!original) return true; // No original data, must call API
  return JSON.stringify(original) !== JSON.stringify(values);
}

function formatToYMDHIS(datetimeLocal: string) {
  const date = new Date(datetimeLocal);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

async function callApiService(step: number, values: any, actionType: 'create' | 'update') {
  switch (step) {
    case 1:
      if (actionType === 'create') {
        await campaignService.submitAboutBusiness({ name: values.businessName });
      } else {
        // await campaignService.updateAboutBusiness({ name: values.businessName });
      }
      break;

    case 2:
      if (actionType === 'create') {
        const { data } = await campaignService.create({
          ...values,
          start_time: formatToYMDHIS(values.start_time),
          end_time: formatToYMDHIS(values.end_time),
        });
        // store returned campaign id for later steps
        store.updateSection('goalCampaign', { id: data.id });
        values.id = data.id;
      } else {
        await campaignService.updateCampaign(values.id, {
          ...values,
          start_time: formatToYMDHIS(values.start_time),
          end_time: formatToYMDHIS(values.end_time),
        });
      }
      break;

    case 3:
      if (actionType === 'create') {
        await adService.create({ ...values, campaign_id: store.goalCampaign.id });
      } else {
        // await adService.update({ ...values, campaign_id: store.goalCampaign.id });
      }
      break;

    case 4:
      if (actionType === 'create') {
        await clientBillingService.createBilling(values);
      } else {
        // await paymentService.update(values);
      }
      break;
  }
}

function getApiActionType(section: StepKey, values: any): 'create' | 'update' | 'skip' {
  const original = originalData.value[section];

  if (!original || Object.keys(original).length === 0 || original.id == null) {
    return 'create'; // No API data previously
  }

  const changed = JSON.stringify(original) !== JSON.stringify(values);
  return changed ? 'update' : 'skip';
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
    router.replace({ query: { step: currentStep.value.toString() } });
  }
}
</script>
