<script setup lang="ts">
import { ChevronDownIcon, CheckIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  options: { value: number; label: string }[]
  label: string
  modelValue: string | number
}>()

const selectedValue = ref<string | number>(props.modelValue)
const isOpen = ref(false)

const emit = defineEmits(['update:modelValue'])

const onSelect = (value: string | number) => {
  selectedValue.value = value
  emit('update:modelValue', selectedValue.value)
  isOpen.value = false
}

const selectRef = ref(null)
onClickOutside(selectRef, () => (isOpen.value = false))
</script>

<template>
  <div class="flex flex-col w-full">
    <label id="listbox-label" class="text-gray-400 text-sm font-medium leading-6 mb-1">{{ label }}</label>
    <div class="relative" ref="selectRef">
      <button
        type="button"
        class="relative w-full cursor-default rounded-md bg-gray-700 py-2 pl-3 pr-10 text-left text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
        @click="isOpen = !isOpen"
      >
        <span class="block truncate">{{ options.find(option => option.value === selectedValue)?.label }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronDownIcon class="h-5 w-5 text-gray-300" />
        </span>
      </button>
      <div v-if="isOpen" class="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-700 z-10">
        <ul class="py-1 leading-6 text-white text-sm max-h-[200px] overflow-auto">
          <li v-for="option in options" :key="option.value" class="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-indigo-500 hover:text-white" @click="onSelect(option.value)">
            <span class="font-normal block truncate">{{ option.label }}</span>
            <span v-if="selectedValue === option.value" class="text-indigo-300 absolute inset-y-0 right-0 flex items-center pr-4">
              <CheckIcon class="h-5 w-5" />
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
