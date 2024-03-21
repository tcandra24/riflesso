import { defineStore } from 'pinia'

export const useHighScore = defineStore('highscore', {
  state: () => ({
    lists: []
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
