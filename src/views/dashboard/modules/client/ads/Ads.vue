<script setup>
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PageLayout from "@/layouts/components/PageLayout.vue";
import SelectWithLabel from "@/views/dashboard/components/SelectWithLabel.vue";

import SectionTitle from "@/views/dashboard/components/SectionTitle.vue";
import AdsChart from "@/views/dashboard/modules/client/ads/components/AdsChart.vue";
import AdsTable from "@/views/dashboard/modules/client/ads/components/AdsTable.vue";
</script>

<template>
  <PageLayout title="Ads Overview">
    <div class="flex gap-10 items-center mt-3">
      <SelectWithLabel label="Filter (2)" />
    </div>
    <Separator class="bg-primary/20 mt-3" />
    <AdsChart />
    <AdsTable />
  </PageLayout>
</template>
