<template>
  <div class="w-full bg-white p-4 rounded-lg shadow-sm">
    <!-- Mobile Filter Toggle Button -->
    <div class="sm:hidden p-4 border-b bg-gray-50/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <h1 class="text-xl font-bold text-gray-900">Overview</h1>
          <Badge v-if="activeFilters.length > 0" variant="secondary" class="text-xs text-white rounded-[3px]">
            {{ activeFilters.length }} filter{{ activeFilters.length !== 1 ? 's' : '' }}
          </Badge>
        </div>
        <div class="flex items-center gap-2">
          <Button
            variant="outline"
            
            size="sm"
            @click="showMobileFilters = !showMobileFilters"
            class="text-gray-600 border-gray-200 rounded-[3px]"
          >
            <Filter class="w-4 h-4 mr-2" />
            Filters
            <ChevronDown :class="['w-4 h-4 ml-2 transition-transform', showMobileFilters && 'rotate-180']" />
          </Button>

        </div>
      </div>
    </div>

    <!-- Desktop Header -->
    <div class="hidden sm:block p-4 border-b bg-gray-50/50">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Overview</h1>
          <p class="text-sm text-gray-600 mt-1">Manage your campaigns and ads</p>
        </div>
        <Button class="btn">
          <Plus class="w-4 h-4 mr-2" />
          NEW CAMPAIGN
        </Button>
      </div>
    </div>

    <!-- Main Filter Section -->
    <div :class="['transition-all duration-300 ease-in-out', showMobileFilters || 'hidden sm:block']">
      <div class="p-3 sm:p-4 space-y-3 sm:space-y-4">
        <!-- Top Filter Row -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <!-- View Filter -->
          <div class="flex-1 min-w-0">
            <Select v-model="viewFilter">
              <SelectTrigger class="w-full h-9 sm:h-11 bg-white border-gray-200 hover:border-gray-300 focus:border-blue-500 transition-colors text-sm">
                <div class="flex items-center gap-2">
                  <Filter class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  <SelectValue placeholder="View (2 filter)" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-campaigns">All campaigns</SelectItem>
                <SelectItem value="active-campaigns">Active campaigns</SelectItem>
                <SelectItem value="paused-campaigns">Paused campaigns</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Campaigns Filter -->
          <div class="flex-1 min-w-0">
            <Select v-model="campaignFilter">
              <SelectTrigger class="w-full h-9 sm:h-11 bg-white border-gray-200 hover:border-gray-300 focus:border-blue-500 transition-colors text-sm">
                <div class="flex items-center gap-2">
                  <Target class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  <SelectValue placeholder="Select a campaign" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="campaign-1">Summer Sale Campaign</SelectItem>
                <SelectItem value="campaign-2">Holiday Promotion</SelectItem>
                <SelectItem value="campaign-3">Brand Awareness</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Date Range Filter -->
          <div class="flex-1 min-w-0">
            <Select v-model="dateRange">
              <SelectTrigger class="w-full h-9 sm:h-11 bg-white border-gray-200 hover:border-gray-300 focus:border-blue-500 transition-colors text-sm">
                <div class="flex items-center gap-2">
                  <Calendar class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                  <SelectValue placeholder="Last 30 days" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="last-90-days">Last 90 days</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Active Filters and Add Filter Row -->
        <div class="flex flex-col gap-2 sm:gap-3">
          <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <span class="font-medium">Filter</span>
          </div>
          
          <!-- Active Filter Tags -->
          <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <Badge 
              v-for="filter in activeFilters" 
              :key="filter.id"
              variant="secondary" 
              class="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium border border-gray-200"
            >
              {{ filter.label }}
              <button 
                @click="removeFilter(filter.id)"
                class="ml-1.5 sm:ml-2 hover:text-red-600 transition-colors"
              >
                <X class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </Badge>
            
            <!-- Add Filter Button -->
            <Popover v-model:open="showAddFilter">
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  class="text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-colors px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium h-7 sm:h-8"
                >
                  <Plus class="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  Add filter
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-72 sm:w-80 p-0" align="start">
                <div class="p-3 border-b">
                  <h4 class="font-medium text-gray-900">Add Filter</h4>
                </div>
                <div class="p-2">
                  <div class="space-y-1">
                    <button
                      v-for="option in filterOptions"
                      :key="option.value"
                      @click="openFilterInput(option)"
                      class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors"
                    >
                      {{ option.label }}
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <!-- Filter Dropdowns Row -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <!-- Campaign Status Filter -->
          <div class="flex-1">
            <Popover v-model:open="showCampaignStatus">
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  class="w-full justify-between h-9 sm:h-11 bg-white border-gray-200 hover:border-gray-300 transition-colors text-sm"
                  :class="{ 'border-blue-500 bg-blue-50': showCampaignStatus }"
                >
                  <div class="flex items-center gap-2">
                    <Activity class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span class="text-gray-700">Campaign Status</span>
                  </div>
                  <ChevronDown class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-52 sm:w-56 p-0" align="start">
                <div class="p-3 border-b bg-gray-50">
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium text-gray-900 text-sm">Campaign Status</h4>
                    <button @click="showCampaignStatus = false">
                      <X class="w-4 h-4 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                </div>
                <div class="p-2">
                  <div class="space-y-1">
                    <label v-for="option in campaignStatusOptions" :key="option.value" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        :value="option.value"
                        v-model="selectedCampaignStatus"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 sm:w-4 sm:h-4"
                      />
                      <span class="text-xs sm:text-sm text-gray-700">{{ option.label }}</span>
                    </label>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <!-- Ad Status Filter -->
          <div class="flex-1">
            <Popover v-model:open="showAdStatus">
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  class="w-full justify-between h-9 sm:h-11 bg-white border-gray-200 hover:border-gray-300 transition-colors text-sm"
                  :class="{ 'border-blue-500 bg-blue-50': showAdStatus }"
                >
                  <div class="flex items-center gap-2">
                    <Zap class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span class="text-gray-700">Ad Status</span>
                  </div>
                  <ChevronDown class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-52 sm:w-56 p-0" align="start">
                <div class="p-3 border-b bg-gray-50">
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium text-gray-900 text-sm">Ad Status</h4>
                    <button @click="showAdStatus = false">
                      <X class="w-4 h-4 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                </div>
                <div class="p-2">
                  <div class="space-y-1">
                    <label v-for="option in adStatusOptions" :key="option.value" class="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        :value="option.value"
                        v-model="selectedAdStatus"
                        class="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 sm:w-4 sm:h-4"
                      />
                      <span class="text-xs sm:text-sm text-gray-700">{{ option.label }}</span>
                    </label>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <!-- Campaign Details Filter -->
          <!-- <div class="flex-1">
            <Popover v-model:open="showCampaignDetails">
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  class="w-full justify-between h-9 sm:h-11 bg-white border-gray-200 hover:border-gray-300 transition-colors text-sm"
                  :class="{ 'border-blue-500 bg-blue-50': showCampaignDetails }"
                >
                  <div class="flex items-center gap-2">
                    <Settings class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    <span class="text-gray-700">Campaign</span>
                  </div>
                  <ChevronDown class="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                </Button>
              </PopoverTrigger>
              <PopoverContent class="w-72 sm:w-80 p-0" align="start">
                <div class="p-3 border-b bg-gray-50">
                  <div class="flex items-center justify-between">
                    <h4 class="font-medium text-gray-900 text-sm">Campaign</h4>
                    <button @click="showCampaignDetails = false">
                      <X class="w-4 h-4 text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>
                </div>
                <div class="p-2">
                  <div class="space-y-1">
                    <button
                      v-for="option in campaignDetailOptions"
                      :key="option.value"
                      @click="openFilterInput(option)"
                      class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded-md transition-colors text-gray-700"
                    >
                      {{ option.label }}
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div> -->
        </div>
      </div>
    </div>

    <!-- Add Filter Input Modal -->
    <Dialog v-model:open="showFilterInput">
      <DialogContent class="sm:max-w-md mx-4">
        <DialogHeader>
          <DialogTitle class="text-lg">{{ selectedFilterOption?.label }}</DialogTitle>
          <DialogDescription class="text-sm">
            Enter the {{ selectedFilterOption?.label.toLowerCase() }} you want to filter by
          </DialogDescription>
        </DialogHeader>
        
        <div class="space-y-4">
          <!-- Campaign Name Input -->
          <div v-if="selectedFilterOption?.value === 'campaign-name'">
            <Label for="campaign-name-input" class="text-sm">Campaign Name</Label>
            <Input
              id="campaign-name-input"
              v-model="filterInputValue"
              placeholder="Enter campaign name..."
              class="mt-1 h-9"
            />
            <p class="text-xs text-gray-500 mt-1">Search for campaigns by their exact name or partial match</p>
          </div>

          <!-- Campaign Type Selection -->
          <div v-if="selectedFilterOption?.value === 'campaign-type'">
            <Label for="campaign-type-select" class="text-sm">Campaign Type</Label>
            <Select v-model="filterInputValue">
              <SelectTrigger class="mt-1 h-9">
                <SelectValue placeholder="Select campaign type..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="display">Display Ads</SelectItem>
                <SelectItem value="search">Search Ads</SelectItem>
                <SelectItem value="video">Video Ads</SelectItem>
                <SelectItem value="shopping">Shopping Ads</SelectItem>
                <SelectItem value="app">App Promotion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Label Input with Suggestions -->
          <div v-if="selectedFilterOption?.value === 'label'">
            <Label for="label-input" class="text-sm">Label</Label>
            <div class="relative mt-1">
              <Input
                id="label-input"
                v-model="filterInputValue"
                placeholder="Enter or select label..."
                @input="filterLabels"
                class="h-9"
              />
              <div v-if="filteredLabels.length > 0 && filterInputValue" class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-32 overflow-y-auto">
                <button
                  v-for="label in filteredLabels"
                  :key="label"
                  @click="selectLabel(label)"
                  class="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                >
                  {{ label }}
                </button>
              </div>
            </div>
            <div class="flex flex-wrap gap-1 mt-2">
              <Badge
                v-for="label in availableLabels.slice(0, 4)"
                :key="label"
                variant="outline"
                class="cursor-pointer hover:bg-gray-100 text-xs px-2 py-0.5"
                @click="selectLabel(label)"
              >
                {{ label }}
              </Badge>
            </div>
          </div>
        </div>

        <DialogFooter class="gap-2">
          <Button variant="outline" @click="cancelFilterInput" class="text-sm h-9">Cancel</Button>
          <Button @click="applyFilterInput" :disabled="!filterInputValue" class="text-sm h-9">
            Apply Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Badge } from '@/components/ui/badge'
