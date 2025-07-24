<template>
  <div>
    <h3 class="text-lg font-semibold">Business Info</h3>
    <FormField name="businessName" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Business Name</FormLabel>
        <FormControl>
          <Input
            v-bind="componentField"
            placeholder="Enter your business name"
            @input="emitUpdate('businessName', $event.target.value)"
          />
        </FormControl>
        <FormMessage v-if="errors.businessName">{{ errors.businessName }}</FormMessage>
      </FormItem>
    </FormField>

    <div class="mt-4 flex justify-end">
      <Button @click="goNext" :disabled="loading">
        {{ loading ? "Saving..." : "Next" }}
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const props = defineProps<{ values: any; loading?: boolean }>();
const emit = defineEmits(["updateFormData", "next"]);

const errors = ref<Record<string, string>>({});

function emitUpdate(field: string, value: any) {
  emit("updateFormData", field, value);
}

function validate() {
  errors.value = {};
  if (!props.values.businessName) {
    errors.value.businessName = "Business name is required";
  }
  return Object.keys(errors.value).length === 0;
}

function goNext() {
  if (!validate()) return;
  emit("next");
}
</script>
