import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/todo/:slug',
      name: 'todo',
      component: () => import('../views/TodoView.vue'),
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('../views/AddView.vue')
    }
  ],
})

export default router
