<script setup lang="ts">
import { CheckCircle2, Monitor, Play, TrendingUp, Zap } from 'lucide-vue-next';
import { computed } from 'vue';
import { useAppStore } from '../stores/app';

const store = useAppStore();

const totalRounds = computed(() => store.history.reduce((acc, curr) => acc + curr.rounds, 0));
const bestScore = computed(() => (store.history.length > 0 ? Math.min(...store.history.map((h) => h.bestSplit)) : 0));
const globalAvg = 218; // Mock
</script>

<template>
  <div class="flex flex-col w-full pb-unit-3xl space-y-unit-lg">
    <!-- Dual Perception Switcher (Visual only for now) -->
    <div class="flex items-center justify-between flex-wrap gap-unit-md py-unit-md">
      <div class="inline-flex items-center p-unit-2xs bg-surface-container-low rounded-full shadow-md">
        <button class="flex items-center gap-unit-xs px-unit-md py-1.5 rounded-full bg-primary-container text-on-primary-container font-display text-body-sm font-semibold shadow-[0_0_16px_rgba(0,245,212,0.35)] transition-all">
          <Monitor :size="16" />
          <span>Desktop Arena Mode</span>
          <span class="font-mono text-badge-mono px-unit-xs py-0.5 rounded-full bg-on-primary-container/20 text-on-primary-container uppercase">Active</span>
        </button>
      </div>
      <div class="flex items-center gap-unit-md">
        <div class="flex items-center gap-unit-xs font-mono text-label-mono bg-surface-container-low px-unit-md py-1.5 rounded-full text-on-surface-variant">
          <span class="inline-block w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
          <span class="text-on-surface font-semibold uppercase">Calibrated:</span>
          <span class="text-primary font-bold">144Hz DISPLAY READY</span>
        </div>
        <div class="hidden md:flex items-center gap-unit-xs font-mono text-badge-mono px-unit-sm py-1 rounded-full bg-surface-container-high text-secondary-fixed">
          <Zap :size="14" />
          RAW INPUT: OPTICAL DIRECT
        </div>
      </div>
    </div>

    <!-- Hero Kinetic Arena Section -->
    <div class="relative w-full rounded-xl overflow-hidden bg-gradient-to-b from-surface-container-low via-surface-container-lowest to-surface-container-lowest p-unit-xl lg:p-unit-3xl shadow-xl flex flex-col items-center text-center">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-container/10 blur-[110px] pointer-events-none rounded-full"></div>

      <div class="flex items-center gap-unit-xs px-unit-md py-1 rounded-full bg-surface-container-high/80 backdrop-blur-md mb-unit-lg shadow-sm">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-container"></span>
        </span>
        <span class="font-mono text-label-mono uppercase text-primary font-semibold tracking-wider">Sub-Millisecond Neural Telemetry</span>
        <span class="text-outline text-body-sm">|</span>
        <span class="font-mono text-label-mono text-on-surface-variant">LATENCY ENGINE 0.18ms OFFSET</span>
      </div>

      <h1 class="font-display text-[48px] md:text-display-hero tracking-tight max-w-4xl text-on-surface uppercase mb-unit-sm leading-none">
        Benchmark Your <span class="text-primary-container">Neural Reflexes</span>
      </h1>
      <p class="font-sans text-body-lg text-on-surface-variant max-w-2xl mb-unit-2xl mt-4">
        Measure neuromuscular reaction latency with sub-millisecond precision across kinetic triggers, randomized target acquisition, and micro-burst intervals.
      </p>

      <div class="relative w-full max-w-xl group mb-unit-xl">
        <div class="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-container via-tertiary-container to-secondary-container opacity-40 group-hover:opacity-100 blur-xl transition-all duration-300 group-hover:scale-105"></div>
        <router-link to="/arena" class="relative w-full py-unit-xl px-unit-2xl rounded-full bg-primary-container text-on-primary-container flex items-center justify-between gap-unit-md shadow-[0_0_35px_rgba(0,245,212,0.4)] transition-all transform active:scale-[0.98] duration-75 cursor-pointer select-none">
          <div class="flex items-center gap-unit-md">
            <div class="w-12 h-12 rounded-full bg-on-primary-container/15 flex items-center justify-center text-on-primary-container">
              <Play :size="24" fill="currentColor" />
            </div>
            <div class="flex flex-col text-left">
              <span class="font-display text-headline-md font-bold tracking-tight text-on-primary-container leading-none">START TEST</span>
              <span class="font-mono text-badge-mono tracking-widest text-on-primary-container/80 uppercase mt-1">PRESS SPACEBAR OR CLICK</span>
            </div>
          </div>
          <div class="flex items-center gap-unit-xs px-unit-md py-1.5 rounded-full bg-surface-container-lowest text-tertiary-container shadow-inner">
            <span class="w-2 h-2 rounded-full bg-tertiary-container animate-ping"></span>
            <span class="font-mono text-label-mono font-bold tracking-wider uppercase text-tertiary">READY</span>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-unit-md">
      <div class="p-unit-lg rounded-xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col justify-between hover:bg-surface-container transition-colors relative overflow-hidden group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-primary-container/10 rounded-full blur-2xl group-hover:bg-primary-container/20 transition-all"></div>
        <div class="flex items-center justify-between mb-unit-sm">
          <span class="font-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Personal Best</span>
          <span class="font-mono text-badge-mono px-unit-xs py-0.5 rounded-full bg-primary-container/15 text-primary-container font-semibold uppercase">Top 1.0%</span>
        </div>
        <div class="flex items-baseline gap-unit-2xs mb-unit-xs">
          <span class="font-mono text-metric-readout text-primary-container font-bold tracking-tighter">{{ bestScore.toFixed(0) }}</span>
          <span class="font-mono text-headline-sm text-primary-container/70">ms</span>
        </div>
        <div class="w-full pt-unit-xs flex items-center justify-between gap-unit-2xs">
          <div class="h-1 flex-1 bg-surface-container-high rounded-full overflow-hidden">
            <div class="h-full bg-primary-container w-[92%] rounded-full"></div>
          </div>
          <span class="font-mono text-badge-mono text-on-surface-variant">v.PRO 140ms</span>
        </div>
      </div>

      <div class="p-unit-lg rounded-xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col justify-between hover:bg-surface-container transition-colors relative overflow-hidden">
        <div class="flex items-center justify-between mb-unit-sm">
          <span class="font-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Global Average</span>
          <span class="font-mono text-badge-mono px-unit-xs py-0.5 rounded-full bg-secondary-container/15 text-secondary font-semibold uppercase">Human Base</span>
        </div>
        <div class="flex items-baseline gap-unit-2xs mb-unit-xs">
          <span class="font-mono text-metric-readout text-on-surface font-bold tracking-tighter">{{ globalAvg }}</span>
          <span class="font-mono text-headline-sm text-on-surface-variant">ms</span>
        </div>
        <div class="w-full pt-unit-xs flex items-center justify-between text-on-surface-variant font-mono text-label-mono">
          <span class="text-tertiary font-bold">+{{ globalAvg - bestScore }}ms Delta faster</span>
          <TrendingUp :size="16" class="text-tertiary" />
        </div>
      </div>

      <div class="p-unit-lg rounded-xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col justify-between hover:bg-surface-container transition-colors relative overflow-hidden">
        <div class="flex items-center justify-between mb-unit-sm">
          <span class="font-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Completed Rounds</span>
          <span class="font-mono text-badge-mono px-unit-xs py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-semibold uppercase">Logged</span>
        </div>
        <div class="flex items-baseline gap-unit-2xs mb-unit-xs">
          <span class="font-mono text-metric-readout text-on-surface font-bold tracking-tighter">{{ totalRounds.toLocaleString() }}</span>
        </div>
        <div class="w-full pt-unit-xs flex items-center justify-between font-mono text-label-mono text-on-surface-variant">
          <span>Session: 24 trials</span>
          <span class="text-secondary font-semibold">Tier V Elite</span>
        </div>
      </div>

      <div class="p-unit-lg rounded-xl bg-surface-container-low/80 backdrop-blur-md shadow-md flex flex-col justify-between hover:bg-surface-container transition-colors relative overflow-hidden group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-tertiary-container/10 rounded-full blur-2xl group-hover:bg-tertiary-container/20 transition-all"></div>
        <div class="flex items-center justify-between mb-unit-sm">
          <span class="font-mono text-label-mono text-on-surface-variant uppercase tracking-wider">Consistency</span>
          <span class="font-mono text-badge-mono px-unit-xs py-0.5 rounded-full bg-tertiary-container/20 text-tertiary font-semibold uppercase">High Grade</span>
        </div>
        <div class="flex items-baseline gap-unit-2xs mb-unit-xs">
          <span class="font-mono text-metric-readout text-tertiary font-bold tracking-tighter">98.4</span>
          <span class="font-mono text-headline-sm text-tertiary/70">%</span>
        </div>
        <div class="w-full pt-unit-xs flex items-center justify-between font-mono text-label-mono">
          <span class="text-on-surface-variant">Variance: ±3.2ms</span>
          <span class="text-tertiary font-bold">STABLE</span>
        </div>
      </div>
    </div>

    <!-- Footer Banner -->
    <div class="rounded-xl bg-surface-container-low p-unit-lg shadow-md flex flex-col md:flex-row items-center justify-between gap-unit-lg relative overflow-hidden border border-surface-container-high">
      <div class="flex items-center gap-unit-md">
        <div class="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-inner">
          <CheckCircle2 :size="24" />
        </div>
        <div>
          <div class="flex items-center gap-unit-xs">
            <span class="font-display text-headline-sm text-on-surface font-semibold">Verified Peripheral Sync Active</span>
            <span class="font-mono text-badge-mono px-unit-xs py-0.5 rounded-full bg-tertiary-container/20 text-tertiary">1000Hz USB</span>
          </div>
          <p class="font-sans text-body-sm text-on-surface-variant">
            Hardware latency compensation calibrated to current browser RAF (RequestAnimationFrame) clock. Jitter: &lt;0.04ms.
          </p>
        </div>
      </div>
      <div class="flex items-center gap-unit-md shrink-0">
        <div class="text-right">
          <div class="font-mono text-label-mono text-on-surface-variant uppercase">Engine State</div>
          <div class="font-mono text-body-sm font-bold text-tertiary">SYNCED • 0 DELAY</div>
        </div>
        <button class="px-unit-md py-unit-xs rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-sans text-body-sm transition-all shadow-sm">
          Diagnostics
        </button>
      </div>
    </div>
  </div>
</template>
