<template>
  <div>
    <!-- Goal Selection -->
    <FormField name="goal_id" v-slot="{ value, handleChange }">
      <FormItem>
        <div class="space-y-6 bg-white p-6 rounded-2xl border shadow-xl">
          <h2 class="text-[22px] font-primary font-semibold mb-4 text-gray-800">
            Choose your goal
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <!-- Accordion -->
    <Accordion type="multiple" class="space-y-4 mt-6" :force-mount="true">
      <AccordionItem value="campaign-name" :force-mount="true">
        <AccordionTrigger>Campaign name</AccordionTrigger>
        <AccordionContent>
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

      <AccordionItem value="budget-dates" :force-mount="true">
        <AccordionTrigger>Budget & Dates</AccordionTrigger>
        <AccordionContent>
          <FormField name="budget_type" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Budget Type</FormLabel>
              <FormControl>
                <select v-bind="componentField" class="w-full border px-3 py-2 rounded-md">
                  <option value="">Select type</option>
                  <option :value="CAMPAIGN_BUDGET_TYPE.total">Total</option>
                  <option :value="CAMPAIGN_BUDGET_TYPE.daily">Daily</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="budget" v-slot="{ componentField }">
            <FormItem>
              <FormLabel>Budget Amount</FormLabel>
              <FormControl>
                <Input type="number" v-bind="componentField" placeholder="Enter amount" />
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
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { CAMPAIGN_BUDGET_TYPE, CAMPAIGN_GOAL } from '@/constant/campaign';

const baseCardClass = 'cursor-pointer border bg-white hover:border-primary';
const activeCardClass = 'cursor-pointer border-2 border-primary bg-primary/10';
</script>
