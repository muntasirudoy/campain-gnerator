<script setup>
import PageLayout from '@/layouts/components/PageLayout.vue';
import CustomTable from '@/shared/components/CustomTable.vue';
import AdsDetailsTableAction from './AdsDetailsTableAction.vue';
import SectionTitle from '@/views/dashboard/components/SectionTitle.vue';
import AdsDetailsCard from '@/views/dashboard/modules/client/ads/ads.details/AdsDetailsCard.vue';




</script>

<template>
    <PageLayout title="Ad Details" >
        <AdsDetailsCard />
        <!-- <AdsDetailsTableAction /> -->
        <CustomTable title="Ads Overview" />
    </PageLayout>
</template>
