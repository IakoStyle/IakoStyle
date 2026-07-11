import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  // Hash history: funziona su qualunque hosting statico (es. GitHub Pages)
  // senza bisogno di configurare regole server per le rotte SPA.
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    { path: '/', name: 'home', component: HomeView, meta: { title: 'Home' } },
    {
      path: '/chi-siamo',
      name: 'chi-siamo',
      component: () => import('../views/AboutView.vue'),
      meta: { title: 'Chi Siamo' },
    },
    {
      path: '/listino',
      name: 'listino',
      component: () => import('../views/ListinoView.vue'),
      meta: { title: 'Listino Prezzi' },
    },
    {
      path: '/prodotti',
      name: 'prodotti',
      component: () => import('../views/ProdottiView.vue'),
      meta: { title: 'Prodotti' },
    },
    {
      path: '/contatti',
      name: 'contatti',
      component: () => import('../views/ContattiView.vue'),
      meta: { title: 'Contatti' },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

router.afterEach((to) => {
  const t = to.meta.title as string | undefined
  document.title = t ? `Iako Style · ${t}` : 'Iako Style · Parrucchiere a Fondi (LT)'
})

export default router
