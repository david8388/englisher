import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/dashboard.vue';
import Vocabulary from '../views/vocabulary.vue';
import Review from '../views/review.vue';

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
    },
    {
      path: '/review',
      component: Review
    }
  ]
})

export default router
