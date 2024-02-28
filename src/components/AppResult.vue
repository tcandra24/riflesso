<script setup>
const props = defineProps(['score'])
</script>
<template>
  <p>Reaction time - {{ props.score }} ms</p>
</template>
