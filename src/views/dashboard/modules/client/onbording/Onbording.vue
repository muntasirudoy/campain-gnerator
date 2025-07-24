<template>
  <Form
    v-slot="{ meta, values, validate, setFieldValue, setValues }"
    :validation-schema="toTypedSchema(schemas[stepIndex - 1])"
    :initial-values="getInitialValuesForStep(stepIndex)"
    :key="stepIndex"
    class="h-screen overflow-hidden bg-[#E0DCD680]"
  >
    <Stepper
      v-slot="{ nextStep, prevStep, isNextDisabled, isPrevDisabled }"
      v-model="stepIndex"
      class="block w-full"
    >
      <form
        @submit.prevent="
          async () => {
            await validate();
            if (stepIndex === steps.length && meta.valid) onSubmit();
          }
        "
      >
        <div class="flex w-full gap-6">
          <!-- Sidebar Steps -->
          <div class="max-w-[280px] bg-white h-screen sticky left-0 w-full p-6">
            <div class="space-y-1 mb-8">
              <h2 class="text-xl font-semibold text-gray-900">
                Create your campaign
              </h2>
            </div>

            <StepperItem
              v-for="step in steps"
              :key="step.step"
              :step="step.step"
              class="relative flex w-full items-start gap-4 pb-8"
              v-slot="{ state }"
            >
              <div
                v-if="step.step < steps.length"
                class="absolute left-4 top-8 w-0.5 h-16 bg-gray-200"
                :class="{
                  'bg-orange-500':
                    state === 'completed' || stepIndex > step.step,
                }"
              ></div>

              <StepperTrigger
                as-child
                class="flex items-start gap-4 w-full text-left"
              >
                <div
                  class="flex items-start gap-4 w-full cursor-pointer"
                  :disabled="!canNavigateToStep(step.step)"
                >
                  <div
                    class="flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium z-10 bg-white"
                    :class="{
                      'border-orange-500 text-white': state === 'active',
                      'border-green-500 text-white': state === 'completed',
                      'border-gray-300 text-gray-400': state === 'inactive',
                    }"
                  >
                    <Check v-if="state === 'completed'" class="w-4 h-4" />
                    <span v-else>{{ step.step }}</span>
                  </div>

                  <div class="flex-1 min-w-0">
                    <StepperTitle
                      class="text-sm font-medium leading-tight"
                      :class="{
                        'text-orange-600': state === 'active',
                        'text-green-900': state === 'completed',
                        'text-gray-500': state === 'inactive',
                      }"
                    >
                      {{ step.title }}
                    </StepperTitle>
                  </div>
                </div>
              </StepperTrigger>
            </StepperItem>
          </div>

          <!-- Main Content -->
    
        </div>
      </form>
    </Stepper>
  </Form>
</template>

<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Stepper,
  StepperItem,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { useToast } from "@/composeable/useToast";
import { CAMPAIGN_BUDGET_TYPE, CAMPAIGN_GOAL } from "@/constant/campaign";
import { campaignService } from "@/services/common/campain-service";
import { toTypedSchema } from "@vee-validate/yup";
import { Check } from "lucide-vue-next";
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { toast } from "vue-sonner";
import * as yup from "yup";
import BusinessInfo from "./steps/BusinessInfo.vue";
import { AdConstant } from "@/constant/ads";
import GoalCampaign from "./steps/GoalCampaign.vue";
import AdSettings from "./steps/AdSettings.vue";
import { adService } from "@/services/common/ads-service";
const { showToast } = useToast();
const formData = reactive({
  businessName: "",
  goal_id: CAMPAIGN_GOAL.awarness,
  name: "",
  budget_type: CAMPAIGN_BUDGET_TYPE.total,
  budget: "",
  start_time: "",
  end_time: "",
  location: 1,
  out_url: "https://abc.com",
  format_ads: 1,
  bid_strategy: 1,
  type: "video ads",
  campaignSettings: "",
  paymentMethod: "",
  billingAddress: "",
  adName: "",
  audiences: [
    {
      gender: AdConstant.AUDIENCE_TARGET_FEMALE,
      age_group: AdConstant.AGE_GROUP_18_24,
    },
  ],
 video_url:''
});

// Track which steps have been completed/visited
const completedSteps = ref(new Set<number>());

const schemas = [
  yup.object({
    businessName: yup.string().required("Business name is required"),
  }),
  yup.object({
    goal_id: yup.number().required("Please select a goal"),
    name: yup.string().required("Campaign name is required").max(245),
    budget_type: yup
      .number()
      .oneOf([CAMPAIGN_BUDGET_TYPE.total, CAMPAIGN_BUDGET_TYPE.daily])
      .required("Budget type is required"),
    budget: yup.string().required("Budget amount is required"),
    start_time: yup.string().required("Start date is required"),
    end_time: yup.string().required("End date is required"),
    location: yup.number().required("Location is required"),
    out_url: yup.string().default("https://abc.com"),
    format_ads: yup.number().default(1),
    bid_strategy: yup.number().default(1),
    type: yup.string().optional().default("video ads"),
  }),
  yup.object({
    adName: yup.string().max(255).required("Ad name is required!"),
    video_url: yup.string().required("Video is required!"),
    audiences: yup
      .array()
      .of(
        yup.object({
          gender: yup.string().required("Gender is required"),
          age_group: yup.number().required("Age group is required"),
        })
      )
      .test(
        "no-duplicate-audience",
        "Duplicate audience not allowed",
        (audiences) => {
          if (!audiences) return true;
          const seen = new Set();
          for (const { gender, age_group } of audiences) {
            const key = `${gender}-${age_group}`;
            if (seen.has(key)) return false;
            seen.add(key);
          }
          return true;
        }
      ),
  }),

  yup.object({
    paymentMethod: yup.string().required("Please select a payment method"),
  }),
  yup.object({
    billingAddress: yup.string().required("Billing address is required"),
    favoriteDrink: yup.string().required("Please select a drink"),
  }),
];