import { 
  Filter, Target, Calendar, Plus, X, ChevronDown, 
  Activity, Zap, Settings 
} from 'lucide-vue-next'

// Add these imports
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

// Reactive state
const viewFilter = ref('all-campaigns')
const campaignFilter = ref('')
const dateRange = ref('last-30-days')

const showAddFilter = ref(false)
const showCampaignStatus = ref(false)
const showAdStatus = ref(false)
const showCampaignDetails = ref(false)

const selectedCampaignStatus = ref(['enable', 'paused'])
const selectedAdStatus = ref(['enable', 'paused'])

// Add these reactive variables
const showFilterInput = ref(false)
const selectedFilterOption = ref(null)
const filterInputValue = ref('')
const filteredLabels = ref([])

// Add this after the existing reactive variables
const dynamicFilters = ref([])

// Add this line after the existing reactive variables
const showMobileFilters = ref(false)

// Filter options
const filterOptions = [
  { label: 'Campaign Name', value: 'campaign-name' },
  { label: 'Campaign Type', value: 'campaign-type' },
  { label: 'Label', value: 'label' }
]

const campaignStatusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Enable', value: 'enable' },
  { label: 'Enable, Paused', value: 'enable-paused' }
]

const adStatusOptions = [
  { label: 'All', value: 'all' },
  { label: 'Enable', value: 'enable' },
  { label: 'Enable, Paused', value: 'enable-paused' }
]

