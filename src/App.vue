<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useAppStore } from './stores/app';

// AppProvider (React Context) is replaced by the Pinia store (src/stores/app.ts),
// which is registered globally in main.ts. The two useEffect hooks that lived
// inside AppProvider are reproduced here with onMounted + watch.
const store = useAppStore();

onMounted(() => {
  store.seedHistoryIfEmpty();
  store.applyThemeClass();
});

watch(
  () => store.settings.theme,
  () => store.applyThemeClass(),
);
</script>

<template>
  <router-view />
</template>
