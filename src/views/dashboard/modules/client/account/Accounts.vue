<script setup>
import PageLayout from '@/layouts/components/PageLayout.vue'
import SectionTitle from '@/views/dashboard/components/SectionTitle.vue'
import { reactive, ref } from 'vue'

const showCancelModal = ref(false)

const accountData = reactive({
    name: 'Jake Sim',
    status: 'Your account was active.',
    timezone: '(GMT+06:00) BST',
    joinDate: new Date('2025-04-25T12:30:00')
})

const formatJoinDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).format(date)
}

const showCancelConfirmation = () => {
    showCancelModal.value = true
}

const closeCancelModal = () => {
    showCancelModal.value = false
}

const cancelAccount = () => {
    alert('Account cancellation request has been submitted. You will receive a confirmation email shortly.')
    showCancelModal.value = false
    accountData.status = 'Your account cancellation is being processed.'
}

const handleKeydown = (event) => {
    if (event.key === 'Escape' && showCancelModal.value) {
        closeCancelModal()
    }
}

if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
}
</script>

<template>
    <PageLayout>
        <SectionTitle>Accounts</SectionTitle>
        <div class="max-w-2xl min-h-screen mt-5">
            <div class="bg-white rounded-lg shadow-sm">
                <div class="divide-y divide-gray-200">
                    <div class="p-6">
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Account Name</h3>
                        <p class="text-sm text-gray-600">{{ accountData.name }}</p>
                    </div>

                    <div class="p-6">
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Account Status</h3>
                        <p class="text-sm text-gray-600 mb-3">{{ accountData.status }}</p>
                        <div class="text-xs text-gray-500 space-y-1">
                            <p>To stop running ads, try pausing your campaigns.</p>
                            <p>If you cancel your account, your ads will stop running and you'll receive a final bill
                                within 60 days</p>
                        </div>
                    </div>

                    <div class="p-6">
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Time Zone</h3>
                        <p class="text-sm text-gray-600">{{ accountData.timezone }}</p>
                    </div>

                    <div class="p-6">
                        <h3 class="text-sm font-medium text-gray-900 mb-2">Join Date</h3>
                        <p class="text-sm text-gray-600">{{ formatJoinDate(accountData.joinDate) }}</p>
                    </div>

                    <div class="p-6">
                        <button @click="showCancelConfirmation"
                            class="text-red-600 hover:text-red-700 text-sm font-medium focus:outline-none focus:underline transition-colors">
                            Cancel My Account
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="showCancelModal"
                class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                @click="closeCancelModal">
                <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4" @click.stop>
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Cancel Account</h3>
                    <p class="text-sm text-gray-600 mb-6">
                        Are you sure you want to cancel your account? This action cannot be undone.
                        Your ads will stop running and you'll receive a final bill within 60 days.
                    </p>
                    <div class="flex justify-end space-x-3">
                        <button @click="closeCancelModal"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Keep Account
                        </button>
                        <button @click="cancelAccount"
                            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">
                            Cancel Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>
