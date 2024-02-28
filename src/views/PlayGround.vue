<script setup>
import AppBlock from '@/components/AppBlock.vue'
import AppResult from '@/components/AppResult.vue'

import { ref } from 'vue'

const isPlaying = ref(false)
const showResult = ref(false)
const delay = ref(null)
const score = ref(null)

function start() {
  delay.value = 2000 + Math.random() * 5000
  isPlaying.value = true
  showResult.value = false
}

function endGame(value) {
  score.value = value
  isPlaying.value = false
  showResult.value = true
}
</script>
<template>
  <div class="relative py-16">
    <div
      aria-hidden="true"
      class="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-40 dark:opacity-20"
    >
      <div
        class="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-400 dark:from-blue-700"
      ></div>
      <div
        class="blur-[106px] h-32 bg-gradient-to-r from-cyan-400 to-sky-300 dark:to-indigo-600"
      ></div>
    </div>
    <div class="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
      <div class="relative">
        <div class="flex items-center justify-center -space-x-2">
          <button
            class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-indigo-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            @click="start()"
            :disabled="isPlaying"
          >
            <span class="relative text-base font-semibold text-white">Start</span>
          </button>
          <AppBlock v-if="isPlaying" :delay="delay" @end="endGame" />
          <!-- <p v-if="showResult">Reaction time: {{ score }} ms </p> -->
          <AppResult v-if="showResult" :score="score" />
        </div>
        <div class="mt-6 m-auto space-y-6 md:w-8/12 lg:w-7/12">
          <h1 class="text-center text-4xl font-bold text-gray-800 dark:text-white md:text-5xl">
            Get Started now
          </h1>
          <p class="text-center text-xl text-gray-600 dark:text-gray-300">
            Be part of millions people around the world using tailus in modern User Interfaces.
          </p>
          <div class="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              class="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
            >
              <span class="relative text-base font-semibold text-white dark:text-dark"
                >Get Started</span
              >
            </a>
            <a
              href="#"
              class="relative flex h-12 w-full items-center justify-center px-8 before:absolute before:inset-0 before:rounded-full before:border before:border-transparent before:bg-primary/10 before:bg-gradient-to-b before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 dark:before:border-gray-700 dark:before:bg-gray-800 sm:w-max"
            >
              <span class="relative text-base font-semibold text-primary dark:text-white"
                >More about</span
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
