<script setup lang="ts">
import { useGoBack } from "@/composeable/useGoBack";
import { useToast } from "@/composeable/useToast";
import PageLayout from "@/layouts/components/PageLayout.vue";
import CampaignForm from "@/shared/components/campaign/CampaignForm.vue";
import CampaignTypes from "@/shared/components/campaign/CampaignTypes.vue";
import { useCampaignStore } from "@/store/common/campaign-store";
import { CampaignPayload } from "@/types/campaign-types";
import { ref } from "vue";
import { useRoute } from "vue-router";

const campaignStore = useCampaignStore();
const goal_id = ref(1);
const { showToast } = useToast();
const route = useRoute();
const { goBack } = useGoBack();
const selectGole = (goal: number) => {
  goal_id.value = goal;
};
const handleSubmit = async (payload: CampaignPayload) => {
  try {
    let res = await campaignStore.updateCampaign(Number(route.params.id), {
      ...payload,
      goal_id: goal_id.value,
    });
    goBack();
    showToast(res.message, "", "success");
  } catch (error) {
    showToast("Something went wrong!", "", "error");
  }
};
</script>
<template>
  <PageLayout title="Edit Campaign">
    <div class="max-w-3xl px-4">
      <CampaignTypes @update:goal="selectGole" />
      <CampaignForm @submit="handleSubmit" />
    </div>
  </PageLayout>
</template>
