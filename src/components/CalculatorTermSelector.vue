<script lang="ts" setup>
import { ref, watch } from 'vue'
import BaseSelect from './BaseSelect.vue'

const props = defineProps<{
  years: number
  months: number
}>()

const localYears = ref(props.years)
const localMonths = ref(props.months)

const emit = defineEmits(['update:years', 'update:months'])

watch(localYears, newYears => emit('update:years', newYears))
watch(localMonths, newMonths => emit('update:months', newMonths))

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
    <p class="mt-1 text-sm text-gray-400">Vælg restløbetiden for at vi kan udregne dit afdrag</p>
    <div class="flex items-center space-x-4 mt-4">
      <BaseSelect :options="yearsOptions" v-model="localYears" label="År" />
      <BaseSelect :options="monthsOptions" v-model="localMonths" label="Måneder" />
    </div>
  </div>
</template>
