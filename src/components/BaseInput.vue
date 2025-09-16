<script setup lang="ts">
import { computed } from 'vue'
import BaseInfoTooltip from '@/components/BaseInfoTooltip.vue'

const {
  type = 'text',
  name = Math.random().toString(36).substring(2, 8),
  step = '1',
  label,
  placeholder = '',
  unit = '',
  info = '',
  optional = false,
  formatThousands = false,
} = defineProps<{
  type?: string
  name?: string
  step?: string
  label: string
  placeholder?: string
  unit?: string
  info?: string
  optional?: boolean
  formatThousands?: boolean
}>()

const modelValue = defineModel<string | number | null>({ default: null })

const formatThousandsValue = (value: string) => {
  const digitsOnly = value.replace(/\D/g, '')
  const formatted = digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return { digitsOnly, formatted }
}

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (formatThousands) {
    const { digitsOnly, formatted } = formatThousandsValue(target.value)
    if (!digitsOnly) {
      modelValue.value = ''
      target.value = ''
      return
    }
    modelValue.value = Number(digitsOnly)
    target.value = formatted
    return
  }

  if (type === 'number') {
    modelValue.value = target.value === '' ? '' : Number(target.value)
    return
  }

  modelValue.value = target.value
}

const inputLabel = computed(() => {
  if (optional) return `${label} (valgfri)`
  return label
})

const displayValue = computed(() => {
  if (modelValue.value === null || modelValue.value === undefined) return ''
  if (!formatThousands) return String(modelValue.value)
  const { formatted } = formatThousandsValue(String(modelValue.value))
  return formatted
})

const inputType = computed(() => (formatThousands ? 'text' : type))
</script>

<template>
  <div>
    <div class="flex items-center mb-1">
      <label :for="name" class="text-gray-400 text-sm font-medium leading-6">{{ inputLabel }}</label>
      <BaseInfoTooltip v-if="info" class="ml-1" :info />
    </div>
    <div class="relative">
      <input
        :type="inputType"
        :name
        :step
        :id="name"
        class="bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent border-gray-600 rounded-lg py-2 px-4 pr-10 block w-full text-gray-100 leading-tight"
        :placeholder
        :value="displayValue"
        :inputmode="formatThousands ? 'numeric' : undefined"
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
