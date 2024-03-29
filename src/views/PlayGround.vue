<script setup>
import AppBlock from '@/components/AppBlock.vue'
import AppResult from '@/components/AppResult.vue'
import AppTestimonial from '@/components/AppTestimonial.vue'

import { ref, nextTick } from 'vue'
import ConfettiExplosion from 'vue-confetti-explosion'

import { useHighScore } from '../stores/highscore'

const { storeScore } = useHighScore()

const isPlaying = ref(false)
const showResult = ref(false)
const delay = ref(null)
const avgScore = ref(null)

function start() {
  delay.value = 2000 + Math.random() * 5000
  isPlaying.value = true
  showResult.value = false
}

async function countScore(value) {
  await nextTick()

  avgScore.value = value.reduce((total, current) => total + current, 0) / value.length

  isPlaying.value = false
  showResult.value = true

  storeScore(avgScore, value)
}
</script>
<template>
  <div class="relative py-16">
    <div class="w-full mx-auto px-6 md:px-12 xl:px-6 gap-y-4 gap-x-6 mb-16">
      <div class="relative">
        <div class="items-center -space-x-2">
          <div v-if="!isPlaying" class="flex flex-wrap justify-center gap-y-4 gap-x-6">
            <button
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-indigo-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
              @click="start()"
            >
              <span class="relative text-base font-semibold text-white">Start</span>
            </button>
            <ConfettiExplosion v-if="showResult" />
            <router-link
              to="/highscore"
              class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span class="relative text-base font-semibold text-primary dark:text-white"
                >Highscore</span
              >
            </router-link>
          </div>
        </div>
        <div
          v-if="isPlaying"
          class="mt-6 m-auto space-y-6 md:w-10/12 lg:w-9/12 rounded border-2 border-zinc-700 border-dashed"
        >
          <AppBlock :delay="delay" @countScore="countScore" />
        </div>
        <div class="my-5">
          <AppResult v-if="showResult" :score="avgScore" />
        </div>
      </div>
    </div>
    <AppTestimonial />
  </div>
</template>
