<script setup lang="ts">
import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
} from '@internationalized/date'
import type { DateRange } from 'reka-ui'

import { CalendarIcon } from 'lucide-vue-next'
import { type Ref, ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'

const df = new DateFormatter('en-US', {
    dateStyle: 'medium',
})

const value = ref({
    start: new CalendarDate(2022, 1, 20),
    end: new CalendarDate(2022, 1, 20).add({ days: 20 }),
}) as Ref<DateRange>
</script>

<template>
    <div class=" my-5">
        <Popover>
            <PopoverTrigger as-child>
                <Button variant="outline" :class="cn(
                    'w-[280px] justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                )">
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    <template v-if="value.start">
                        <template v-if="value.end">
                            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{
                                df.format(value.end.toDate(getLocalTimeZone())) }}
                        </template>

                        <template v-else>
                            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
                        </template>
                    </template>
                    <template v-else>
                        Pick a date
                    </template>
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
                <RangeCalendar v-model="value" initial-focus :number-of-months="2"
                    @update:start-value="(startDate) => value.start = startDate" />
            </PopoverContent>
        </Popover>
    </div>
</template>