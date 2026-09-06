<script setup lang="ts">
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Download, Filter, Medal, TrendingUp, Zap } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { Line } from 'vue-chartjs';
import { useAppStore } from '../stores/app';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

const store = useAppStore();
const filterMode = ref('all');
const filterTier = ref('all');

const chartRows = computed(() =>
  [...store.history]
    .reverse()
    .map((h, i) => ({ name: i, latency: h.avgLatency, benchmark: 200 }))
    .slice(-30),
);

// vue-chartjs / Chart.js equivalent of the recharts <AreaChart> in the original component.
const chartData = computed(() => ({
  labels: chartRows.value.map((r) => r.name),
  datasets: [
    {
      label: 'User Latency',
      data: chartRows.value.map((r) => r.latency),
      borderColor: '#00f5d4',
      backgroundColor: 'rgba(0, 245, 212, 0.15)',
      borderWidth: 3,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#0b0e15',
      pointHoverBorderColor: '#00f5d4',
      pointHoverBorderWidth: 2,
      fill: true,
      tension: 0.35,
    },
    {
      label: '200ms Human Avg',
      data: chartRows.value.map((r) => r.benchmark),
      borderColor: '#ffb4ab',
      borderWidth: 1,
      borderDash: [4, 4],
      pointRadius: 0,
      fill: false,
      tension: 0,
    },
  ],
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index' as const, intersect: false },
  scales: {
    x: { display: false },
    y: {
      grid: { color: 'rgba(58, 74, 70, 0.4)' },
      ticks: { color: '#b9cac4', font: { family: 'JetBrains Mono', size: 10 } },
    },
  },
  plugins: {
    tooltip: {
      backgroundColor: '#272a32',
      borderColor: '#3a4a46',
      borderWidth: 1,
      titleColor: '#e1e2ec',
      bodyColor: '#00f5d4',
      bodyFont: { family: 'JetBrains Mono', size: 12, weight: 'bold' as const },
      padding: 8,
      cornerRadius: 8,
    },
  },
};

const filteredHistory = computed(() =>
  store.history.filter((h) => {
    if (filterMode.value !== 'all' && h.mode.toLowerCase().replace(' ', '') !== filterMode.value) return false;
    if (filterTier.value !== 'all' && h.tier.toLowerCase() !== filterTier.value) return false;
    return true;
  }),
);

function resetFilters() {
  filterMode.value = 'all';
  filterTier.value = 'all';
}
</script>

<template>
  <div class="flex flex-col w-full pb-unit-3xl space-y-unit-xl">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-unit-md pt-unit-lg">
      <div class="flex items-center gap-unit-md">
        <div class="w-2.5 h-8 bg-primary-container rounded-full shadow-[0_0_12px_rgba(0,245,212,0.8)]"></div>
        <div>
          <div class="flex items-center gap-unit-xs">
            <span class="font-mono text-label-mono text-primary uppercase tracking-widest">SESSION TELEMETRY</span>
            <span class="w-1.5 h-1.5 rounded-full bg-secondary-container animate-ping"></span>
          </div>
          <h1 class="font-display text-headline-lg text-on-surface tracking-tight font-bold">Latency Diagnostics & Trend Curves</h1>
        </div>
      </div>

      <div class="flex items-center gap-unit-xs self-start md:self-auto bg-surface-container-low p-1 rounded-full shadow-lg">
        <div class="flex items-center">
          <button class="font-mono text-label-mono px-unit-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-all">TODAY</button>
          <button class="font-mono text-label-mono px-unit-md py-1.5 rounded-full bg-surface-container-high text-primary-fixed shadow-sm">30 DAYS</button>
          <button class="font-mono text-label-mono px-unit-md py-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-all">ALL TIME</button>
        </div>
        <div class="h-4 w-[1px] bg-surface-variant mx-1"></div>
        <button class="flex items-center gap-1.5 px-unit-md py-1.5 rounded-full bg-primary-container text-on-primary-container font-mono text-label-mono font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(0,245,212,0.3)]">
          <Download :size="16" />
          <span>EXPORT CSV</span>
        </button>
      </div>
    </div>

    <!-- Chart Section -->
    <div class="bg-surface-container-low/90 backdrop-blur-xl rounded-xl p-unit-lg shadow-xl relative overflow-hidden flex flex-col gap-unit-md border border-surface-container-high">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-unit-sm">
        <div>
          <div class="flex items-center gap-unit-xs">
            <TrendingUp class="text-primary-fixed-dim" :size="18" />
            <h2 class="font-display text-headline-sm text-on-surface font-semibold tracking-tight">Reaction Velocity Curve (Last 30 Sessions)</h2>
          </div>
          <p class="font-sans text-body-sm text-on-surface-variant mt-0.5">Chronological millisecond plots with threshold comparison markers.</p>
        </div>
        <div class="flex items-center gap-unit-md flex-wrap">
          <div class="flex items-center gap-unit-2xs">
            <span class="w-3 h-0.5 bg-primary rounded-full"></span>
            <span class="font-mono text-label-mono text-on-surface-variant">User Latency</span>
          </div>
          <div class="flex items-center gap-unit-2xs">
            <span class="w-3 h-0.5 bg-error/70 rounded-full border-dashed"></span>
            <span class="font-mono text-label-mono text-error/80">200ms Human Avg</span>
          </div>
        </div>
      </div>

      <div class="relative w-full h-[280px] bg-surface-container-lowest/80 rounded-lg p-unit-sm overflow-hidden border border-surface-container-high">
        <Line :data="chartData" :options="chartOptions" />
      </div>
    </div>

    <!-- Ledger -->
    <div class="bg-surface-container-low/90 backdrop-blur-xl rounded-xl shadow-xl overflow-hidden flex flex-col border border-surface-container-high">
      <div class="p-unit-lg flex flex-col lg:flex-row lg:items-center justify-between gap-unit-md bg-surface-container-low border-b border-surface-container-high">
        <div>
          <h3 class="font-display text-headline-sm text-on-surface font-bold tracking-tight">Verified Session Ledger</h3>
          <p class="font-sans text-body-sm text-on-surface-variant">Real-time local database query. Calibrated against 1000Hz polling rate.</p>
        </div>

        <div class="flex flex-wrap items-center gap-unit-xs">
          <div class="flex items-center gap-unit-2xs bg-surface-container-high px-unit-sm py-1.5 rounded-full border border-surface-variant/50">
            <Filter :size="14" class="text-on-surface-variant" />
            <span class="font-mono text-label-mono text-on-surface-variant">MODE:</span>
            <select v-model="filterMode" class="bg-transparent font-mono text-label-mono text-primary font-medium focus:outline-none cursor-pointer appearance-none pr-4">
              <option class="bg-surface-container-high text-on-surface" value="all">ALL MODES</option>
              <option class="bg-surface-container-high text-on-surface" value="rapidfire">RAPID FIRE</option>
              <option class="bg-surface-container-high text-on-surface" value="singlestimulus">SINGLE STIMULUS</option>
            </select>
          </div>

          <div class="flex items-center gap-unit-2xs bg-surface-container-high px-unit-sm py-1.5 rounded-full border border-surface-variant/50">
            <Medal :size="14" class="text-on-surface-variant" />
            <span class="font-mono text-label-mono text-on-surface-variant">TIER:</span>
            <select v-model="filterTier" class="bg-transparent font-mono text-label-mono text-primary font-medium focus:outline-none cursor-pointer appearance-none pr-4">
              <option class="bg-surface-container-high text-on-surface" value="all">ALL TIERS</option>
              <option class="bg-surface-container-high text-on-surface" value="godlike">GODLIKE (&lt;150ms)</option>
              <option class="bg-surface-container-high text-on-surface" value="master">MASTER (150-180ms)</option>
              <option class="bg-surface-container-high text-on-surface" value="good">GOOD (&gt;180ms)</option>
            </select>
          </div>
          <button
            class="px-unit-sm py-1.5 rounded-full bg-surface-container-highest text-on-surface-variant hover:text-on-surface font-mono text-label-mono text-[11px] transition-all"
            @click="resetFilters"
          >
            RESET
          </button>
        </div>
      </div>

      <div class="w-full overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-surface-container-lowest/80 text-on-surface-variant font-mono text-label-mono uppercase tracking-wider border-b border-surface-container-high">
              <th class="py-unit-sm px-unit-lg font-medium">SESSION ID & TIMESTAMP</th>
              <th class="py-unit-sm px-unit-md font-medium">BENCHMARK MODE</th>
              <th class="py-unit-sm px-unit-md font-medium text-center">ROUNDS</th>
              <th class="py-unit-sm px-unit-md font-medium">AVERAGE LATENCY</th>
              <th class="py-unit-sm px-unit-md font-medium">BEST SPLIT</th>
              <th class="py-unit-sm px-unit-md font-medium">PERFORMANCE TIER</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-surface-container font-sans text-body-md text-on-surface">
            <tr v-if="filteredHistory.length === 0">
              <td colspan="6" class="py-unit-xl text-center text-on-surface-variant font-mono text-label-mono">
                NO SESSIONS FOUND MATCHING CRITERIA
              </td>
            </tr>
            <tr v-for="item in filteredHistory" v-else :key="item.id" class="hover:bg-surface-container-high/60 transition-colors group">
              <td class="py-unit-md px-unit-lg flex flex-col">
                <span class="font-mono text-label-mono text-primary font-bold">{{ item.id }}</span>
                <span class="font-mono text-[11px] text-on-surface-variant">{{ new Date(item.timestamp).toLocaleString() }}</span>
              </td>
              <td class="py-unit-md px-unit-md">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container/10 text-secondary font-mono text-label-mono font-semibold border border-secondary/20">
                  <Zap :size="14" /> {{ item.mode }}
                </span>
              </td>
              <td class="py-unit-md px-unit-md text-center font-mono text-body-sm font-bold">{{ item.rounds }} / {{ item.rounds }}</td>
              <td class="py-unit-md px-unit-md">
                <div class="flex items-baseline gap-1">
                  <span class="font-mono text-headline-sm font-bold text-primary">{{ item.avgLatency.toFixed(1) }}</span>
                  <span class="font-mono text-[11px] text-outline">ms</span>
                </div>
              </td>
              <td class="py-unit-md px-unit-md">
                <div class="flex items-baseline gap-1">
                  <span class="font-mono text-body-sm font-bold text-tertiary">{{ item.bestSplit.toFixed(1) }}</span>
                  <span class="font-mono text-[11px] text-outline">ms</span>
                </div>
              </td>
              <td class="py-unit-md px-unit-md">
                <span v-if="item.tier === 'GODLIKE'" class="inline-flex items-center gap-1 px-unit-sm py-0.5 rounded-full bg-primary-container text-on-primary-container font-mono text-badge-mono font-bold shadow-[0_0_10px_rgba(0,245,212,0.4)]">
                  <Medal :size="14" /> GODLIKE
                </span>
                <span v-else-if="item.tier === 'MASTER'" class="inline-flex items-center gap-1 px-unit-sm py-0.5 rounded-full bg-secondary-container/20 text-secondary-fixed font-mono text-badge-mono font-bold border border-secondary/30">
                  <Medal :size="14" /> MASTER
                </span>
                <span v-else-if="item.tier === 'GOOD'" class="inline-flex items-center gap-1 px-unit-sm py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-mono text-badge-mono font-bold border border-outline-variant">
                  <TrendingUp :size="14" /> GOOD
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
