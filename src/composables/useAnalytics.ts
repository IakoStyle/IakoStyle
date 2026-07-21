import { GA_MEASUREMENT_ID } from '@/data/analytics-config'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: (...args: unknown[]) => void
  }
}

let isLoaded = false

/**
 * Inserisce lo script di Google Analytics nella pagina e lo inizializza.
 * Il consenso è gestito da Iubenda (vedi index.html), che blocca lo
 * script finché chi visita non accetta: qui lo si carica sempre.
 */
export function loadAnalytics() {
  if (isLoaded || !GA_MEASUREMENT_ID) return
  isLoaded = true

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args)
  }
  window.gtag('js', new Date())
  // send_page_view disattivato qui: la prima pagina e i cambi rotta
  // successivi vengono tracciati esplicitamente da trackPageView(),
  // per gestire correttamente la navigazione della SPA.
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: false })

  // Traccia subito la pagina su cui l'utente si trovava quando ha dato
  // il consenso (altrimenti la prima visualizzazione andrebbe persa).
  trackPageView(window.location.pathname, document.title)
}

/** Registra una visualizzazione di pagina. Nessun effetto se GA non è attivo. */
export function trackPageView(path: string, title?: string) {
  if (!isLoaded || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
  })
}

export function isAnalyticsLoaded() {
  return isLoaded
}
