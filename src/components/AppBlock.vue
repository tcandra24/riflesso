<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'

const props = defineProps(['delay'])
const showBlock = ref(false)

const timer = ref(null)
const reactionTime = ref(0)

const emits = defineEmits(['end'])

onMounted(() => {
  setTimeout(() => {
    showBlock.value = true
    startTimer()
  }, props.delay)
})

function startTimer() {
  timer.value = setInterval(() => {
    reactionTime.value += 10
  }, 10)
}

function stopTimer() {
  clearInterval(timer.value)
  emits('end', reactionTime.value)
}
</script>
<template>
  <div class="block" v-if="showBlock" @click="stopTimer">click me</div>
</template>

<style scoped>
.block {
  width: 400px;
  border-radius: 20px;
  background: #0faf87;
  color: white;
  text-align: center;
  padding: 100px 0;
  margin: 40px auto;
}
</style>
