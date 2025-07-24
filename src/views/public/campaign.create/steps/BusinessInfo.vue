<template>
  <div class=" my-5">
    <h1 class="text-[22px] font-primary font-semibold">
      Tell us about your business
    </h1>
    <p class="text-[16px]">
      You`ll get suggestion based on the information you provide
    </p>
  </div>
  <div class="bg-white rounded-md p-8">
    <FormField name="businessName" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Business Name</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="Enter your business name"
            class="form-input"
          />
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
import { Input } from "@/components/ui/input";
</script>
