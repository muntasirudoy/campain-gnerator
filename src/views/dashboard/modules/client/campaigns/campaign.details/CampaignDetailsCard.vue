<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useCampaignStore } from "@/store/common/campaign-store";
import { Campaign } from "@/types/campaign-types";
import { campaignService } from "@/services/common/campain-service";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-vue-next";
import CampaignDetailsSkelton from "./CampaignDetailsSkelton.vue";
import { useDateTime } from "@/composeable/useDateTime";

const route = useRoute(); // get access to the current route
const campaignStore = useCampaignStore();
const {formatDate} = useDateTime()
const campaign = ref<Campaign>();
const isLoading = ref(false);
const error = ref("");
onMounted(async () => {
  try {
    isLoading.value = true;
    const id = route.params.id;
    const { data } = await campaignService.getCampaign(parseInt(id as string));
    campaign.value = data;
    isLoading.value = false;
  } catch (error) {
    console.error("Error fetching campaign:", error);
    isLoading.value = false;
  }
});
</script>

<template>
  <CampaignDetailsSkelton v-if="isLoading" />
  <div v-if="!isLoading">
    <div
      class="w-full max-w-[700px] rounded-lg border bg-white p-6 shadow mt-5 font-secondary-Regular"
    >
      <div class="mb-4 text-sm font-medium text-gray-900">
        <div class="flex items-center gap-2">
          <span class="h-2 w-2 rounded-full bg-yellow-500" />
          <span class="capitalize">{{ campaign?.status?.label }}</span>
        </div>
      </div>

      <div class="mb-4 grid grid-cols-2 gap-x-4 text-sm text-gray-700">
        <div>
          <div class="font-medium text-gray-500">Type:</div>
          <div>{{ campaign?.format_ads?.label }}</div>
        </div>
        <div>
          <div class="font-medium text-gray-500">Goal:</div>
          <div>{{ campaign?.goal.name }}</div>
        </div>
      </div>

      <div class="mb-4 border-t pt-4 text-sm">
        <div class="text-gray-800">Campaign name</div>
        <div class="text-gray-500 font-medium">{{ campaign?.name }}</div>
      </div>

      <div class="mb-4 border-t pt-4 text-sm">
        <div class="text-gray-800">Format ads</div>
        <div class="text-gray-500 font-medium">Views with format video ads</div>
      </div>

      <div class="mb-4 border-t pt-4 text-sm">
        <div class="text-gray-800">Bid strategy</div>
        <div class="text-gray-500 font-medium">Target CPP (Cost per Play)</div>
      </div>

      <div class="mb-4 border-t pt-4 text-sm">
        <div class="text-gray-800 font-medium mb-1">Budget and dates</div>
        <div class="font-medium">
          Campaign {{ campaign?.budget_type.label }}
        </div>
        <div class="mb-2 text-gray-500 font-medium">{{ campaign?.budget }}</div>
        <div class="grid grid-cols-2 gap-x-4">
          <div>
            <div class="text-gray-800">Start Date</div>
            <div class="text-gray-500 font-medium">
              {{ formatDate(campaign?.start_time) }}
            </div>
          </div>
          <div>
            <div class="text-gray-800">End Date</div>
            <div class="text-gray-500 font-medium">
              {{ formatDate(campaign?.end_time )}}
            </div>
          </div>
        </div>
      </div>

      <div class="mb-6 border-t pt-4 text-sm">
        <div class="text-gray-800">Locations</div>
        <div class="text-gray-500 font-medium">
          {{ campaign?.location.label }}
        </div>
      </div>
      <RouterLink :to="`/client/campaigns/${campaign?.id}/edit`">
        <Button class="btn px-10"> <Pencil /> Edit </Button>
      </RouterLink>
    </div>
  </div>
</template>
