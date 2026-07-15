import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { trackPageView } from '@/composables/useAnalytics'
import { applyBrandToDom, currentBrandFromPath } from '@/composables/useBrand'

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
    {
      path: '/ritual',
      name: 'ritual',
      component: () => import('../views/RitualHomeView.vue'),
      meta: {
        title: 'Iako Ritual · Head Spa Experience',
        description:
          'Iako Ritual — Head Spa Experience a Fondi (LT). Un rituale di benessere per cute e capelli: massaggio, trattamenti e profumi naturali.',
      },
    },
    {
      path: '/ritual/listino',
      name: 'ritual-listino',
      component: () => import('../views/RitualListinoView.vue'),
      meta: {
        title: 'Listino · Iako Ritual',
        description: 'I rituali stagionali di Iako Ritual: Rituale Origine e Rituale Rinascita, prezzi e durata.',
      },
    },
    {
      path: '/ritual/prodotti',
      name: 'ritual-prodotti',
      component: () => import('../views/RitualProdottiView.vue'),
      meta: {
        title: 'Prodotti · Iako Ritual',
        description: 'Nubea Sursum: il trattamento coadiuvante anticaduta usato da Iako Ritual.',
      },
    },
    {
      // Stessa pagina di /contatti (stesso salone, stesso indirizzo):
      // qui serve solo perché l'URL inizia con /ritual, così la palette
      // e i colori restano quelli di Iako Ritual invece di tornare a Style.
      path: '/ritual/contatti',
      name: 'ritual-contatti',
      component: () => import('../views/ContattiView.vue'),
      meta: {
        title: 'Contatti · Iako Ritual',
        description:
          'Contatta Iako Ritual: indirizzo, mappa, orari di apertura e social. Via Vincenzo Gioberti 60, Fondi (LT).',
      },
    },
    {
      path: '/with-you',
      name: 'with-you',
      component: () => import('../views/WithYouHomeView.vue'),
      meta: {
        title: 'Everywhere With You · Iako Ritual',
        description:
          "Everywhere With You: la collezione di prodotti firmata Iako Ritual. Collection N. 1, Summer 2026.",
      },
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: () => import('../views/PrivacyView.vue'),
      meta: {
        title: 'Privacy Policy',
        description: 'Informativa sulla privacy e sui cookie del sito Iako Style.',
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
  const brandId = currentBrandFromPath(to.path)

  // Il titolo deve riflettere il marchio della pagina: senza questo,
  // una pagina di Ritual/With You si annuncerebbe come "Iako Style · ..."
  // sia nella scheda del browser sia nei risultati di ricerca.
  const fullTitle =
    brandId === 'style'
      ? pageTitle
        ? `Iako Style · ${pageTitle}`
        : 'Iako Style · Parrucchiere a Fondi (LT)'
      : (pageTitle ?? (brandId === 'ritual' ? 'Iako Ritual · Head Spa Experience' : 'Everywhere With You · Iako Ritual'))

  // La palette del marchio va applicata ad ogni cambio rotta, non solo
  // al primo caricamento (lo switch tra i marchi è una navigazione).
  applyBrandToDom(brandId)
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

  trackPageView(to.path, fullTitle)
})

export default router
