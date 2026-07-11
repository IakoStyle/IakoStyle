import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const SITE_URL = 'https://iakostyle.it'
const DEFAULT_DESCRIPTION =
  'Iako Style — salone di parrucchieri per uomo, donna e bambino a Fondi (LT). Taglio, colore, barba, trattamenti e consulenze su misura. Prenota ora.'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home',
        description: DEFAULT_DESCRIPTION,
      },
    },
    {
      path: '/chi-siamo',
      name: 'chi-siamo',
      component: () => import('../views/AboutView.vue'),
      meta: {
        title: 'Chi Siamo',
        description:
          "Scopri Iako Style: il salone di Matteo Iacovello a Fondi (LT), l'esperienza del team e i punti di forza del nostro servizio di parrucchieria.",
      },
    },
    {
      path: '/listino',
      name: 'listino',
      component: () => import('../views/ListinoView.vue'),
      meta: {
        title: 'Listino Prezzi',
        description:
          'Listino prezzi Iako Style: taglio, colore, barba, trattamenti e consulenze. Scopri tutti i servizi disponibili e i relativi prezzi.',
      },
    },
    {
      path: '/prodotti',
      name: 'prodotti',
      component: () => import('../views/ProdottiView.vue'),
      meta: {
        title: 'Prodotti',
        description:
          'Le marche professionali usate da Iako Style: Insight, Proraso, ghd, Goldwell, Redken e Nubea per la cura di capelli e cute.',
      },
    },
    {
      path: '/contatti',
      name: 'contatti',
      component: () => import('../views/ContattiView.vue'),
      meta: {
        title: 'Contatti',
        description:
          'Contatta Iako Style: indirizzo, mappa, orari di apertura e social. Via Vincenzo Gioberti 60, Fondi (LT).',
      },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
})

// Imposta o aggiorna un tag <meta> individuato per attributo (name o property).
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

router.afterEach((to) => {
  const pageTitle = to.meta.title as string | undefined
  const fullTitle = pageTitle ? `Iako Style · ${pageTitle}` : 'Iako Style · Parrucchiere a Fondi (LT)'
  const description = (to.meta.description as string | undefined) ?? DEFAULT_DESCRIPTION
  const canonicalUrl = `${SITE_URL}${to.path === '/' ? '/' : to.path}`

  document.title = fullTitle

  setMeta('name', 'description', description)
  setMeta('property', 'og:title', fullTitle)
  setMeta('property', 'og:description', description)
  setMeta('property', 'og:url', canonicalUrl)
  setMeta('name', 'twitter:title', fullTitle)
  setMeta('name', 'twitter:description', description)

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canonical) {
    canonical = document.createElement('link')
    canonical.setAttribute('rel', 'canonical')
    document.head.appendChild(canonical)
  }
  canonical.setAttribute('href', canonicalUrl)
})

export default router
