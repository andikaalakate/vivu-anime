import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@views/HomeView.vue')
    },
    {
      path: '/anime/:slug',
      name: 'anime-detail',
      component: () => import('@views/DetailView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@views/NotFoundView.vue')
    },
    {
      path: '/ongoing',
      name: 'ongoing',
      component: () => import('@views/OngoingView.vue')
    },
    {
      path: '/completed',
      name: 'completed',
      component: () => import('@views/CompletedView.vue')
    },
    {
      path: '/episode/:slug',
      name: 'episode',
      component: () => import('@views/EpisodeView.vue')
    }
  ]
})

export default router
