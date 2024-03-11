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
  <p class="text-center text-xl text-gray-600 dark:text-gray-300">
    Reaction time - {{ props.score }} ms
  </p>
  <p class="text-center text-md text-gray-600 dark:text-gray-300">
    {{ resultCategory(props.score) }}
  </p>
</template>
