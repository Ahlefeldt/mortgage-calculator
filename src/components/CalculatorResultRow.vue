<script setup lang="ts">
import { computed } from 'vue'
import { localCurrencyFormat } from '@/utils/format.utils'

const {
  label,
  result,
  colorize = false,
} = defineProps<{
  label: string
  result: number
  colorize?: boolean
}>()

const resultIsNegative = computed(() => result < 0)
const resultIsZero = computed(() => result === 0)
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between">
    <p class="text-gray-400 font-medium text-sm mb-1 sm:mb-0">{{ label }}</p>
    <p :class="{ 'text-gray-200': !colorize || resultIsZero, 'text-red-400': colorize && !resultIsNegative && !resultIsZero, 'text-green-400': colorize && resultIsNegative }">
      {{ localCurrencyFormat(result) }} kr
    </p>
  </div>
</template>
