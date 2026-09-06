<script setup lang="ts">
import { Pause, RotateCcw, ShieldCheck } from 'lucide-vue-next';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { cn } from '../lib/utils';
import { useAppStore } from '../stores/app';

type GameState = 'IDLE' | 'WAITING' | 'ARMED' | 'FINISHED' | 'FALSE_START';

const store = useAppStore();

const gameState = ref<GameState>('IDLE');
const targetPos = ref({ x: 50, y: 50 });
const delta = ref(0);
const rounds = ref(0);
const maxRounds = 5;
const currentRoundScores = ref<number[]>([]);

const arenaRef = ref<HTMLDivElement | null>(null);
let timerRef: number | null = null;
let startTimeRef = 0;
let armTimeoutRef: ReturnType<typeof setTimeout> | null = null;
let resetTimeoutRef: ReturnType<typeof setTimeout> | null = null;

function moveTarget() {
  const padding = 10;
  const x = Math.random() * (100 - padding * 2) + padding;
  const y = Math.random() * (100 - padding * 2) + padding;
  targetPos.value = { x, y };
}

function startWaitPhase() {
  gameState.value = 'WAITING';
  delta.value = 0;
  moveTarget();
  if (timerRef) cancelAnimationFrame(timerRef);
  if (armTimeoutRef) clearTimeout(armTimeoutRef);

  const randomDelay = Math.floor(Math.random() * 2700) + 1500;
  armTimeoutRef = setTimeout(() => {
    gameState.value = 'ARMED';
    startTimeRef = performance.now();

    const updateTimer = () => {
      delta.value = performance.now() - startTimeRef;
      timerRef = requestAnimationFrame(updateTimer);
    };
    timerRef = requestAnimationFrame(updateTimer);
  }, randomDelay);
}

function handleAction() {
  if (gameState.value === 'ARMED') {
    const finalScore = performance.now() - startTimeRef;
    if (timerRef) cancelAnimationFrame(timerRef);
    delta.value = finalScore;
    gameState.value = 'FINISHED';

    const newScores = [...currentRoundScores.value, finalScore];
    currentRoundScores.value = newScores;

    if (rounds.value + 1 >= maxRounds) {
      // Complete session
      const avg = newScores.reduce((a, b) => a + b, 0) / newScores.length;
      const best = Math.min(...newScores);
      store.addResult({
        mode: 'Rapid Fire',
        rounds: maxRounds,
        avgLatency: avg,
        bestSplit: best,
      });
      resetTimeoutRef = setTimeout(() => {
        rounds.value = 0;
        currentRoundScores.value = [];
        startWaitPhase();
      }, 2500);
    } else {
      rounds.value += 1;
      resetTimeoutRef = setTimeout(startWaitPhase, 2000);
    }
  } else if (gameState.value === 'WAITING') {
    if (armTimeoutRef) clearTimeout(armTimeoutRef);
    gameState.value = 'FALSE_START';
    resetTimeoutRef = setTimeout(startWaitPhase, 1600);
  }
}

function handleArenaPointerDown() {
  if (gameState.value === 'WAITING') handleAction(); // Click outside early
}

function handleTargetPointerDown(e: PointerEvent) {
  e.stopPropagation();
  handleAction();
}

function handleKeyDown(e: KeyboardEvent) {
  if (e.code === 'Space' && !e.repeat) {
    e.preventDefault();
    handleAction();
  }
}

// Mirrors the React effect that re-armed the game whenever gameState went back to IDLE
// (e.g. after the "Abort" button resets it).
watch(gameState, (value) => {
  if (value === 'IDLE') startWaitPhase();
});

onMounted(() => {
  startWaitPhase();
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  if (timerRef) cancelAnimationFrame(timerRef);
  if (armTimeoutRef) clearTimeout(armTimeoutRef);
  if (resetTimeoutRef) clearTimeout(resetTimeoutRef);
  window.removeEventListener('keydown', handleKeyDown);
});

const bestCurrentScore = computed(() =>
  currentRoundScores.value.length > 0 ? Math.min(...currentRoundScores.value).toFixed(1) : '---',
);
</script>

