<script setup>
import { useHighScore } from '../stores/highscore'

const store = useHighScore()
const sortHighscore = store.getHighScore.sort((a, b) => a.avgScore - b.avgScore)
</script>
<template>
  <div class="relative py-16">
    <div class="w-full flex-col mx-auto px-6 md:px-12 xl:px-6 flex items-center justify-center">
      <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Highscore:</h2>
      <ol class="max-w-md space-y-1 text-gray-500 list-decimal list-inside dark:text-gray-400">
        <li v-for="(list, index) of sortHighscore" :key="index">
          <span class="font-semibold text-gray-900 dark:text-white">{{ list.avgScore }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>
