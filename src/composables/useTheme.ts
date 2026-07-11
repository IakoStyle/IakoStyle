import { ref } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'iako-theme'

// Stato iniziale placeholder: viene corretto in modo sincrono da initTheme(),
// chiamata esplicitamente in main.ts prima del mount. Non ci affidiamo più
// all'ordine di esecuzione degli import (che non è garantito rispetto al
// codice in main.ts) per leggere lo stato reale del DOM.
const isDark = ref<boolean>(false)

function applyToDom(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  isDark.value = theme === 'dark'
}

/**
 * Da chiamare una sola volta, il prima possibile in main.ts, prima di
 * montare l'app: legge la preferenza salvata (o quella di sistema) e
 * allinea sia il DOM che lo stato reattivo, evitando disallineamenti tra
 * l'icona mostrata e il tema effettivamente applicato.
 */
function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const theme: Theme = saved === 'dark' || saved === 'light' ? saved : prefersDark ? 'dark' : 'light'
  applyToDom(theme)
}

export function useTheme() {
  function apply(theme: Theme) {
    applyToDom(theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }

  function toggle() {
    apply(isDark.value ? 'light' : 'dark')
  }

  return { isDark, toggle, initTheme }
}
