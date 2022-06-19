<script setup>
import { onMounted, ref } from "@vue/runtime-core"

const props = defineProps(['score'])
const rank = ref('');

onMounted(() => {
  if (props.score < 205) {
    rank.value = 'Ninja Fingers'
  } else if (props.score < 400) {
    rank.value = 'Rapid Reflexes'
  } else {
    rank.value = 'Snail pace....'
  }
})
</script>

<template>
  <p>Reaction time - {{ props.score }} ms</p>
  <p>{{ rank }}</p>
</template>