import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/dashboard.vue';

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Dashboard
    }
  ]
})

export default router
