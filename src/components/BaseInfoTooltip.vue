<script setup lang="ts">
import { ref } from 'vue'
import { InformationCircleIcon } from '@heroicons/vue/20/solid'

defineProps({
  info: {
    type: String,
    default: 'text',
  },
})

const showInfo = ref(false)
</script>

<template>
  <div class="relative inline-block cursor-pointer" @mouseover="showInfo = true" @mouseout="showInfo = false">
    <InformationCircleIcon class="h-5 w-5 text-gray-400" />
    <div v-if="showInfo" class="absolute w-64 left-full ml-2 p-2 text-sm bg-gray-700 text-gray-100 rounded shadow-lg z-10">
      {{ info }}
    </div>
  </div>
</template>
