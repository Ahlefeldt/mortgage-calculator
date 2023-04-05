<script setup lang="ts">
import { localCurrencyFormat } from '@/utils/format.utils'

defineProps({
  label: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between">
    <p class="text-gray-300 font-semibold text-sm mb-1 sm:mb-0">{{ label }}:</p>
    <p class="text-gray-400">{{ localCurrencyFormat(result) }} kr</p>
  </div>
</template>
