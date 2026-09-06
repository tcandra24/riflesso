import { defineStore } from 'pinia';

export type GameResult = {
  id: string;
  timestamp: number;
  mode: string;
  rounds: number;
  avgLatency: number;
  bestSplit: number;
  tier: 'GODLIKE' | 'MASTER' | 'GOOD';
};

export type AppSettings = {
  theme: 'dark' | 'light';
  targetScale: number;
  targetColor: string;
};

export type NewGameResult = Omit<GameResult, 'id' | 'timestamp' | 'tier'>;

interface AppState {
  history: GameResult[];
  settings: AppSettings;
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    history: [],
    settings: {
      theme: 'dark',
      targetScale: 75,
      targetColor: '#00F5D4',
    },
  }),

  actions: {
    // Generate some fake history for the dashboard layout if empty
    // (mirrors the useEffect(() => {...}, []) seed in the original AppProvider)
    seedHistoryIfEmpty() {
      if (this.history.length === 0) {
        this.history = [
          { id: '#3420', timestamp: Date.now(), mode: 'Rapid Fire', rounds: 50, avgLatency: 138.4, bestSplit: 129.1, tier: 'GODLIKE' },
          { id: '#3419', timestamp: Date.now() - 3600000, mode: 'Single Stimulus', rounds: 20, avgLatency: 144.2, bestSplit: 132.8, tier: 'GODLIKE' },
          { id: '#3418', timestamp: Date.now() - 86400000, mode: 'Rapid Fire', rounds: 50, avgLatency: 162.0, bestSplit: 148.0, tier: 'MASTER' },
        ];
      }
    },

    addResult(result: NewGameResult) {
      const tier: GameResult['tier'] = result.avgLatency < 150 ? 'GODLIKE' : result.avgLatency < 180 ? 'MASTER' : 'GOOD';
      const newResult: GameResult = {
        ...result,
        id: `#${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        timestamp: Date.now(),
        tier,
      };
      this.history.unshift(newResult);
    },

    updateSettings(newSettings: Partial<AppSettings>) {
      this.settings = { ...this.settings, ...newSettings };
    },

    clearHistory() {
      this.history = [];
    },

    applyThemeClass() {
      if (this.settings.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    },
  },
});
