<script setup>
import { Button } from "@/components/ui/button";
import { useBillingStore } from "@/store/client/client-billing-store";
import { CreditCard, Loader, Pencil } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";

const hasPaymentMethod = false;
const billingStore = useBillingStore();

const isNewPaymentInfo = ref(false);
const isLoading = ref(false);
onMounted(async () => {
  isLoading.value = true;
  let res = await billingStore.getClientPaymentInfo();
  if (
    res.data.billing_profiles.id ||
    res.data.payment_settings.id ||
    res.data.payment_profiles.id
  ) {
    isNewPaymentInfo.value = true;
    isLoading.value = false;
  } else {
    isNewPaymentInfo.value = false;
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm">
    <div class="p-6">
      <h2 class="text-lg font-medium text-orange-highlight mb-6">
        Billing Details
      </h2>
       <div v-if="isLoading" class=" flex justify-center items-center py-10">
        <Loader  />
       </div>
      <div v-if="!isLoading" class="border-2 border-orange-highlight/40 rounded-lg p-6 space-y-6">
        <!-- Country and Currency -->
        <div v-if="isNewPaymentInfo">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">
                Billing Country
              </h3>
              <p class="text-sm text-gray-600">Bangladesh</p>
              <p class="text-xs text-gray-500">(GMT+06:00) BST</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-2">Currency</h3>
              <p class="text-sm text-gray-600">BDT (Bangladeshi Taka)</p>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-4">
              Payment Profile
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span class="text-sm text-gray-600">Payment Profile</span>
                <p class="text-sm font-medium text-gray-900">dark Moon Corp.</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Billing Name</span>
                <p class="text-sm font-medium text-gray-900">Jake Sim</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Phone Number</span>
                <p class="text-sm font-medium text-gray-900">+01 345 67890</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Billing Email</span>
                <p class="text-sm font-medium text-gray-900">
                  sim_jake@gmail.com
                </p>
                <p class="text-sm font-medium text-gray-900">
                  fake_sim@gmail.com
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-medium text-gray-700 mb-4">
              Payment Method
            </h3>

            <div v-if="hasPaymentMethod" class="space-y-3">
              <div>
                <span class="text-sm text-gray-600">Credit Card</span>
                <p class="text-sm font-medium text-gray-900">Visa</p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Card Number</span>
                <p class="text-sm font-medium text-gray-900">
                  **** **** 0101 4548
                </p>
              </div>
              <div>
                <span class="text-sm text-gray-600">Name</span>
                <p class="text-sm font-medium text-gray-900">Jake Sim</p>
              </div>
            </div>
          </div>
          <div class="pt-4 text-end">
            <RouterLink to="/client/billing?mode=Update">
              <Button
                @click="editBillingDetails"
                class="flex items-center gap-2 btn"
              >
                <Pencil /> Edit Details
              </Button>
            </RouterLink>
          </div>
        </div>

        <div
          v-if="!isNewPaymentInfo"
          class="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-md py-6 text-center bg-slate-50"
        >
          <CreditCard class="h-10 w-10 text-gray-400 mb-2" />
          <p class="text-sm text-gray-600">No payment info added yet.</p>
          <RouterLink to="/client/billing?mode=create">
            <Button
              class="mt-3 btn"
              variant="outline"
              @click="editBillingDetails"
            >
              Add Payment Info
            </Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
