<script setup>
import AppTestimonial from '@/components/AppTestimonial.vue'
import { useHighScore } from '../stores/highscore'

const store = useHighScore()
const sortHighscore = store.getHighScore.sort((a, b) => a.avgScore - b.avgScore)
</script>
<template>
  <div class="relative py-16">
    <div
      v-if="sortHighscore.length > 0"
      class="w-full flex-col mx-auto px-6 md:px-12 xl:px-6 flex items-center justify-center"
    >
      <h1 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Highscore:</h1>
      <ol class="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
        <li v-for="(list, index) of sortHighscore" :key="index">
          <span class="font-bold text-xl text-gray-900 dark:text-white">{{ list.avgScore }}</span>
        </li>
      </ol>
    </div>
    <div v-else class="mt-16 flex justify-center flex-col gap-y-4 gap-x-6">
      <h1
        class="text-gray-900 dark:text-white font-bold text-5xl md:text-6xl xl:text-7xl text-center"
      >
        Try To Play first to get highscore
      </h1>
      <div class="flex justify-center">
        <router-link
          to="/playground"
          class="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-indigo-500 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 sm:w-max"
        >
          <span class="relative text-base font-semibold text-white">Play!</span>
        </router-link>
      </div>
    </div>
  </div>
  <AppTestimonial />
</template>
