<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  label: string
  description: string
}>()

const emit = defineEmits(['update:modelValue'])

const modelValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const toggle = () => (modelValue.value = !modelValue.value)
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="mr-6">
      <label :for="`mortgage-grace-period`" class="text-gray-300 text-sm leading-6"> {{ label }} </label>
      <p class="text-gray-400 text-sm">{{ description }}</p>
    </div>
    <div>
      <button
        @click="toggle"
        :class="[modelValue ? 'bg-indigo-500' : 'bg-gray-300 dark:bg-gray-600', 'relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none focus:ring-2 focus:ring-indigo-700']"
      >
        <span :class="[modelValue ? 'translate-x-6' : 'translate-x-1', 'inline-block w-4 h-4 transform bg-white rounded-full transition ease-in-out duration-200']"></span>
      </button>
    </div>
  </div>
</template>
