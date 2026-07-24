import { ref, type Ref } from 'vue'
import { gallery as fallbackGallery, fetchStudioGallery, type MediaItem } from '@/data/media'

// Galleria dello studio "reattiva": parte dalla lista statica di fallback e,
// una volta sola, prova a sostituirla con l'elenco live scaricato da
// Cloudinary. Così, quando su Cloudinary aggiungi una foto (con il tag
// "iako-studio"), compare automaticamente nel carosello — senza toccare il
// codice né rifare il deploy.
//
// Il risultato è messo in cache a livello di modulo: la richiesta a Cloudinary
// parte una sola volta anche se il carosello è montato in più pagine.

let cached: Ref<MediaItem[]> | null = null

export function useStudioGallery(): Ref<MediaItem[]> {
  if (cached) return cached

  const items = ref<MediaItem[]>(fallbackGallery)
  cached = items

  fetchStudioGallery()
    .then((live) => {
      if (live && live.length) items.value = live
    })
    .catch(() => {
      /* si resta sul fallback statico */
    })

  return items
}
