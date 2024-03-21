<script setup>
const props = defineProps(['score'])

function resultCategory(score) {
  if (score < 2000) {
    return 'Sooo Fast'
  } else if (score >= 2000 && score < 4000) {
    return 'Average'
  } else {
    return 'Too Slow'
  }
}
</script>
<template>
  <h1 class="text-center text-xl text-gray-600 dark:text-gray-300">
    Average reaction time - {{ props.score }} ms
  </h1>
  <h2 class="text-center text-md text-gray-600 dark:text-gray-300">
    {{ resultCategory(props.score) }}
  </h2>
</template>
