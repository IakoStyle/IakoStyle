import { ref } from 'vue'

// Stato condiviso da tutta l'app: un'unica sorgente di verità su
// se il modale di prenotazione è aperto, e per quale servizio
// (mostrato solo come titolo di cortesia — il widget Treatwell non
// supporta ancora la pre-selezione automatica del trattamento).
const isOpen = ref(false)
const serviceLabel = ref<string | null>(null)

export function useBookingModal() {
  function open(label?: string) {
    serviceLabel.value = label ?? null
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
  }

  return { isOpen, serviceLabel, open, close }
}
