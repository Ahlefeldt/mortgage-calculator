<script setup lang="ts">
import { computed } from 'vue'
import { localCurrencyFormat } from '@/utils/format.utils'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  colorize: {
    type: Boolean,
    default: false,
  },
})

const resultIsNegative = computed(() => props.result < 0)
const resultIsZero = computed(() => props.result === 0)
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between">
    <p class="text-gray-300 font-semibold text-sm mb-1 sm:mb-0">{{ label }}:</p>
    <p :class="{ 'text-gray-400': !colorize || resultIsZero, 'text-red-400': colorize && !resultIsNegative && !resultIsZero, 'text-green-400': colorize && resultIsNegative }">
      {{ localCurrencyFormat(result) }} kr
    </p>
  </div>
</template>
