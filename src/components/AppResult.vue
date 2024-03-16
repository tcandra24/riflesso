<script setup>
const props = defineProps(['score'])

const avgScore = props.score.reduce((total, current) => total + current, 0) / props.score.length

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
    Average reaction time - {{ avgScore }} ms
  </h1>
  <h2 class="text-center text-md text-gray-600 dark:text-gray-300">
    {{ resultCategory(avgScore) }}
  </h2>
  <ol>
    <li
      v-for="(score, index) of props.score"
      :key="index"
      class="text-center text-xl text-gray-600 dark:text-gray-300"
    >
      {{ index + 1 }}. {{ score }}
    </li>
  </ol>
</template>
