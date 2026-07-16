import { ref } from 'vue'
import { buildBookingUrl } from '@/data/salon'

// Stato condiviso da tutta l'app: un'unica sorgente di verità su
// se il modale di prenotazione è aperto, per quale servizio (titolo
// di cortesia) e quale URL mostrare (link diretto al servizio se ne
// conosciamo il codice Treatwell, altrimenti il calendario generale).
const isOpen = ref(false)
const serviceLabel = ref<string | null>(null)
const widgetUrl = ref<string>(buildBookingUrl())

export function useBookingModal() {
  /**
   * @param label Nome del servizio, mostrato come titolo del modale.
   * @param menuItemId Codice Treatwell del servizio, per aprire il
   *   calendario già su quel trattamento. Senza, si apre il calendario
   *   generale (il cliente sceglie il servizio lì dentro).
   * @param optionId Codice dell'opzione/variante (es. Liscia/Mossa).
   */
  function open(label?: string, menuItemId?: string, optionId?: string) {
    serviceLabel.value = label ?? null
    widgetUrl.value = buildBookingUrl(menuItemId, optionId)
    isOpen.value = true
  }
  function close() {
    isOpen.value = false
  }

  return { isOpen, serviceLabel, widgetUrl, open, close }
}
