<template>
  <div>
    <h2 class=" font-primary text-[22px] my-5">What’s your campaign objective?</h2>
    <FormField name="goal_id" v-slot="{ value, handleChange }">
      <FormItem>
        <div class="space-y-6 bg-white p-6 rounded-lg border ">
          <h2 class="text-[20px] font-primary font-semibold mb-4 text-gray-800">
            Choose your goal
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- Awareness -->
            <Card
              :class="value === CAMPAIGN_GOAL.awarness ? activeCardClass : baseCardClass"
              @click="handleChange(CAMPAIGN_GOAL.awarness)"
            >
              <CardContent class="flex flex-col items-start space-y-2">
                <div class="text-yellow-500 text-2xl">⭐</div>
                <h3 class="font-medium">Awareness</h3>
                <p class="text-sm text-muted-foreground">
                  Reach a broad, hyper-local and ready-to-buy audience to build interest in your brand/product.
                </p>
              </CardContent>
            </Card>

            <!-- Traffic (Disabled) -->
            <Card class="relative bg-muted pointer-events-none opacity-60">
              <CardContent class="flex flex-col items-start space-y-2">
                <div class="text-yellow-500 text-2xl">🚀</div>
                <h3 class="font-medium">Traffic</h3>
                <p class="text-sm text-muted-foreground">Get people to visit your website.</p>
              </CardContent>
              <div class="absolute top-0 right-0 bg-orange-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                Coming soon
              </div>
            </Card>

            <!-- In-store (Disabled) -->
            <Card class="relative bg-muted pointer-events-none opacity-60">
              <CardContent class="flex flex-col items-start space-y-2">
                <div class="text-gray-400 text-2xl">🛒</div>
                <h3 class="font-medium text-gray-600">In-store promotion</h3>
                <p class="text-sm text-gray-500">
                  Promote products already in-store to boost sales.
                </p>
              </CardContent>
              <div class="absolute top-0 right-0 bg-orange-600 text-white text-xs px-2 py-1 rounded-bl-lg">
                Coming soon
              </div>
            </Card>
          </div>

          <!-- Error message -->
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <!-- Accordion -->
    <Accordion
      type="multiple"
      :default-value="['campaign-name', 'format-ads', 'bid-strategy', 'budget-dates', 'location']"
      class="space-y-4 mt-6"
    >
      <!-- Campaign Name -->
      <AccordionItem value="campaign-name" class="bg-white">
        <AccordionTrigger class="text-base font-semibold text-[18px] px-6 font-primary">
          Campaign name
        </AccordionTrigger>
        <AccordionContent class="p-6">
          <FormField name="name" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Campaign Name</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Enter campaign name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </AccordionContent>
      </AccordionItem>

      <!-- Budget & Dates -->
      <AccordionItem value="budget-dates" class="bg-white px-6 py-3">
        <AccordionTrigger class="text-base font-semibold">Budget and dates</AccordionTrigger>
        <AccordionContent class="pt-4 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <!-- Budget Type -->
            <FormField name="budget_type" v-slot="{ componentField }">
              <FormItem>
                <FormLabel>Budget Type</FormLabel>
                <FormControl>
                  <select v-bind="componentField" class="w-full border px-3 py-2 rounded-md">
                    <option value="" disabled>Select type</option>
                    <option :value="CAMPAIGN_BUDGET_TYPE.total">Total</option>
                    <option :value="CAMPAIGN_BUDGET_TYPE.daily">Daily</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- Budget Amount -->
            <FormField name="budget" v-slot="{ componentField }">
              <FormItem>
                <FormLabel>Budget Amount</FormLabel>
                <FormControl>
                  <Input type="number" min="0" v-bind="componentField" placeholder="Enter amount" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <!-- Start Date -->
            <FormField name="start_time" v-slot="{ componentField }">
              <FormItem>
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <Input type="date" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <!-- End Date -->
            <FormField name="end_time" v-slot="{ componentField }">
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <Input type="date" v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
          </div>
        </AccordionContent>
      </AccordionItem>

      <!-- Location -->
      <AccordionItem value="location" class="bg-white px-6 py-3">
        <AccordionTrigger class="text-base font-semibold">Locations</AccordionTrigger>
        <AccordionContent class="pt-2">
          <FormField name="location" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Select Location</FormLabel>
              <FormControl>
                <select v-bind="componentField" class="w-full border px-3 py-2 rounded-md">
                  <option value="" disabled>Select a location</option>
                  <option :value="1">Location 1</option>
                  <option :value="2">Location 2</option>
                  <option :value="3">Location 3</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
</template>

<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { CAMPAIGN_BUDGET_TYPE, CAMPAIGN_GOAL } from "@/constant/campaign";

const baseCardClass = "cursor-pointer border bg-white hover:border-primary";
const activeCardClass = "cursor-pointer border-2 border-primary bg-primary/10";
</script>
