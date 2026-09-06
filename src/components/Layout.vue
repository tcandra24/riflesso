<script setup lang="ts">
import { Moon, Sun, User } from 'lucide-vue-next';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { cn } from '../lib/utils';
import { useAppStore } from '../stores/app';

const route = useRoute();
const store = useAppStore();

function toggleTheme() {
  store.updateSettings({ theme: store.settings.theme === 'dark' ? 'light' : 'dark' });
}

const navItems = [
  { name: 'Dashboard', path: '/' },
  { name: 'Arena', path: '/arena' },
  { name: 'Analytics', path: '/analytics' },
  { name: 'Settings', path: '/settings' },
];

const isActive = (path: string) => computed(() => route.path === path);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="fixed top-0 left-0 right-0 w-full z-50 bg-surface-container-lowest/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.25)]">
      <div class="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-unit-md">
        <div class="flex items-center gap-unit-lg">
          <router-link to="/arena" class="flex items-center gap-unit-xs group">
            <div class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
              <div class="w-4 h-4 bg-primary rounded-sm rotate-45"></div>
            </div>
            <div class="flex items-center gap-unit-2xs">
              <span class="font-display text-headline-sm font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors">RIFLESSO</span>
              <span class="font-mono text-badge-mono uppercase bg-surface-container-high text-primary px-unit-xs py-0.5 rounded-full ring-1 ring-primary-container/30">PRO</span>
            </div>
          </router-link>
          <nav class="hidden lg:flex items-center gap-unit-2xs bg-surface-container-low/70 p-unit-2xs rounded-full ring-1 ring-outline-variant/30">
            <router-link
              v-for="item in navItems"
              :key="item.name"
              :to="item.path"
              :class="cn(
                'font-sans text-body-sm px-unit-sm py-1 rounded-full transition-all',
                isActive(item.path).value
                  ? 'bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(0,245,212,0.3)]'
                  : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
              )"
            >
              {{ item.name }}
            </router-link>
          </nav>
        </div>
        <div class="flex items-center gap-unit-sm">
          <div class="hidden sm:flex items-center gap-unit-xs px-unit-sm py-1 rounded-full bg-surface-container-high ring-1 ring-tertiary-container/30">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-container opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-tertiary-container"></span>
            </span>
            <span class="font-mono text-label-mono text-on-surface-variant uppercase">Avg:</span>
            <span class="font-mono text-body-sm font-bold text-tertiary">182ms</span>
          </div>
          <button
            aria-label="Toggle color mode"
            class="p-1.5 rounded-full bg-surface-container-high text-on-surface-variant hover:text-primary hover:bg-surface-container-highest transition-all ring-1 ring-outline-variant/40"
            type="button"
            @click="toggleTheme"
          >
            <Sun v-if="store.settings.theme === 'dark'" :size="18" />
            <Moon v-else :size="18" />
          </button>
          <div class="flex items-center pl-unit-2xs">
            <button class="flex items-center justify-center w-8 h-8 bg-surface-container-high text-on-surface-variant gap-unit-2xs rounded-full ring-2 ring-primary-container/20 hover:ring-primary-container transition-all" type="button">
              <User :size="18" />
            </button>
          </div>
        </div>
      </div>
    </header>

    <main class="w-full pt-16 max-w-7xl mx-auto px-gutter min-h-[calc(100vh-4rem)] flex flex-col">
      <router-view />
    </main>

    <footer class="w-full bg-surface-container-lowest/90 border-t border-outline-variant/20 mt-auto">
      <div class="max-w-7xl mx-auto px-gutter py-unit-lg flex flex-col sm:flex-row items-center justify-between gap-unit-md text-on-surface-variant font-sans text-body-sm">
        <div>© 2026 Riflesso Precision Benchmark. Low-latency engine calibrated.</div>
        <div class="flex items-center gap-unit-lg font-mono text-label-mono">
          <span class="text-primary-fixed-dim">POLLING: 1000Hz</span>
          <span class="text-outline">|</span>
          <span>ENGINE v2.4.0</span>
        </div>
      </div>
    </footer>
  </div>
</template>
