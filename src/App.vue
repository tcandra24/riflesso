<script setup>
import Block from './components/Block.vue'
import Results from './components/Results.vue'

import { ref } from "@vue/reactivity";

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
  <h1>
    Ninja Reaction Timer
  </h1>
  <button @click="start()" :disabled="isPlaying">Play</button>
  <Block v-if="isPlaying" :delay="delay" @end="endGame" />
  <!-- <p v-if="showResult">Reaction time: {{ score }} ms </p> -->
  <Results v-if="showResult" :score="score" />
</template>

<style>
@import './assets/base.css';

</style>