<template>
  <div class="flex flex-col w-full">
    <section class="relative w-full flex flex-col items-center justify-between pb-unit-lg select-none">
      <!-- HUD -->
      <div class="w-full grid grid-cols-1 md:grid-cols-3 gap-unit-xs mb-unit-sm items-center">
        <div class="flex items-center gap-unit-sm bg-surface-container-low/90 backdrop-blur-md px-unit-md py-unit-xs rounded-full shadow-md">
          <div class="flex items-center gap-unit-2xs">
            <span class="w-2.5 h-2.5 rounded-full bg-primary-container shadow-[0_0_8px_currentColor] animate-pulse"></span>
            <span class="font-mono text-badge-mono uppercase text-on-surface-variant">SESSION ID</span>
          </div>
          <span class="font-mono text-label-mono text-primary font-bold">#RF-NEW</span>
          <span class="w-1 h-3 bg-surface-variant rounded-full mx-unit-2xs"></span>
          <div class="flex items-center gap-unit-2xs bg-surface-container-high px-unit-xs py-0.5 rounded-full">
            <span class="font-mono text-label-mono text-on-surface-variant">ROUND</span>
            <span class="font-mono text-label-mono text-primary font-bold">
              {{ String(rounds + 1).padStart(2, '0') }}<span class="text-on-surface-variant font-normal">/{{ String(maxRounds).padStart(2, '0') }}</span>
            </span>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center bg-surface-container-low/90 backdrop-blur-md px-unit-lg py-unit-xs rounded-full shadow-md">
          <div class="flex items-baseline gap-unit-xs">
            <span class="font-mono text-badge-mono text-outline uppercase tracking-widest">DELTA T</span>
            <span class="font-mono text-[40px] leading-none tracking-tight font-bold text-on-surface">
              {{ gameState === 'FALSE_START' ? 'PENALTY' : delta.toFixed(2) }}
            </span>
            <span class="font-mono text-label-mono text-on-surface-variant">ms</span>
          </div>
        </div>

        <div class="flex items-center justify-end gap-unit-xs bg-surface-container-low/90 backdrop-blur-md px-unit-md py-unit-xs rounded-full shadow-md">
          <div class="flex items-center gap-unit-2xs bg-surface-container-high px-unit-xs py-0.5 rounded-full">
            <span class="font-mono text-label-mono text-outline">STREAK</span>
            <span class="font-mono text-label-mono text-secondary-container font-bold">x{{ currentRoundScores.length }}</span>
          </div>
          <div class="flex items-center gap-unit-2xs bg-surface-container-high px-unit-xs py-0.5 rounded-full">
            <ShieldCheck :size="14" class="text-tertiary-container" />
            <span class="font-mono text-badge-mono text-tertiary font-semibold tracking-wider">ANTI-CHEAT 1KHz</span>
          </div>
        </div>
      </div>

      <!-- ARENA -->
      <div
        ref="arenaRef"
        class="relative w-full h-[675px] min-h-[480px] max-h-[720px] bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between p-unit-md cursor-crosshair"
        @pointerdown="handleArenaPointerDown"
      >
        <!-- Background pattern -->
        <div class="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,rgba(0,245,212,0.08)_0%,transparent_70%)]"></div>
        <div class="absolute inset-0 pointer-events-none">
          <div class="absolute top-1/2 left-0 right-0 h-px bg-surface-variant/40 -translate-y-1/2"></div>
          <div class="absolute left-1/2 top-0 bottom-0 w-px bg-surface-variant/40 -translate-x-1/2"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-surface-variant/30"></div>
        </div>

        <!-- Banner -->
        <div class="relative z-20 flex justify-between items-start pointer-events-none w-full">
          <div
            :class="cn(
              'flex items-center gap-unit-sm px-unit-lg py-unit-xs rounded-full shadow-lg transition-all duration-75',
              gameState === 'ARMED' ? 'bg-tertiary-container shadow-[0_0_25px_rgba(52,252,13,0.5)]' : 'bg-surface-container-high/90 backdrop-blur-xl'
            )"
          >
            <div :class="cn('w-3 h-3 rounded-full', gameState === 'ARMED' ? 'bg-on-tertiary-container animate-pulse' : 'bg-amber-400 animate-ping')"></div>
            <span
              :class="cn(
                'font-display text-headline-sm uppercase font-bold tracking-wider',
                gameState === 'ARMED' ? 'text-on-tertiary-container' : 'text-amber-300'
              )"
            >
              {{ gameState === 'ARMED' ? 'STRIKE NOW!' : 'WAIT FOR GREEN' }}
            </span>
          </div>

          <div class="flex items-center gap-unit-xs bg-surface-container-high/80 px-unit-sm py-1 rounded-full shadow-sm">
            <span class="w-2 h-2 rounded-full bg-tertiary-container"></span>
            <span class="font-mono text-label-mono text-on-surface-variant uppercase">False Start Penalty:</span>
            <span class="font-mono text-label-mono text-tertiary font-bold">+250ms</span>
          </div>
        </div>

        <!-- Target -->
        <div
          class="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform duration-75 hover:scale-105 active:scale-95"
          :style="{ top: `${targetPos.y}%`, left: `${targetPos.x}%` }"
          @pointerdown="handleTargetPointerDown"
        >
          <div class="relative flex items-center justify-center" :style="{ width: store.settings.targetScale * 1.6 + 'px', height: store.settings.targetScale * 1.6 + 'px' }">
            <template v-if="gameState === 'ARMED'">
              <div class="absolute inset-0 rounded-full bg-tertiary-container/50 animate-ping pointer-events-none"></div>
              <div class="absolute w-32 h-32 rounded-full bg-tertiary-fixed-dim/40 blur-xl pointer-events-none"></div>
            </template>
            <template v-if="gameState === 'WAITING'">
              <div class="absolute inset-0 rounded-full bg-secondary-container/20 animate-ping pointer-events-none"></div>
              <div class="absolute w-full h-full scale-125 rounded-full bg-primary-container/20 blur-md pointer-events-none"></div>
            </template>

            <div
              :class="cn(
                'relative rounded-full flex items-center justify-center transition-all duration-75',
                gameState === 'ARMED' ? 'bg-tertiary-container shadow-[0_0_40px_rgba(52,252,13,0.9)] scale-110' : 'bg-surface-container-highest shadow-[0_0_24px_rgba(0,187,249,0.35)]'
              )"
              :style="{
                width: store.settings.targetScale + 'px',
                height: store.settings.targetScale + 'px',
                backgroundColor: gameState === 'ARMED' ? undefined : store.settings.targetColor,
              }"
            >
              <div class="w-[60%] h-[60%] rounded-full bg-surface-container-high flex items-center justify-center pointer-events-none">
                <div :class="cn('w-3 h-3 rounded-full transition-colors duration-75', gameState === 'ARMED' ? 'bg-on-tertiary-container' : 'bg-secondary-container')"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feedback Splash -->
        <div
          :class="cn(
            'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-40 transition-opacity duration-150 flex flex-col items-center',
            gameState === 'FINISHED' || gameState === 'FALSE_START' ? 'opacity-100' : 'opacity-0'
          )"
        >
          <span
            :class="cn(
              'font-display text-[64px] font-bold tracking-tight',
              gameState === 'FALSE_START' ? 'text-error drop-shadow-[0_0_25px_rgba(255,180,171,0.6)]' : 'text-primary drop-shadow-[0_0_30px_rgba(0,245,212,0.8)]'
            )"
          >
            {{ gameState === 'FALSE_START' ? 'TOO EARLY!' : `${delta.toFixed(0)} ms` }}
          </span>
          <span
            :class="cn(
              'font-mono text-label-mono uppercase bg-surface-container-lowest/90 px-unit-md py-1 rounded-full mt-unit-2xs font-bold',
              gameState === 'FALSE_START' ? 'text-error' : 'text-primary'
            )"
          >
            {{ gameState === 'FALSE_START' ? 'FALSE START PENALTY: +250ms' : 'EXCELLENT STRIKE' }}
          </span>
        </div>

        <!-- Vector HUD -->
        <div class="relative z-20 flex justify-between items-end pointer-events-none w-full pt-unit-xl">
          <div class="flex flex-col bg-surface-container-low/70 px-unit-sm py-unit-2xs rounded-lg">
            <span class="font-mono text-badge-mono text-outline uppercase">VECTOR COORDINATES</span>
            <span class="font-mono text-label-mono text-on-surface font-semibold">X: {{ (targetPos.x * 12).toFixed(1) }} | Y: {{ (targetPos.y * 8).toFixed(1) }}</span>
          </div>
          <div class="flex items-center gap-unit-xs bg-surface-container-low/70 px-unit-sm py-unit-2xs rounded-lg">
            <span class="font-mono text-badge-mono text-outline uppercase">INPUT LATENCY</span>
            <span class="font-mono text-label-mono text-tertiary-container font-bold">0.82 ms</span>
          </div>
        </div>
      </div>

      <!-- Lower Controls -->
      <div class="w-full mt-unit-sm flex flex-col sm:flex-row items-center justify-between gap-unit-sm">
        <div class="flex items-center gap-unit-sm bg-surface-container-low/80 backdrop-blur-md px-unit-lg py-unit-xs rounded-full shadow-sm">
          <div class="flex items-center gap-unit-2xs">
            <kbd class="bg-surface-container-highest px-unit-xs py-0.5 rounded text-primary font-mono text-label-mono font-bold shadow-sm">[SPACE]</kbd>
            <span class="font-sans text-body-sm text-on-surface-variant">or Click Target Disc when signal flashes Green</span>
          </div>
        </div>

        <div class="hidden lg:flex items-center gap-unit-md bg-surface-container-low/80 backdrop-blur-md px-unit-lg py-unit-xs rounded-full shadow-sm">
          <div class="flex items-center gap-unit-2xs">
            <span class="font-mono text-label-mono text-outline">TRIALS:</span>
            <svg class="w-24 h-6 text-primary-container" fill="none" stroke="currentColor" viewBox="0 0 100 24">
              <polyline points="0,18 20,12 40,16 60,6 80,10 100,4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline>
              <circle cx="100" cy="4" fill="currentColor" r="3"></circle>
            </svg>
          </div>
          <span class="font-mono text-label-mono text-on-surface font-bold">BEST: <span class="text-tertiary">{{ bestCurrentScore }}ms</span></span>
        </div>

        <div class="flex items-center gap-unit-xs">
          <button
            class="flex items-center gap-unit-xs px-unit-lg py-unit-xs rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-display text-body-sm font-semibold transition-all active:scale-95 shadow-md"
            @click="startWaitPhase"
          >
            <RotateCcw :size="16" />
            <span>Reset Trial</span>
          </button>
          <button
            class="flex items-center gap-unit-xs px-unit-lg py-unit-xs rounded-full bg-error-container hover:bg-error-container/80 text-on-error-container font-display text-body-sm font-semibold transition-all active:scale-95 shadow-md"
            @click="gameState = 'IDLE'"
          >
            <Pause :size="16" />
            <span>Abort</span>
          </button>
        </div>
      </div>
    </section>
  </div>
</template>
