<template>
  <div class="space-y-4">
    <FormField name="paymentMethod" v-slot="{ componentField }">
      <FormItem>
        <FormLabel>Payment Method</FormLabel>
        <FormControl>
          <Select v-bind="componentField" @update:modelValue="(val) => emitUpdate('paymentMethod', val)">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="credit_card">Credit Card</SelectItem>
              <SelectItem value="paypal">PayPal</SelectItem>
              <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
</template>

<script setup lang="ts">
defineProps<{ values: any }>();
const emit = defineEmits(["updateFormData"]);

function emitUpdate(field: string, value: any) {
  emit("updateFormData", field, value);
}
</script>
