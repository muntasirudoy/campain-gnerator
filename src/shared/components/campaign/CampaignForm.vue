<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Field, useForm } from "vee-validate";
import * as yup from "yup";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CAMPAIGN_BUDGET_TYPE } from "@/constant/campaign";
import { useCampaignStore } from "@/store/common/campaign-store";
import { Loader, Save } from "lucide-vue-next";
import { useRoute } from "vue-router";
import SuccessMessage from "../SuccessMessage.vue";
import { campaignService } from "@/services/common/campain-service";

const route = useRoute();
const campaignStore = useCampaignStore();
const emit = defineEmits<{
  (e: "submit", payload: any): void;
}>();

 function formatToYMDHIS(datetimeLocal: string) {
  const date = new Date(datetimeLocal);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
}

function formatForDatetimeLocal(dateStr: string): string {
  const date = new Date(dateStr);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

const schema = yup.object({
  name: yup.string().required().max(245),
  budget_type: yup
    .number()
    .oneOf([CAMPAIGN_BUDGET_TYPE.total, CAMPAIGN_BUDGET_TYPE.daily])
    .required(),
  budget: yup.number().required(),
  start_time: yup.string().required(),
  end_time: yup.string().required(),
  location: yup.number().default(1),
  out_url: yup.string().default("https://abc.com"),
  format_ads: yup.number().default(1),
  bid_strategy: yup.number().default(1),
   type: yup.string().optional().default('video ads'),
});


const initialValues = {
  name: "Campaign #1",
  budget_type: CAMPAIGN_BUDGET_TYPE.total,
  budget: 0,
  start_time: "",
  end_time: "",
  location: 1,
  out_url: "https://abc.com",
  format_ads: 1,
  bid_strategy: 1,
  type: "video ads",
};

const { setValues, handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues,
});



onMounted(async () => {
  const id = route.params.id;
  if (id) {
    try {
      const response = await campaignService.getCampaign(
        parseInt(id as string)
      );
      const data = response.data;

      const formattedValues = {
        name: data.name ?? "",
        budget_type: data.budget_type?.value ?? CAMPAIGN_BUDGET_TYPE.total,
        budget: Number(data.budget) ? Number(data.budget) : 0,
        start_time: toDateInputValue(data.start_time),
        end_time: toDateInputValue(data.end_time),
        location: data.location?.value ?? 1,
        out_url: data.out_url ?? "https://abc.com",
        format_ads: data.format_ads?.value ?? 1,
        bid_strategy: data.bid_strategy?.value ?? 1,
        type: data.type ?? "video ads",
      };

      console.log("Formatted Values for Form:", formattedValues);
      setValues(formattedValues);
    } catch (error) {
      console.error("Failed to load campaign:", error);
    }
  }
});

