<template>
  <div class="bg-white rounded-lg p-6 shadow-sm space-y-6">
    <h3 class="text-lg font-semibold">Billing Details</h3>

    <!-- Billing Country -->
    <FormField name="billing_country" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Billing Country</FormLabel>
        <FormControl>
          <select
            v-bind="componentField"
            @change="e => componentField.onChange(Number(e.target.value))"
            class="w-full px-3 py-3 border border-gray-300 rounded-md"
          >
            <option disabled value="">Select Country</option>
            <option :value="1">Bangladesh</option>
          </select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Timezone -->
    <FormField name="time_zone" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Timezone</FormLabel>
        <FormControl>
          <select
            v-bind="componentField"
            class="w-full px-3 py-3 border border-gray-300 rounded-md"
          >
            <option disabled value="">Select Timezone</option>
            <option value="Asia/Dhaka">Asia/Dhaka</option>
          </select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <!-- Currency -->
    <FormField name="currency" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Currency</FormLabel>
        <FormControl>
          <select
            v-bind="componentField"
            @change="e => componentField.onChange(Number(e.target.value))"
            class="w-full px-3 py-3 border border-gray-300 rounded-md"
          >
            <option disabled value="">Select Currency</option>
            <option :value="1">BDT (Bangladeshi Taka)</option>
          </select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>

<script setup lang="ts">
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
</script>
