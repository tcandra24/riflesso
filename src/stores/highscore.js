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
      const count = this.lists.length + 1

      this.lists.push({
        name: `Anonym #${count}`,
        email: `anonym${count}@anonym.com`,
        avgScore: avgScore,
        scores: scores
      })
    }
  }
})
