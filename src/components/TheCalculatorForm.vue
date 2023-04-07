<script setup lang="ts">
import { computed, ref } from 'vue'
import type { RadioItems } from '@/interface/radio.interface'

// Components
import BaseInput from '@/components/BaseInput.vue'
import BaseRadioGroup from '@/components/BaseRadioGroup.vue'
import BaseToggle from '@/components/BaseToggle.vue'
import CalculatorResultRow from '@/components/CalculatorResultRow.vue'
import CalculatorTermSelector from '@/components/CalculatorTermSelector.vue'

const gracePeriod = ref(true)
const yearsRemaining = ref<number>(30)
const monthsRemaining = ref<number>(0)
const rateType = ref<string>('fixed')
const rateTypes = ref<RadioItems[]>([
  { value: 'variable', label: 'Variabel rente', description: 'Du betaler en variabel rente, der kan ændre sig over tid' },
  { value: 'fixed', label: 'Fast rente', description: 'Du betaler den samme rente i hele låneperioden' },
])
const mortgageAmount = ref<number>(0)
const interestRate = ref<number>(0)
const futureInterestRate = ref<number | string>('')
const adminFee = ref<number>(0)

const calculateMortgagePayment = (interestRate: number) => {
  const interest = interestRate / 100
  const fee = adminFee.value / 100
  const mortgagePaymentWithoutInstalments = ((interest + fee) * mortgageAmount.value) / 12
  if (gracePeriod.value) return mortgagePaymentWithoutInstalments

  const totalMonthsRemaining = monthsRemaining.value + yearsRemaining.value * 12
  const instalmentCost = mortgageAmount.value / totalMonthsRemaining
  const mortgagePaymentWithInstalments = mortgagePaymentWithoutInstalments + instalmentCost
  return mortgagePaymentWithInstalments
}

const paymentMonthly = computed<number>(() => calculateMortgagePayment(interestRate.value))
const futurePaymentMonthly = computed<number>(() => {
  if (futureInterestRate.value === '') return 0
  return calculateMortgagePayment(Number(futureInterestRate.value))
})
const monthlyDifference = computed<number>(() => futurePaymentMonthly.value - paymentMonthly.value)
</script>

<template>
  <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden p-6" data-testid="calculator-form">
    <BaseToggle v-model="gracePeriod" label="Afdragsfrihed" description="Angiv, om din realkredit er i en afdragsfri periode" />
    <CalculatorTermSelector v-if="!gracePeriod" class="mt-6 pt-6 border-t border-gray-700" v-model:years="yearsRemaining" v-model:months="monthsRemaining" />
    <BaseRadioGroup class="mt-6 pt-6 border-t border-gray-700" v-model="rateType" :items="rateTypes" />
    <BaseInput class="mt-6 pt-6 border-t border-gray-700" v-model="mortgageAmount" type="number" step="1" label="Restgæld" unit="kr" />
    <BaseInput
      v-model="adminFee"
      info="Bidragssats er den pris, du betaler til realkreditinstituttet for at administrere og tage risikoen for et realkreditlån."
      type="number"
      step="0.01"
      label="Bidragssats"
      unit="%"
    />
    <BaseInput v-model="interestRate" type="number" step="0.01" label="Rentesats" unit="%" />
    <BaseInput v-if="rateType === 'variable'" v-model="futureInterestRate" type="number" step="0.01" label="Fremtidig Rentesats" unit="%" optional />
    <CalculatorResultRow class="mt-6 pt-6 border-t border-gray-700" label="Månedlig udgift" :result="paymentMonthly" />
    <CalculatorResultRow v-if="rateType === 'variable' && futureInterestRate" class="mt-1" label="Fremtidig månedlig udgift" :result="futurePaymentMonthly" />
    <CalculatorResultRow v-if="rateType === 'variable' && futureInterestRate" class="mt-1" label="Månedlig difference" :result="monthlyDifference" :colorize="true" />
  </div>
</template>
