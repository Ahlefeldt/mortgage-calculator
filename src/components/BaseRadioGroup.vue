<script setup lang="ts">
import { ref, watch } from 'vue'
// eslint-disable-next-line no-duplicate-imports
import type { PropType } from 'vue'
import type { RadioItems } from '@/interface/radio.interface'

const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  items: {
    type: Array as PropType<Array<RadioItems>>,
    required: true,
  },
  modelValue: {
    type: [String, Number],
  },
})

const selectedValue = ref(props.modelValue)

watch(selectedValue, newValue => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <ul>
    <li v-for="(item, index) in items" :key="index" class="py-2 first:pt-0 last:pb-0 flex justify-between items-start">
      <div @click="selectedValue = item.value" class="group cursor-pointer block w-full">
        <div class="flex relative justify-between items-center">
          <div class="mr-6">
            <label :for="`${item.value}-${index}`" class="text-gray-200 text-sm leading-6">{{ item.label }}</label>
            <p class="text-gray-400 text-sm">{{ item.description }}</p>
          </div>
          <div>
            <input type="radio" :id="`${item.value}-${index}`" :value="item.value" v-model="selectedValue" class="sr-only" />
            <span class="w-4 h-4 bg-white border-2 border-white rounded-full absolute top-1/2 right-0 -translate-y-1/2"></span>
            <span v-if="selectedValue === item.value" class="w-2 h-2 bg-indigo-500 rounded-full absolute right-1 top-1/2 -translate-y-1/2"></span>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.group:hover .text-gray-200 {
  @apply text-gray-100;
}

.group:hover .border-white {
  @apply border-indigo-700;
}
</style>
