<script setup lang="ts">
import { useGoBack } from "@/composeable/useGoBack";
import { useToast } from "@/composeable/useToast";
import PageLayout from "@/layouts/components/PageLayout.vue";
import CampaignForm from "@/shared/components/campaign/CampaignForm.vue";
import CampaignTypes from "@/shared/components/campaign/CampaignTypes.vue";
import { useCampaignStore } from "@/store/common/campaign-store";
import { CampaignPayload } from "@/types/campaign-types";
import { ref } from "vue";
const campaignStore = useCampaignStore();
const { goBack } = useGoBack(); 
const goal_id = ref(1);
const { showToast } = useToast();
const selectGole = (goal: number) => {
  goal_id.value = goal;
};
const handleSubmit = async (payload: CampaignPayload) => {
  try {
    await campaignStore.createCampaign({
      ...payload,
      goal_id: goal_id.value,
    });

    showToast(campaignStore.message, "", "success");
    goBack()
  } catch (error) {
    showToast("Something went wrong!", "", "error");
  }
};
</script>

<template>
<PageLayout title="New Campaign">
    <div class=" max-w-3xl my-6 px-4">
    <h1 class="font-primary text-[24px]">What`s your campaign objective?</h1>
    <CampaignTypes @update:goal="selectGole" />
    <CampaignForm @submit="handleSubmit" />
  </div>
</PageLayout>
</template>
