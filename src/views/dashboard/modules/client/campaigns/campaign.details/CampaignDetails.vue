<script setup>
import PageLayout from '@/layouts/components/PageLayout.vue';
import AdsTable from '../../ads/components/AdsTable.vue';
import CampaignDetailsCard from './CampaignDetailsCard.vue';


</script>

<template>
    <PageLayout :title="'Campaigns Details'">
        <CampaignDetailsCard />
     
        <!-- <CustomTable title="Ads Overview" /> -->
         <h1 class=" font-primary text-[22px] font-semibold mt-6">Ads Overview</h1>
         <AdsTable />
    </PageLayout>
</template>