const steps = [
  {
    step: 1,
    title: "About your business",
    description: "Tell us about your business",
  },
  { step: 2, title: "Campaign Objective", description: "Choose a campaign" },
  { step: 3, title: "Ad Settings", description: "Choose a ads" },
  { step: 4, title: "Payment Settings", description: "Payment settings" },
  { step: 5, title: "Billing Information", description: "Billing" },
];

const route = useRoute();
const router = useRouter();
const stepIndex = ref(1);

// Function to get initial values for each step based on stored data
const getInitialValuesForStep = (step: number) => {
  const stepFields = {
    1: ["businessName"],
    2: [
      "goal_id",
      "name",
      "budget_type",
      "budget",
      "start_time",
      "end_time",
      "location",
      "out_url",
      "format_ads",
      "bid_strategy",
      "type",
    ],
    3: ["adName", "video_url", "audiences"],
    4: ["paymentMethod"],
    5: ["billingAddress", "favoriteDrink"],
  };

  const initialValues: Record<string, any> = {};
  const fieldsForStep = stepFields[step as keyof typeof stepFields] || [];

  fieldsForStep.forEach((field) => {
    if (formData[field as keyof typeof formData] !== undefined) {
      initialValues[field] = formData[field as keyof typeof formData];
    }
  });

  console.log(`Initial values for step ${step}:`, initialValues);
  return initialValues;
};

// Function to update centralized form data
const updateFormData = (field: string, value: any) => {
  (formData as any)[field] = value;
  console.log(`Updated ${field}:`, value);
  console.log("Current form data:", formData);
};

// Function to check if user can navigate to a specific step
const canNavigateToStep = (targetStep: number) => {
  return targetStep <= stepIndex.value || completedSteps.value.has(targetStep);
};
function formatDateToYMDHIS(dateStr: string, time = "00:00:00"): string {
  // Check if dateStr matches expected format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    throw new Error("Invalid date format. Expected 'YYYY-MM-DD'");
  }

  return `${dateStr} ${time}`;
}
onMounted(() => {
  const stepFromQuery = Number(route.query.step);
  if (
    !isNaN(stepFromQuery) &&
    stepFromQuery >= 1 &&
    stepFromQuery <= steps.length
  ) {
    stepIndex.value = stepFromQuery;
  }
});

onMounted(async () => {
  let campaign = await campaignService.getAllCampaign();
  console.log(campaign);
});

watch(stepIndex, (newStep) => {
  router.replace({ query: { ...route.query, step: newStep.toString() } });
});

const saveStepData = async (step: number, data: any) => {
  Object.keys(data).forEach((key) => {
    if (formData.hasOwnProperty(key)) {
      (formData as any)[key] = data[key];
    }
  });
  console.log(data);

  completedSteps.value.add(step);

  if (step === 1) {
    let res = await campaignService.submitAboutBusiness({
      name: data.businessName,
    });
    if (res.success) {
      stepIndex.value++;
      showToast(res.message, "", "success");
    }
  }
  if (step === 2) {
    let res = await campaignService.create({
      ...data,
      start_time: formatDateToYMDHIS(data.start_time),
      end_time: formatDateToYMDHIS(data.end_time),
    });
    if (res.success) {
      stepIndex.value++;
      showToast(res.message, "", "success");
    }
  }
  if (step === 3) {
    let res = await adService.create({
      ...data,
      start_time: formatDateToYMDHIS(data.start_time),
      end_time: formatDateToYMDHIS(data.end_time),
    });
    if (res.success) {
      stepIndex.value++;
      showToast(res.message, "", "success");
    }
  }
};

const handleNextClick = async (
  validateFn: () => Promise<{ valid: boolean }>,
  currentValues: any,
  nextStepFn: () => void,
  setValuesFn: (values: Record<string, any>) => void
) => {
  const { valid } = await validateFn();
  const step = nextStepFn();
  stepIndex.value;
  nextStepFn();
  if (!valid) return;

  await saveStepData(stepIndex.value, currentValues);
};

const handlePrevClick = (currentValues: any, prevStepFn: Function) => {
  Object.keys(currentValues).forEach((key) => {
    if (formData.hasOwnProperty(key)) {
      (formData as any)[key] = currentValues[key];
    }
  });

  prevStepFn();
};

function onSubmit() {
  toast.success("All steps submitted!");
  console.log("Final form values:", formData);
}
</script>
