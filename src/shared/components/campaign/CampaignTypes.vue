
<script setup lang="ts">
import { Card, CardContent } from '../../../components/ui/card'
import { CAMPAIGN_GOAL } from '../../../constant/campaign';
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'update:goal', value: number): void
}>()

const selectedGoal = ref(CAMPAIGN_GOAL.default)


const baseCardClass = 'cursor-pointer border-2 border-border rounded-xl transition hover:border-yellow-500'
const activeCardClass = 'cursor-pointer border-2 border-yellow-500 rounded-xl shadow'

const selectGoal = (goal: number) => {
  selectedGoal.value = goal
  emit('update:goal', goal)
}

</script>


<template>
  <div class="grid grid-cols-3 gap-6 my-5">
    <div class="col-span-3 bg-white p-6 rounded-xl">
      <h2 class="text-[22px] tracking-normal font-primary font-semibold mb-4 text-gray-800">Choose your goal</h2>
      <div class="grid grid-cols-3 gap-4">
        <Card
          
          :class="selectedGoal === CAMPAIGN_GOAL.awarness ? activeCardClass : baseCardClass"
          @click="selectGoal(CAMPAIGN_GOAL.awarness)"
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
            <p class="text-sm text-gray-500">Promote products the store is already carrying to boost sales.</p>
          </CardContent>
          <div class="absolute top-0 right-0 bg-orange-600 text-white text-xs px-2 py-1 rounded-bl-lg">
            Coming soon
          </div>
        </Card>
      </div>
    </div>

    <!-- <div class="bg-white p-6 rounded-xl shadow-sm">
      <h2 class="text-lg font-semibold mb-4">Video campaign details</h2>
      <Card
        class="cursor-pointer border-2"
        :class="selectedVideo === 'video-ads' ? 'border-yellow-500' : 'border-border'"
        @click="selectVideo('video-ads')"
      >
        <CardContent class="flex flex-col items-start space-y-2 p-4">
          <div class="text-yellow-500 text-2xl">▶️</div>
          <h3 class="font-medium">Video Ads</h3>
          <p class="text-sm text-muted-foreground">Reach viewers on YouTube and get conversions</p>
        </CardContent>
      </Card>
    </div> -->
  </div>
</template>


