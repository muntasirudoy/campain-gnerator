<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-vue-next';
import * as yup from 'yup';
import { useRouter } from 'vue-router';

// ✅ Step Components
import BusinessInfo from './steps/BusinessInfo.vue';
import GoalCampaign from './steps/GoalCampaign.vue';
import AdSettings from './steps/AdSettings.vue';
import PaymentSettings from './steps/PaymentSettings.vue';
import BillingInfo from './steps/BillingInfo.vue';

// ✅ Services
import { campaignService } from '@/services/common/campain-service';
import { clientBillingService } from '@/services/client/client-billing-service';
import { adService } from '@/services/common/ads-service';

import { useOnboardingStore } from './store/campaign.store';
import CampaignHeader from './CampaignHeader.vue';

const store = useOnboardingStore();
const router = useRouter();

const currentStep = ref(1);
const isLoading = ref(false);
const formReady = ref(false);

// ✅ Errors object for all steps
const errors = ref<Record<string, string>>({});

const steps = [
  { title: 'About your business', component: BusinessInfo, section: 'businessInfo' },
  { title: 'Campaign Setup', component: GoalCampaign, section: 'goalCampaign' },
  { title: 'Ad Setup', component: AdSettings, section: 'adSettings' },
  { title: 'Payment Settings', component: PaymentSettings, section: 'paymentSettings' },
  { title: 'Payment Profile', component: BillingInfo, section: 'paymentProfile' }
];

// ✅ Validation Schemas
const schemas = {
  businessInfo: yup.object({ businessName: yup.string().required('Business name is required') }),
  goalCampaign: yup.object({
    goal_id: yup.number().required(),
    name: yup.string().required('Campaign name required'),
    budget_type: yup.number().required(),
    budget: yup.string().required('Budget required'),
    start_time: yup.string().required('Start date required'),
    end_time: yup.string().required('End date required')
  }),
  adSettings: yup.object({
    name: yup.string().required('Ad name required'),
    audiences: yup.array().of(
      yup.object({ gender: yup.string().required(), age_group: yup.number().required() })
    )
  }),
  paymentSettings: yup.object({
    billing_country: yup.number().required('Country required'),
    currency: yup.number().required('Currency required'),
    time_zone: yup.string().required()
  }),
  paymentProfile: yup.object({
    legal_name: yup.string().required('Legal name required'),
    street_address: yup.string().required('Street address required'),
    detail_address: yup.string().optional(),
    city_district: yup.number().required('City required'),
    province: yup.number().required('Province required'),
    postal_code: yup.string().required('Postal code required'),
    contact_name: yup.string().required('Contact name required'),
    phone: yup.string().required('Contact phone required'),
    email: yup.array().of(yup.string().email('Invalid email')).min(1, 'At least one email is required')
  })
};

// ✅ Initial Data Load
onMounted(async () => {
  formReady.value = false;
  try {
    const { data } = await campaignService.getInitialData();

    store.updateSection('businessInfo', { businessName: data.client?.name || '' });

    if (data.campaign) {
      store.updateSection('goalCampaign', {
        goal_id: data.campaign.goal?.id || 1,
        name: data.campaign.name || '',
        budget_type: data.campaign.budget_type?.value || 1,
        budget: data.campaign.budget || '',
        start_time: data.campaign.start_time?.split('T')[0] || '',
        end_time: data.campaign.end_time?.split('T')[0] || '',
        location: data.campaign.location?.value || 1,
        out_url: data.campaign.out_url || '',
        type: data.campaign.type || 'Video ads',
        format_ads: data.campaign.format_ads?.value || 1,
        bid_strategy: data.campaign.bid_strategy?.value || 1,
        id: data.campaign.id || null
      });
    }

    if (data.ad) {
      store.updateSection('adSettings', {
        name: data.ad.name || '',
        audiences: Array.isArray(data.ad.audiences) && data.ad.audiences.length
          ? data.ad.audiences.map((a: any) => ({
            gender: a.gender?.value || '',
            age_group: a.age_group?.value || 1
          }))
          : [{ gender: '', age_group: 1 }],
        video_url: data.ad.video_url || ''
      });
    }

    if (data.paymentSetting) {
      store.updateSection('paymentSettings', {
        billing_country: data.paymentSetting.billing_country?.value,
        currency: data.paymentSetting.currency?.value || '',
        time_zone: data.paymentSetting.time_zone?.value || ''
      });
    }

    steps.forEach(step => store.saveSnapshot(step.section as any));
    currentStep.value = data.stepper_count + 1 || 1;
    router.replace({ query: { step: currentStep.value.toString() } });
  } catch (e) {
    console.error('Failed to load initial data', e);
  } finally {
    formReady.value = true;
  }
});

