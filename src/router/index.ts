import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/Layout.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', name: 'dashboard', component: () => import('../pages/Dashboard.vue') },
        { path: 'arena', name: 'arena', component: () => import('../pages/Arena.vue') },
        { path: 'analytics', name: 'analytics', component: () => import('../pages/Analytics.vue') },
        { path: 'settings', name: 'settings', component: () => import('../pages/Settings.vue') },
      ],
    },
  ],
});

export default router;
