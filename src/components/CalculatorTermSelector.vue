<script lang="ts" setup>
import BaseSelect from './BaseSelect.vue'

const years = defineModel<number>('years', { required: true })
const months = defineModel<number>('months', { required: true })

const yearsOptions = Array.from({ length: 31 }, (_, i) => ({
  value: i,
  label: String(i),
}))

const monthsOptions = Array.from({ length: 12 }, (_, i) => ({
  value: i,
  label: String(i),
}))
</script>

<template>
  <div class="mb-8">
    <h3 class="text-gray-200">Løbetid</h3>
    <p class="mt-1 text-sm text-gray-400">Vælg lånets restløbetid for at inkludere dit afdrag i udgiften</p>
    <div class="flex items-center space-x-4 mt-4">
      <BaseSelect :options="yearsOptions" v-model="years" label="År" />
      <BaseSelect :options="monthsOptions" v-model="months" label="Måneder" />
    </div>
  </div>
</template>
