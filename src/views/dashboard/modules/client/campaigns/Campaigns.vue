<script setup>
import PageLayout from '@/layouts/components/PageLayout.vue';

import { Separator } from '@/components/ui/separator';
import SectionTitle from '@/views/dashboard/components/SectionTitle.vue';
import SelectWithLabel from '@/views/dashboard/components/SelectWithLabel.vue';
import CampaignTable from './campaign.list/CampaignTable.vue';
import CampaignChart from './components/CampaignChart.vue';



</script>


<template>
  <PageLayout title="Campaign Overview">
    <div class="flex gap-10 items-center mt-3">
        <SelectWithLabel label="Filter (2)" />
    </div>
    <Separator class="bg-primary/20 mt-3" />
    <CampaignChart/>
    <CampaignTable />
  </PageLayout>
</template>