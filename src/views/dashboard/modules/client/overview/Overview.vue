<script setup>
import PageLayout from "@/layouts/components/PageLayout.vue";
import OverviewCard from "./components/OverviewCard.vue";
import OverviewFilter from "./components/OverviewFilter.vue";
// import OverviewCard from '@/views/dashboard/modules/client/overview/components/OverviewCard.vue';
</script>

<template>
  <PageLayout>
    <div class="min-h-screen">
      <!-- <SectionTitle>Overview </SectionTitle>
      <div class="my-6">
        <div class="flex gap-4 mb-4">
          <SelectWithLabel label="Filter (2)" />
          <SelectWithLabel label="Campaigns" />
        </div>

        <div
          class="flex gap-4 text-sm text-gray-600 flex-col md:flex-row items-start md:items-center"
        >
          <span class="font-medium">Filter</span>
          <div class="bg-white rounded-2xl px-3 py-2 font-primary">
            <span>Campaign status: Enable, Paused</span>
          </div>
          <div class="bg-white rounded-2xl px-3 py-2 font-primary">
            <span>Ads status: Enable, Paused</span>
          </div>
          <button
            class="text-secondary font-primary cursor-pointer hover:text-red-700"
          >
            Add filter
          </button>
        </div>
      </div> -->
      <OverviewFilter />

      <!-- <div class="flex justify-between items-center mb-6">
        <div class="flex items-center gap-4">
          <button class="text-sm text-gray-600 hover:text-gray-800">
            Filter
          </button>
          <Select>
            <SelectTrigger
              className="w-[180px] border-[1px] border-gray-300 flex items-center justify-between p-2 rounded-sm bg-white"
            >
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <button class="text-sm text-primary font-primary hover:text-red-700">
            Show last 30 days
          </button>
        </div>
      </div> -->

      <!-- <RouterLink to="/create-campaign">
        <Button class="btn px-6">
          <span class="text-lg">+</span>
          NEW CAMPAIGN
        </Button>
      </RouterLink> -->

      <div class="bg-white rounded-lg shadow-sm p-6 my-3">
        <h2 class="text-lg font-medium text-orange-500 mb-6">
          Account Diagnostics
        </h2>
        <div class="flex flex-col items-center justify-center py-12">
          <div class="w-48 h-48 bg-gray-300 rounded-full mb-6"></div>
          <div class="text-center max-w-md">
            <p class="text-gray-700 mb-2">
              Payment invoice will be sent to your email and your campaign will
              review by our team.
            </p>
            <p class="text-gray-500 text-sm">
              Please check your notification regularly.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <OverviewCard title="Ads Overview" @action="handleAdsDetails">
          <div class="space-y-2">
            <p class="text-gray-700 font-medium">Your ads still on reviewed.</p>
            <p class="text-gray-600 text-sm">
              Please contact our team for information:
            </p>
            <div class="mt-4 space-y-1 text-sm text-gray-600">
              <p>Evan Lee</p>
              <p>+12 34567890</p>
              <p>Lee_Evan@gmail.com</p>
            </div>
          </div>
        </OverviewCard>

        <OverviewCard title="Billing" @action="handleBillingDetails">
          <div class="space-y-4">
            <div>
              <p class="text-gray-600 text-sm mb-1">
                Available funds as of Apr 25, 2025
              </p>
              <p class="text-3xl font-bold text-orange-500">$ 0.00</p>
            </div>
            <div>
              <p class="text-gray-700 font-medium mb-1">Last payment</p>
              <p class="text-gray-500 text-sm">
                You haven't made any payments yet
              </p>
            </div>
          </div>
        </OverviewCard>

        <OverviewCard title="Screens Overview" @action="handleScreensDetails">
          <div class="flex items-center justify-between">
            <div class="flex-1">
              <img src="/dashboard/map.png" alt="map" />
            </div>
            <div class="text-right">
              <p class="text-gray-600 text-sm mb-1">Total Screen</p>
              <p class="text-4xl font-bold text-orange-500">0</p>
            </div>
          </div>
        </OverviewCard>
      </div>
    </div>
  </PageLayout>
</template>

<!-- <template>
    <header
        class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div class="flex items-center gap-2 px-4">
            Overview
        </div>
    </header>
    <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div class="grid auto-rows-min gap-4 md:grid-cols-3">
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
            <div class="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div class="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
</template>
<script>
export default {

}
</script>
<style lang="ts">

</style> -->
