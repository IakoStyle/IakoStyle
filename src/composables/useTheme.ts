// Il sito usa sempre il tema scuro ("Notte"), tranne nella home di
// scelta del mondo ("/"), che resta in tema chiaro: nessuna scelta
// per chi visita, nessuna preferenza salvata o di sistema da leggere.
export function applyThemeForPath(path: string) {
  const isLanding = path === '/'
  document.documentElement.classList.toggle('dark', !isLanding)
}

// Mantenuto per compatibilità: applica il tema in base al percorso
// corrente al primo caricamento, così non c'è alcun flash del tema
// sbagliato prima del mount.
export function initTheme() {
  applyThemeForPath(window.location.pathname)
}
