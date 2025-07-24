
<script setup>
import PageLayout from '@/layouts/components/PageLayout.vue'
import BillingDetails from './billing.details/BillingDetails.vue'
import BillingPayCard from './billing.details/BillingPayCard.vue'
import BillingPayment from './billing.details/BillingPayment.vue'

</script>


<template>
    <PageLayout>
        <div class="max-w-3xl  min-h-screen">
            <div class="space-y-6">
                <BillingPayCard />
                <BillingPayment />
                <BillingDetails />
            </div>
        </div>
    </PageLayout>
</template>
