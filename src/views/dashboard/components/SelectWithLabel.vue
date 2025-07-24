<script setup>
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const props = defineProps({
    options: {
        type: Array,
        default: () => []
    },
    modelValue: {
        type: [String, Number, Object],
        default: null
    },

    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Select an option...'
    },
    emptyMessage: {
        type: String,
        default: 'No options available'
    },

    valueKey: {
        type: String,
        default: 'value'
    },
    labelKey: {
        type: String,
        default: 'label'
    },
    disabled: {
        type: Boolean,
        default: false
    },

    containerClass: {
        type: String,
        default: ''
    },
    labelClass: {
        type: String,
        default: ''
    },
    triggerClass: {
        type: String,
        default: ''
    },
    dropdownClass: {
        type: String,
        default: ''
    },
    optionClass: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:modelValue', 'change', 'open', 'close'])

</script>

<template>
    <div class=" max-w-[250px] w-full bg-white px-4 pt-4 pb-1">
        <Label>{{ props.label }}</Label>
        <Select v-bind="componentField">
            <SelectTrigger class=" truncate max-w-[250px] focus-visible:ring-0 w-full border-none shadow-none p-0 mt-2 font-primary text-black">
                <SelectValue class=" placeholder:text-black font-primary" :placeholder="props.placeholder" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="m@example.com">
                        m@example.com
                    </SelectItem>
                    <SelectItem value="m@google.com">
                        m@google.com
                    </SelectItem>
                    <SelectItem value="m@support.com">
                        m@support.com
                    </SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
</template>



