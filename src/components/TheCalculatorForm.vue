<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseInput from '@/components/BaseInput.vue'

const mortgageAmount = ref<number>(0)
const interestRate = ref<number>(0)
const adminFee = ref<number>(0)

const totalPaymentYearly = computed<number>(() => {
  const interest = interestRate.value / 100
  const fee = adminFee.value / 100
  const total = (interest + fee) * mortgageAmount.value
  return parseFloat(total.toFixed(2))
})

const totalPaymentMonthly = computed<number>(() => {
  const total = totalPaymentYearly.value / 12
  return parseFloat(total.toFixed(2))
})
</script>

<template>
  <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
    <div class="p-6">
      <BaseInput v-model="mortgageAmount" type="number" step="1" label="Restgæld" unit="kr" />
      <BaseInput
        v-model="adminFee"
        info="Bidragssats er den pris, du betaler til realkreditinstituttet for at administrere og tage risikoen for et realkreditlån."
        type="number"
        step="0.01"
        label="Bidragssats"
        unit="%"
      />
      <BaseInput v-model="interestRate" type="number" step="0.01" label="Rentesats" unit="%" />
      <div class="mt-6 border-t border-gray-700 pt-6 flex items-center justify-between">
        <p class="text-gray-300 font-semibold text-xl">Årlig udgift:</p>
        <p class="text-gray-400 text-2xl">{{ totalPaymentYearly.toLocaleString('da-DK') }} kr</p>
      </div>
      <div class="pt-1 flex items-center justify-between">
        <p class="text-gray-300 font-semibold text-xl">Månedlig udgift:</p>
        <p class="text-gray-400 text-2xl">{{ totalPaymentMonthly.toLocaleString('da-DK') }} kr</p>
      </div>
    </div>
  </div>
</template>
