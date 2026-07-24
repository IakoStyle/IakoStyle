// Il sito usa sempre il tema scuro ("Notte"), tranne nella home di
// scelta del mondo ("/") e nella pagina Contatti raggiungibile da lì:
// restano in tema chiaro, nessuna scelta per chi visita, nessuna
// preferenza salvata o di sistema da leggere.
export function applyThemeForPath(path: string) {
  const isLight = path === '/' || path === '/contatti'
  document.documentElement.classList.toggle('dark', !isLight)
}

// Mantenuto per compatibilità: applica il tema in base al percorso
// corrente al primo caricamento, così non c'è alcun flash del tema
// sbagliato prima del mount.
export function initTheme() {
  applyThemeForPath(window.location.pathname)
}