const campaignDetailOptions = [
  { label: 'Campaign Name', value: 'campaign-name' },
  { label: 'Campaign Type', value: 'campaign-type' },
  { label: 'Label', value: 'label' }
]

// Available labels for suggestions
const availableLabels = [
  'High Priority', 'Low Budget', 'Seasonal', 'Brand Awareness', 
  'Conversion Focus', 'Mobile Optimized', 'Desktop Only', 'International',
  'Local Market', 'A/B Testing', 'Retargeting', 'New Customer'
]

// Replace the existing activeFilters computed with this:
const activeFilters = computed(() => {
  const filters = []
  
  if (selectedCampaignStatus.value.length > 0) {
    filters.push({
      id: 'campaign-status',
      label: `Campaign status: ${selectedCampaignStatus.value.join(', ')}`,
      type: 'campaign-status'
    })
  }
  
  if (selectedAdStatus.value.length > 0) {
    filters.push({
      id: 'ad-status',
      label: `Ad status: ${selectedAdStatus.value.join(', ')}`,
      type: 'ad-status'
    })
  }
  
  // Add dynamic filters
  filters.push(...dynamicFilters.value)
  
  return filters
})

// Methods
const removeFilter = (filterId) => {
  if (filterId === 'campaign-status') {
    selectedCampaignStatus.value = []
  } else if (filterId === 'ad-status') {
    selectedAdStatus.value = []
  } else {
    // Remove from dynamic filters
    const index = dynamicFilters.value.findIndex(filter => filter.id === filterId)
    if (index > -1) {
      dynamicFilters.value.splice(index, 1)
    }
  }
}

