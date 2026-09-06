<script setup lang="ts">
import { CheckCircle2, RotateCcw, Zap } from 'lucide-vue-next';
import { computed } from 'vue';
import { cn } from '../lib/utils';
import { useAppStore } from '../stores/app';

const store = useAppStore();

function handleReset() {
  store.updateSettings({
    theme: 'dark',
    targetScale: 75,
    targetColor: '#00F5D4',
  });
}

const colors = [
  { name: 'Electric Cyan', hex: '#00F5D4', wave: '510nm', desc: 'ZERO FATIGUE' },
  { name: 'Toxic Lime', hex: '#39FF14', wave: '555nm', desc: 'MAX RETINA' },
  { name: 'Neon Magenta', hex: '#FF007F', wave: '420nm', desc: 'AGGRESSIVE' },
];

const targetScaleLabel = computed(() => {
  if (store.settings.targetScale < 55) return 'Hardcore Micro-Aim';
  if (store.settings.targetScale > 95) return 'Casual Visual Sprint';
  return 'Standard Reflex';
});

function onScaleInput(e: Event) {
  const value = Number((e.target as HTMLInputElement).value);
  store.updateSettings({ targetScale: value });
}
</script>

<template>
  <div class="flex flex-col w-full pb-unit-3xl">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-unit-md py-unit-xl">
      <div class="flex flex-col gap-unit-xs">
        <div class="flex items-center gap-unit-xs">
          <span class="font-mono text-badge-mono uppercase px-unit-xs py-0.5 rounded-full bg-surface-container-high text-primary-fixed-dim">SYSTEM // CONFIG_V2.4</span>
          <span class="font-mono text-label-mono text-on-surface-variant">CORE_PARAM_TUNER</span>
        </div>
        <h1 class="font-display text-headline-lg text-on-surface font-bold tracking-tight">System & Arena Settings</h1>
        <p class="font-sans text-body-md text-on-surface-variant max-w-xl">Configure sensory feedback thresholds, biomechanical input polling, and perceptual target dynamics.</p>
      </div>
      <div class="flex items-center gap-unit-sm">
        <button class="px-unit-lg py-2.5 rounded-full font-sans text-body-sm text-on-surface-variant bg-surface-container-low hover:bg-surface-container-high hover:text-on-surface transition-all active:scale-95 flex items-center gap-unit-xs" @click="handleReset">
          <RotateCcw :size="18" />
          <span>Revert Defaults</span>
        </button>
        <button class="px-unit-xl py-2.5 rounded-full font-display text-body-md font-bold bg-primary-container text-on-primary-container shadow-lg shadow-primary-container/20 hover:bg-primary-fixed transition-all active:scale-95 flex items-center gap-unit-xs">
          <Zap :size="18" />
          <span>Apply Config</span>
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-unit-lg mt-unit-md">
      <div class="lg:col-span-8 flex flex-col gap-unit-lg">
        <!-- Target Dynamics -->
        <section class="p-unit-xl rounded-xl bg-surface-container-low/70 backdrop-blur-md flex flex-col gap-unit-lg border border-surface-container-high">
          <div class="flex items-center justify-between">
            <div class="flex flex-col gap-unit-2xs">
              <span class="font-mono text-label-mono text-primary-fixed-dim uppercase tracking-wider">Acuity Calibration</span>
              <h2 class="font-display text-headline-md font-semibold text-on-surface">Target Diameter Gauge</h2>
              <p class="font-sans text-body-sm text-on-surface-variant">Smaller diameters penalize wrist micro-tremors and require pin-point cursor registration.</p>
            </div>
            <div class="text-right">
              <span class="font-mono text-[32px] font-bold text-primary">{{ store.settings.targetScale }}px</span>
              <div class="font-mono text-badge-mono text-secondary-fixed-dim uppercase mt-1">{{ targetScaleLabel }}</div>
            </div>
          </div>
          <div class="flex flex-col gap-unit-sm">
            <input
              type="range"
              min="40"
              max="120"
              step="5"
              :value="store.settings.targetScale"
              class="w-full h-2 bg-surface-container-highest rounded-full appearance-none cursor-pointer accent-primary"
              @input="onScaleInput"
            />
            <div class="flex justify-between font-mono text-label-mono text-on-surface-variant">
              <span>40px (Hardcore Fovea)</span>
              <span>75px (Competitive Baseline)</span>
              <span>120px (Peripheral Sprint)</span>
            </div>
          </div>
        </section>

        <!-- Colorway -->
        <section class="p-unit-xl rounded-xl bg-surface-container-low/70 backdrop-blur-md flex flex-col gap-unit-md border border-surface-container-high">
          <div class="flex flex-col gap-unit-2xs">
            <span class="font-mono text-label-mono text-secondary-fixed-dim uppercase tracking-wider">Perceptual Trigger Hue</span>
            <h3 class="font-display text-headline-sm font-semibold text-on-surface">Retinal Stimulus Colorway</h3>
            <p class="font-sans text-body-sm text-on-surface-variant">The immediate trigger color deployed on signal flash across the reflex arena.</p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-unit-md pt-unit-xs">
            <button
              v-for="c in colors"
              :key="c.hex"
              :class="cn(
                'p-unit-md rounded-lg bg-surface-container-lowest text-left transition-all hover:bg-surface-container-high flex flex-col gap-unit-sm shadow-md border',
                store.settings.targetColor === c.hex ? 'opacity-100 border-surface-variant' : 'opacity-70 hover:opacity-100 border-transparent'
              )"
              @click="store.updateSettings({ targetColor: c.hex })"
            >
              <div class="flex items-center justify-between">
                <div
                  class="w-7 h-7 rounded-full flex items-center justify-center border border-white/20"
                  :style="{ backgroundColor: c.hex, boxShadow: store.settings.targetColor === c.hex ? `0 0 12px ${c.hex}` : 'none' }"
                >
                  <CheckCircle2 v-if="store.settings.targetColor === c.hex" :size="16" :color="c.hex === '#00F5D4' || c.hex === '#39FF14' ? '#000' : '#fff'" />
                </div>
                <span class="font-mono text-badge-mono" :style="{ color: c.hex }">{{ c.wave }}</span>
              </div>
              <div>
                <div class="font-display text-body-md font-bold text-on-surface">{{ c.name }}</div>
                <div class="font-mono text-label-mono text-on-surface-variant">{{ c.hex }} • {{ c.desc }}</div>
              </div>
            </button>
          </div>
        </section>

        <!-- Danger Zone -->
        <section class="p-unit-lg rounded-xl bg-surface-container-lowest flex items-center justify-between border border-error/20">
          <div class="flex flex-col gap-unit-2xs">
            <span class="font-display text-body-md font-bold text-error">Purge Benchmark Telemetry</span>
            <span class="font-sans text-body-sm text-on-surface-variant">Permanently wipe all session histories, percentile ranks, and local reaction trial logs.</span>
          </div>
          <button
            class="px-unit-lg py-2 rounded-full font-display text-body-sm font-bold bg-error-container text-on-error-container hover:bg-error hover:text-on-error transition-all active:scale-95 flex items-center gap-unit-xs"
            @click="store.clearHistory"
          >
            Wipe Vault
          </button>
        </section>
      </div>

      <!-- Right column HUD Preview -->
      <div class="lg:col-span-4 flex flex-col gap-unit-lg">
        <div class="p-unit-xl rounded-xl bg-surface-container-low/70 backdrop-blur-md flex flex-col gap-unit-md relative overflow-hidden border border-surface-container-high">
          <div class="flex items-center justify-between">
            <span class="font-mono text-label-mono text-primary-fixed-dim uppercase tracking-wider">Simulated Target HUD</span>
            <span class="font-mono text-badge-mono px-unit-xs py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">LIVE PREVIEW</span>
          </div>
          <div class="w-full h-56 rounded-lg bg-surface-container-lowest flex items-center justify-center relative overflow-hidden shadow-inner border border-surface-variant/30">
            <svg class="absolute inset-0 w-full h-full opacity-20 pointer-events-none" viewBox="0 0 200 200">
              <circle class="text-outline" cx="100" cy="100" fill="none" r="80" stroke="currentColor" stroke-width="0.7"></circle>
              <circle class="text-outline" cx="100" cy="100" fill="none" r="50" stroke="currentColor" stroke-dasharray="3 3" stroke-width="0.5"></circle>
              <line class="text-outline" stroke="currentColor" stroke-width="0.5" x1="100" x2="100" y1="10" y2="190"></line>
              <line class="text-outline" stroke="currentColor" stroke-width="0.5" x1="10" x2="190" y1="100" y2="100"></line>
            </svg>
            <div
              class="rounded-full flex items-center justify-center transition-all duration-75 shadow-[0_0_24px_rgba(0,245,212,0.4)]"
              :style="{
                width: store.settings.targetScale + 'px',
                height: store.settings.targetScale + 'px',
                backgroundColor: store.settings.targetColor,
                boxShadow: `0 0 24px ${store.settings.targetColor}40`,
              }"
            >
              <div class="w-3 h-3 rounded-full bg-[#0A0D14] flex items-center justify-center pointer-events-none">
                <div class="w-1 h-1 rounded-full bg-white"></div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-unit-sm pt-unit-xs">
            <div class="p-unit-sm rounded-lg bg-surface-container-lowest flex flex-col">
              <span class="font-mono text-label-mono text-on-surface-variant uppercase">Target Scale</span>
              <span class="font-display text-headline-sm font-bold text-on-surface">{{ store.settings.targetScale }} px</span>
            </div>
            <div class="p-unit-sm rounded-lg bg-surface-container-lowest flex flex-col">
              <span class="font-mono text-label-mono text-on-surface-variant uppercase">Audio Mode</span>
              <span class="font-display text-body-md font-bold text-primary truncate">1000Hz Tone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
