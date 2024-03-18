<script setup>
import { ref } from 'vue'
import { onMounted } from 'vue'

const props = defineProps(['delay'])
const showBlock = ref(false)

const timer = ref(null)
const reactionTime = ref(0)

const emits = defineEmits(['end'])

const top = ['top-1/2', 'top-1/3', 'top-2/3', 'top-1/4', 'top-2/4', 'top-3/4']
const left = ['left-1/2', 'left-1/3', 'left-2/3', 'left-1/4', 'left-2/4', 'left-3/4']
const colors = ['bg-red-400', 'bg-indigo-400', 'bg-gray-400', 'bg-orange-400', 'bg-lime-400']

const times = ref(5)
const counter = ref(1)
const scores = ref([])

const topClass = ref('')
const leftClass = ref('')
const colorClass = ref('')

topClass.value = random(top)
leftClass.value = random(left)
colorClass.value = random(colors)

onMounted(() => {
  setTimeout(() => {
    startTimer()
  }, props.delay)
})

function startTimer() {
  showBlock.value = true

  timer.value = setInterval(() => {
    reactionTime.value += 10
  }, 10)
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function getReactionTime() {
  clearInterval(timer.value)
  showBlock.value = false
  if (isPlay(counter.value, times.value)) {
    emits('countScore', scores.value)
  }

  calculateScore()
}

function calculateScore() {
  scores.value.push(reactionTime.value)
  topClass.value = random(top)
  leftClass.value = random(left)
  colorClass.value = random(colors)
  reactionTime.value = 0
  startTimer()

  counter.value++
}

function isPlay(counter, times) {
  return counter >= times
}
</script>
<template>
  <div class="h-64 relative">
    <div
      :class="`h-5 w-5 m-3 rounded-full absolute z-50 ${topClass} ${leftClass} ${colorClass}`"
      v-if="showBlock"
      @click="getReactionTime"
    ></div>
  </div>
</template>
