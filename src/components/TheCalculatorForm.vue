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
const years = ref<string>('0')
const months = ref<string>('0')
const rateType = ref<string>('variable')
const rateTypes = ref<RadioItems[]>([
  { value: 'variable', label: 'Variabel rente', description: 'Du betaler en variabel rente, der kan ændre sig over tid' },
  { value: 'fixed', label: 'Fast rente', description: 'Du betaler den samme rente i hele låneperioden' },
])
const mortgageAmount = ref<number>(0)
const interestRate = ref<number>(0)
const futureInterestRate = ref<number>(0)
const adminFee = ref<number>(0)

const calculateMortgagePayment = (interestRate: number, adminFee: number, mortgageAmount: number) => {
  const interest = interestRate / 100
  const fee = adminFee / 100
  return (interest + fee) * mortgageAmount
}

const paymentYearly = computed<number>(() => calculateMortgagePayment(interestRate.value, adminFee.value, mortgageAmount.value))
const paymentMonthly = computed<number>(() => paymentYearly.value / 12)
const futurePaymentYearly = computed<number>(() => calculateMortgagePayment(futureInterestRate.value, adminFee.value, mortgageAmount.value))
const futurePaymentMonthly = computed<number>(() => futurePaymentYearly.value / 12)
const yearlyDifference = computed<number>(() => futurePaymentYearly.value - paymentYearly.value)
const monthlyDifference = computed<number>(() => futurePaymentMonthly.value - paymentMonthly.value)
</script>

<template>
  <div class="bg-gray-800 rounded-lg shadow-lg overflow-hidden" data-testid="calculator-form">
    <div class="p-6">
      <BaseToggle v-model="gracePeriod" label="Afdragsfri periode" description="Angiv, om din realkredit har en afdragsfri periode" />
      <CalculatorTermSelector v-model:years="years" v-model:months="months" />
      <BaseRadioGroup v-model="rateType" :items="rateTypes" />
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
      <BaseInput v-if="rateType === 'variable'" v-model="futureInterestRate" type="number" step="0.01" label="Fremtidig Rentesats" unit="%" />
      <CalculatorResultRow class="mt-8 pt-8 border-t border-gray-700" label="Årlig udgift" :result="paymentYearly" />
      <CalculatorResultRow class="mt-1" label="Månedlig udgift" :result="paymentMonthly" />
      <CalculatorResultRow v-if="rateType === 'variable'" class="mt-6" label="Fremtidig årlig udgift" :result="futurePaymentYearly" />
      <CalculatorResultRow v-if="rateType === 'variable'" class="mt-1" label="Fremtidig månedlig udgift" :result="futurePaymentMonthly" />
      <CalculatorResultRow v-if="rateType === 'variable'" class="mt-6" label="Årlig difference" :result="yearlyDifference" :colorize="true" />
      <CalculatorResultRow v-if="rateType === 'variable'" class="mt-1" label="Månedlig difference" :result="monthlyDifference" :colorize="true" />
    </div>
  </div>
</template>
