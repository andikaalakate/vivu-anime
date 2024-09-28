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
      path: '/anime',
      name: 'anime-list',
      component: () => import('@views/AnimeListView.vue')
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
    },
    {
      path: '/search',
      name: 'search',
      component: () => import('@views/SearchView.vue')
    },
    {
      path: '/genre/:slug',
      name: 'genre',
      component: () => import('@views/GenreView.vue')
    }
  ]
})

export default router
