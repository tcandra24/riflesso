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
      class="lg:w-1/4 md:w-2/5 w-1/2 flex-col mx-auto px-6 md:px-12 xl:px-6 flex items-center justify-center"
    >
      <h1 class="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Highscore:</h1>

      <ul class="w-full divide-y divide-gray-200 dark:divide-gray-700">
        <li class="pb-3 sm:pb-4" v-for="(list, index) of sortHighscore" :key="index">
          <div class="flex items-center space-x-4 rtl:space-x-reverse">
            <div class="flex-shrink-0">
              <img
                class="w-8 h-8 rounded-full"
                :src="`https://ui-avatars.com/api/?name=${index + 1}`"
                alt="Neil image"
              />
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                {{ list.name }}
              </p>
              <p class="text-sm text-gray-500 truncate dark:text-gray-400">{{ list.email }}</p>
            </div>
            <div
              class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white"
            >
              {{ list.avgScore }}
            </div>
          </div>
        </li>
      </ul>
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
