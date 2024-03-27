import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useHighScore = defineStore('highscore', {
  state: () => ({
    lists: useLocalStorage('Highscore:lists', [])
  }),
  getters: {
    getHighScore: (state) => {
      return state.lists
    }
  },
  actions: {
    storeScore(avgScore, scores) {
      this.lists.push({
        avgScore: avgScore,
        scores: scores
      })
    }
  }
})
