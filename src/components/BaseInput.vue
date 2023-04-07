<script setup lang="ts">
import { computed } from 'vue'
import BaseInfoTooltip from '@/components/BaseInfoTooltip.vue'

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  name: {
    type: String,
    default: () => Math.random().toString(36).substring(2, 8),
  },
  step: {
    type: String,
    default: '1',
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  unit: {
    type: String,
    default: '',
  },
  modelValue: {
    type: [String, Number],
    default: null,
  },
  info: {
    type: String,
    default: '',
  },
  optional: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const inputLabel = computed(() => {
  if (props.optional) return `${props.label} (valgfri)`
  return props.label
})
</script>

<template>
  <div>
    <div class="flex items-center mb-1">
      <label :for="name" class="text-gray-400 text-sm font-medium leading-6">{{ inputLabel }}</label>
      <BaseInfoTooltip v-if="info" class="ml-1" :info="info" />
    </div>
    <div class="relative">
      <input
        :type="type"
        :name="name"
        :step="step"
        :id="name"
        class="bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent border-gray-600 rounded-lg py-2 px-4 pr-10 block w-full text-gray-100 leading-tight"
        :placeholder="placeholder"
        :value="modelValue"
        @input="onInput($event)"
      />
      <span v-if="unit" class="absolute text-sm inset-y-0 right-0 flex items-center px-4 text-gray-400">
        {{ unit }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Remove browser specific styling for inputs */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