// ✅ Next Button Handler
async function nextStep() {
  const section = steps[currentStep.value - 1].section as keyof typeof schemas;
  const validator = schemas[section];

  errors.value = {}; // clear old errors

  try {
    isLoading.value = true;

    // ✅ Validate with Yup
    await validator.validate(store[section], { abortEarly: false });

    // ✅ API call only if data changed
    if (store.hasChanged(section)) {
      await saveStepData(section);
      store.saveSnapshot(section);
    }

    if (currentStep.value < steps.length) {
      currentStep.value++;
      router.replace({ query: { step: currentStep.value.toString() } });
    } else {
      alert('🎉 Onboarding Completed!');
    }
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      err.inner.forEach((e: any) => {
        if (e.path) {
          errors.value[`${section}.${e.path}`] = e.message;
        }
      });
    } else if (err.response?.data?.errors) {
      // ✅ Map server errors
      Object.entries(err.response.data.errors).forEach(([key, val]: any) => {
        errors.value[`${section}.${key}`] = val[0];
      });
    }
  } finally {
    isLoading.value = false;
  }
}
async function validateField(path: string, value: any) {
  // path = "businessInfo.businessName"
  const [section, field] = path.split('.');

  try {
    // Validate only this field using its schema
    await schemas[section as keyof typeof schemas].validateAt(field, { [field]: value });
    delete errors.value[path]; // Remove error if valid
  } catch (err: any) {
    errors.value[path] = err.message; // Set error if invalid
  }
}
// ✅ Save Data Per Step
async function saveStepData(section: string) {
  switch (section) {
    case 'businessInfo':
      await campaignService.submitAboutBusiness({ name: store.businessInfo.businessName });
      break;

    case 'goalCampaign':
      if (!store.goalCampaign.id) {
        const { data } = await campaignService.create(store.goalCampaign);
        store.updateSection('goalCampaign', { id: data.id });
      } else {
        await campaignService.updateCampaign(store.goalCampaign.id!, store.goalCampaign);
      }
      break;

    case 'adSettings':
      if (!store.goalCampaign.id) throw new Error('Campaign ID missing for Ad creation');
      await adService.create({ ...store.adSettings, campaign_id: store.goalCampaign.id });
      break;

    case 'paymentSettings':
      await clientBillingService.createBilling(store.paymentSettings);
      break;

    case 'paymentProfile':
      const formData = new FormData();
      formData.append('legal_name', store.paymentProfile.legal_name || '');
      formData.append('street_address', store.paymentProfile.street_address || '');
      formData.append('detail_address', store.paymentProfile.detail_address || '');
      formData.append('city_district', String(store.paymentProfile.city_district || ''));
      formData.append('province', String(store.paymentProfile.province || ''));
      formData.append('postal_code', String(store.paymentProfile.postal_code || ''));
      formData.append('contact_name', store.paymentProfile.contact_name || '');
      formData.append('phone', store.paymentProfile.phone || '');
      store.paymentProfile.email.forEach(email => {
        formData.append('email[]', email);
      });

      if (store.paymentProfile.image) {
        formData.append('image', store.paymentProfile.image);
      }

      if (!store.paymentProfile.id) {
        const { data } = await clientBillingService.createPaymentProfile(formData);
        store.updateSection('paymentProfile', { id: data.id });
      }
      break;
  }
}

function prevStep() {
  if (currentStep.value > 1) {
    currentStep.value--;
    router.replace({ query: { step: currentStep.value.toString() } });
  }
}
</script>

<template>
  <CampaignHeader />
  <div class="flex w-full h-[calc(100vh-70px)]">
    <!-- Sidebar -->
    <div class="max-w-[280px] sticky top-0 bg-[#E0DCD6] p-6 border-r">
      <div v-for="(step, index) in steps" :key="index" class="relative flex items-start gap-3 pb-6">
        <div v-if="index < steps.length - 1" class="absolute left-4 top-6 w-0.5 h-12 bg-primary"
          :class="{ 'bg-secondary': currentStep > index + 1 }"></div>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
            :class="{ 'bg-secondary text-white': currentStep >= index + 1, 'bg-gray-200 text-black': currentStep < index + 1 }">
            {{ currentStep > index + 1 ? '✓' : index + 1 }}
          </div>
          <span :class="currentStep === index + 1 ? 'text-primary font-bold' : 'text-gray-600'">
            {{ step.title }}
          </span>
        </div>
      </div>
    </div>

    <!-- Main -->
    <div class="flex-1 p-6 bg-[#eeeeee] overflow-y-auto">
      <div class="mx-auto max-w-[700px]">
        <div v-if="!formReady" class="text-center py-10">Loading...</div>

        <component v-else :is="steps[currentStep - 1].component" :errors="errors" :validateField="validateField" />

        <div class="mt-6 flex justify-between">
          <Button type="button" variant="outline" @click="prevStep"
            :disabled="currentStep === 1 || isLoading">Back</Button>
          <Button type="button" class="btn" :disabled="isLoading" @click="nextStep">
            <Loader v-if="isLoading" class="animate-spin" />
            {{ currentStep === steps.length ? 'Finish' : 'Next' }}
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
