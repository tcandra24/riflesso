<script setup>
import AppBlock from '@/components/AppBlock.vue'
import AppResult from '@/components/AppResult.vue'

import { ref, nextTick } from 'vue'
import ConfettiExplosion from 'vue-confetti-explosion'

const isPlaying = ref(false)
const showResult = ref(false)
const delay = ref(null)
const score = ref(null)

function start() {
  delay.value = 2000 + Math.random() * 5000
  isPlaying.value = true
  showResult.value = false
}

async function countScore(value) {
  // scores.value.push({
  //   value
  // })
  await nextTick()

  score.value = value
  isPlaying.value = false
  showResult.value = true
}
</script>
<template>
  <div class="relative py-16">
    <div class="w-full mx-auto px-6 md:px-12 xl:px-6">
      <div class="relative">
        <div class="flex items-center justify-center -space-x-2">
          <ConfettiExplosion v-if="showResult" />
          <button
            class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-indigo-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            @click="start()"
            :disabled="isPlaying"
          >
            <span class="relative text-base font-semibold text-white">Start</span>
          </button>
        </div>
        <div
          v-if="isPlaying"
          class="mt-6 m-auto space-y-6 md:w-10/12 lg:w-9/12 rounded border-2 border-zinc-800 border-dashed"
        >
          <AppBlock :delay="delay" @countScore="countScore" />
        </div>
        <div class="my-5">
          <AppResult v-if="showResult" :score="score" />
        </div>
      </div>
    </div>
  </div>
</template>
