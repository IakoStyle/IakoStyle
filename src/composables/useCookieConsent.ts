import { ref, watch } from 'vue'
import { loadAnalytics } from './useAnalytics'

const STORAGE_KEY = 'iako-cookie-consent'

export type ConsentValue = 'accepted' | 'rejected' | null

// Stato condiviso da tutta l'app: un'unica sorgente di verità sul
// consenso, letta/scritta da chiunque importi questo composable.
const optional = ref<ConsentValue>(readStored())

function readStored(): ConsentValue {
  if (typeof window === 'undefined') return null
  const saved = window.localStorage.getItem(STORAGE_KEY)
  return saved === 'accepted' || saved === 'rejected' ? saved : null
}

watch(
  optional,
  (value) => {
    if (typeof window === 'undefined') return
    if (value === null) {
      window.localStorage.removeItem(STORAGE_KEY)
    } else {
      window.localStorage.setItem(STORAGE_KEY, value)
    }
    // Si attiva SOLO in caso di consenso esplicito — anche per chi lo
    // aveva già dato in una visita precedente (immediate: true sotto).
    if (value === 'accepted') {
      loadAnalytics()
    }
  },
  { immediate: true },
)

export function useCookieConsent() {
  function acceptAll() {
    optional.value = 'accepted'
  }
  function rejectOptional() {
    optional.value = 'rejected'
  }
  // Riapre la scelta (usata dal link "Preferenze cookie" nel footer)
  function reset() {
    optional.value = null
  }

  return { optional, acceptAll, rejectOptional, reset }
}