function toDateInputValue(dateStr: string) {
  const date = new Date(dateStr);
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

const onSubmit = handleSubmit((values) => {
  const payload = {
    ...values,
    start_time: formatToYMDHIS(values.start_time),
    end_time: formatToYMDHIS(values.end_time),
  };
  emit("submit", payload);
});
</script>

<template>
  <h2
    class="text-[22px] tracking-normal font-primary font-semibold mb-4 text-gray-800"
  >
    Campaign Settings
  </h2>

  <form @submit="onSubmit" class="space-y-6 w-full max-w-3xl mr-auto mt-6">
    <Accordion
      type="multiple"
      :default-value="['campaign-name', 'budget-dates']"
      class="space-y-3"
    >
      <!-- Campaign Name -->
      <AccordionItem
        value="campaign-name"
        class="bg-white px-6 rounded-sm font-primary"
      >
        <AccordionTrigger class="text-lg font-medium !no-underline"
          >Campaign name</AccordionTrigger
        >
        <AccordionContent>
          <Field name="name" v-slot="{ field, errorMessage }">
            <Input
              v-bind="field"
              placeholder="Enter campaign name"
              class="border-yellow-500 focus-visible:ring-yellow-600/50 rounded-none h-[40px]"
            />
            <p v-if="errorMessage" class="text-sm text-red-600 mt-1">
              {{ errorMessage }}
            </p>
          </Field>
        </AccordionContent>
      </AccordionItem>

      <!-- Format Ads -->
      <AccordionItem
        value="format-ads"
        class="bg-white px-6 rounded-sm font-primary"
      >
        <AccordionTrigger class="text-lg font-medium"
          >Format ads</AccordionTrigger
        >
        <AccordionContent class="text-sm text-muted-foreground">
          <p>
            Showing your ads across video ad format can help you get up to 100%
            more views.
            <br />
            Your strategy will be Target CPP (Cost per Play).
          </p>
        </AccordionContent>
      </AccordionItem>

      <!-- Bid Strategy -->
      <AccordionItem
        value="bid-strategy"
        class="bg-white px-6 rounded-sm font-primary"
      >
        <AccordionTrigger class="text-lg font-medium"
          >Bid strategy</AccordionTrigger
        >
        <AccordionContent
          class="text-sm text-muted-foreground flex justify-between gap-4"
        >
          <div>
            <h4 class="font-semibold mb-1">Target CPP (Cost per Play)</h4>
            <p>
              You only get charged when your DOOH video ad plays on a device.
            </p>
          </div>
          <p class="w-1/2">
            With Target CPP, we set the average amount you're willing to pay for
            one video play.
          </p>
        </AccordionContent>
      </AccordionItem>

      <!-- Budget and Dates -->
      <AccordionItem
        value="budget-dates"
        class="bg-white px-6 rounded-sm font-primary"
      >
        <AccordionTrigger class="text-lg font-medium"
          >Budget and dates</AccordionTrigger
        >
        <AccordionContent>
          <div class="space-y-4 p-2">
            <div class="flex items-center gap-4">
              <!-- Budget Type -->
              <Field name="budget_type" v-slot="{ field }">
                <Select
                  :model-value="field.value"
                  @update:model-value="field.value = $event"
                >
                  <SelectTrigger class="w-1/2 rounded-none !h-[41px] border-2">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem :value="CAMPAIGN_BUDGET_TYPE.total"
                      >Campaign Total</SelectItem
                    >
                    <SelectItem :value="CAMPAIGN_BUDGET_TYPE.daily"
                      >Daily Budget</SelectItem
                    >
                  </SelectContent>
                </Select>
              </Field>

              <!-- Budget Amount -->
              <Field name="budget" v-slot="{ field, errorMessage }">
                <Input
                  v-bind="field"
                  type="number"
                  placeholder="BDT"
                  class="w-1/2 rounded-none h-[40px] border-2"
                />
                <p v-if="errorMessage" class="text-sm text-red-600">
                  {{ errorMessage }}
                </p>
              </Field>
            </div>

            <!-- Dates -->
            <div class="border-2 p-4 space-y-4">
              <div class="flex gap-5 items-center">
                <Field name="start_time" v-slot="{ field, errorMessage }">
                  <div>
                    <Label>Start date</Label>
                    <Input
                      type="date"
                      v-bind="field"
                      class="rounded-none w-fit h-[40px] border-2 mt-1.5"
                    />
                    <p v-if="errorMessage" class="text-sm text-red-600 mt-1">
                      {{ errorMessage }}
                    </p>
                  </div>
                </Field>

                <Field name="end_time" v-slot="{ field, errorMessage }">
                  <div>
                    <Label>End date</Label>
                    <Input
                      type="date"
                      v-bind="field"
                      class="w-fit rounded-none h-[40px] border-2 mt-1.5"
                    />
                    <p v-if="errorMessage" class="text-sm text-red-600 mt-1">
                      {{ errorMessage }}
                    </p>
                  </div>
                </Field>
              </div>

              <p class="text-sm text-muted-foreground">
                Campaign total budget represents your total spend. You must
                schedule an end date for this campaign.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <!-- Locations -->
      <AccordionItem
        value="locations"
        class="bg-white px-6 rounded-sm font-primary"
      >
        <AccordionTrigger class="text-lg font-medium"
          >Locations</AccordionTrigger
        >
        <AccordionContent>
          <Field name="location" v-slot="{ field }">
            <RadioGroup
              :model-value="field.value"
              @update:model-value="field.value = $event"
              class="space-y-2"
            >
              <div class="flex items-center gap-2">
                <RadioGroupItem :value="1" id="global" />
                <Label for="global">All countries and territories</Label>
              </div>
            </RadioGroup>
          </Field>
        </AccordionContent>
      </AccordionItem>
    </Accordion>


    <div class="flex justify-end">
      <Button type="submit" class="btn mx-0 px-10 py-3">
        <Loader v-if="campaignStore.loading" class="mr-2 h-4 w-4" />
        <Save v-if="!campaignStore.loading" class="mr-2 h-4 w-4" />
        Save
      </Button>
    </div>
  </form>
</template>
