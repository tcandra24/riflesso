<script setup>
const props = defineProps(['score'])

function resultCategory(score) {
  if (score < 2000) {
    return 'So Fast 🚄'
  } else if (score >= 2000 && score < 4000) {
    return 'Average 🚗'
  } else {
    return 'Too Slow 🚲'
  }
}
</script>
<template>
  <h1 class="text-center text-2xl text-gray-600 dark:text-gray-300">
    Average reaction time - <span class="font-bold">{{ props.score }}</span>
  </h1>
  <h2 class="text-center text-2xl font-bold text-gray-600 dark:text-gray-300">
    You Are {{ resultCategory(props.score) }}
  </h2>
</template>