// Methods to add
const openFilterInput = (option) => {
  selectedFilterOption.value = option
  filterInputValue.value = ''
  showFilterInput.value = true
  showAddFilter.value = false
  showCampaignDetails.value = false
}

const cancelFilterInput = () => {
  showFilterInput.value = false
  selectedFilterOption.value = null
  filterInputValue.value = ''
}

const applyFilterInput = () => {
  if (filterInputValue.value.trim()) {
    // Add the new filter to dynamic filters
    const newFilter = {
      id: `${selectedFilterOption.value.value}-${Date.now()}`,
      label: `${selectedFilterOption.value.label}: ${filterInputValue.value}`,
      type: selectedFilterOption.value.value,
      value: filterInputValue.value
    }
    
    // Add to dynamic filters array
    dynamicFilters.value.push(newFilter)
    
    // Close the dialog
    showFilterInput.value = false
    selectedFilterOption.value = null
    filterInputValue.value = ''
  }
}

const filterLabels = () => {
  if (filterInputValue.value) {
    filteredLabels.value = availableLabels.filter(label =>
      label.toLowerCase().includes(filterInputValue.value.toLowerCase())
    )
  } else {
    filteredLabels.value = []
  }
}

const selectLabel = (label) => {
  filterInputValue.value = label
  filteredLabels.value = []
}
</script>

<style scoped>
/* Custom focus styles */
.focus\:ring-blue-500:focus {
  --tw-ring-color: rgb(59 130 246 / 0.5);
}

/* Smooth transitions */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom checkbox styles */
input[type="checkbox"] {
  width: 1rem;
  height: 1rem;
}

/* Hover effects */
.hover\:bg-gray-100:hover {
  background-color: rgb(243 244 246);
}

.hover\:bg-red-50:hover {
  background-color: rgb(254 242 242);
}
</style>
