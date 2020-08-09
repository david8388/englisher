import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/dashboard.vue';
import Vocabulary from '../views/vocabulary.vue';

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Dashboard
    },
    {
      path: '/vocabulary',
      component: Vocabulary
    }
  ]
})

export default router
