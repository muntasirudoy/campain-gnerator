<template>
  <div>
    <h2 class="font-primary text-[22px] my-5 space-y-4">What’s your campaign objective?</h2>

    <!-- ✅ Goal Selection -->
    <div class="space-y-6 bg-white rounded-lg border p-6 mb-4">
      <h2 class="text-[20px] font-primary font-semibold mb-4 text-gray-800">
        Choose your goal
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Awareness -->
        <Card :class="store.goalCampaign.goal_id === 1 ? activeCardClass : baseCardClass"
          @click="store.goalCampaign.goal_id = 1">
          <CardContent class="flex flex-col items-start space-y-2">
            <div class="text-yellow-500 text-2xl">⭐</div>
            <h3 class="font-medium">Awareness</h3>
            <p class="text-sm text-muted-foreground">
              Reach a broad, hyper-local and ready-to-buy audience.
            </p>
          </CardContent>
        </Card>

        <!-- Traffic -->
        <Card class="relative bg-muted pointer-events-none opacity-60">
          <CardContent class="flex flex-col items-start space-y-2">
            <div class="text-yellow-500 text-2xl">🚀</div>
            <h3 class="font-medium">Traffic</h3>
            <p class="text-sm text-muted-foreground">Coming Soon</p>
          </CardContent>
          <div class="absolute top-0 right-0 bg-orange-600 text-white text-xs px-2 py-1 rounded-bl-lg">
            Coming soon
          </div>
        </Card>
      </div>
    </div>

    <!-- ✅ Accordion -->
    <Accordion type="multiple" :default-value="['campaign-name', 'budget-dates', 'location']" class="space-y-4 m-0">
      <!-- Campaign Name -->
      <AccordionItem value="campaign-name" class="bg-white">
        <AccordionTrigger class="text-base font-semibold text-[18px] px-6 font-primary">
          Campaign name
        </AccordionTrigger>
        <AccordionContent class="p-6">
          <label class="block mb-2 text-sm font-medium">Campaign Name</label>
          <Input v-model="store.goalCampaign.name" placeholder="Enter campaign name" />
        </AccordionContent>
      </AccordionItem>

      <!-- Budget & Dates -->
      <AccordionItem value="budget-dates" class="bg-white">
        <AccordionTrigger class="text-base font-semibold text-[18px] px-6 font-primary">Budget and dates
        </AccordionTrigger>
        <AccordionContent class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 text-sm font-medium">Budget Type</label>
              <select v-model="store.goalCampaign.budget_type" class="w-full border rounded px-3 py-2">
                <option value="1">Total</option>
                <option value="2">Daily</option>
              </select>
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium">Budget Amount</label>
              <Input type="number" v-model="store.goalCampaign.budget" placeholder="Enter amount" />
            </div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-2 text-sm font-medium">Start Date</label>
              <Input type="date" v-model="store.goalCampaign.start_time" />
            </div>
            <div>
              <label class="block mb-2 text-sm font-medium">End Date</label>
              <Input type="date" v-model="store.goalCampaign.end_time" />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <!-- Location -->
      <AccordionItem value="location" class="bg-white">
        <AccordionTrigger class="text-base font-semibold text-[18px] px-6 font-primary">Locations</AccordionTrigger>
        <AccordionContent class="p-6">
          <label class="block mb-2 text-sm font-medium">Select Location</label>
          <select v-model="store.goalCampaign.location" class="w-full border rounded px-3 py-2">
            <option value="1">Location 1</option>
            <option value="2">Location 2</option>
          </select>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useOnboardingStore } from "../store/campaign.store";

const store = useOnboardingStore();
const baseCardClass = "cursor-pointer border bg-white hover:border-primary";
const activeCardClass = "cursor-pointer border-2 border-primary bg-primary/10";
</script>
