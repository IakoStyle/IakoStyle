import { ref } from 'vue'
import { DRIVE_FOLDER_ID, DRIVE_API_KEY } from '@/data/drive-config'
import type { MediaItem } from '@/data/media'

interface DriveFile {
  id: string
  name: string
  mimeType: string
  createdTime: string
  thumbnailLink?: string
}

interface DriveListResponse {
  files?: DriveFile[]
  error?: { message: string }
}

// Dimensione richiesta per le foto nel carosello: sufficiente per schermi
// anche ad alta densità, ma molto più leggera di una foto originale da
// telefono (che può arrivare a 3000-4000px di lato).
const DISPLAY_SIZE = 1000

// Usa la miniatura generata da Google stesso (CDN veloce, spesso serve
// automaticamente WebP ai browser che lo supportano) invece di scaricare
// il file originale a piena risoluzione tramite l'endpoint "alt=media".
function driveImageUrl(file: DriveFile): string {
  if (file.thumbnailLink) {
    return file.thumbnailLink.replace(/=s\d+$/, `=s${DISPLAY_SIZE}`)
  }
  // Ripiego se Drive non fornisce una thumbnailLink per qualche motivo
  return `https://www.googleapis.com/drive/v3/files/${file.id}?alt=media&key=${DRIVE_API_KEY}`
}

// Prima di sostituire le foto di riserva con quelle di Drive, verifica che
// si carichino davvero nel browser (non basta che l'API le abbia elencate:
// un blocco lato utente — es. estensione anti-tracking sul dominio Google —
// o un link scaduto lascerebbe l'icona di immagine rotta al posto della
// foto). Le foto che non si caricano entro il timeout vengono scartate.
function preloadImage(src: string, timeoutMs = 6000): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image()
    const timer = setTimeout(() => resolve(false), timeoutMs)
    img.onload = () => {
      clearTimeout(timer)
      resolve(true)
    }
    img.onerror = () => {
      clearTimeout(timer)
      resolve(false)
    }
    img.src = src
  })
}

/**
 * Recupera le immagini da una cartella Google Drive pubblica.
 * Restituisce un array vuoto (mai un errore bloccante) se qualcosa va
 * storto — il chiamante può così ricadere sulla galleria statica.
 * Senza un folderId non fa nulla (usata così per i marchi che non
 * hanno ancora una cartella dedicata).
 */
export function useDriveGallery(folderId: string | null = DRIVE_FOLDER_ID) {
  const items = ref<MediaItem[]>([])
  const isLoading = ref(true)
  const hasError = ref(false)

  async function load() {
    if (!folderId) {
      isLoading.value = false
      return
    }

    isLoading.value = true
    hasError.value = false

    try {
      const params = new URLSearchParams({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        key: DRIVE_API_KEY,
        fields: 'files(id,name,mimeType,createdTime,thumbnailLink)',
        orderBy: 'createdTime desc',
        pageSize: '50',
      })

      const res = await fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`)
      const data: DriveListResponse = await res.json()

      if (!res.ok || data.error) {
        throw new Error(data.error?.message || `Richiesta Drive fallita (${res.status})`)
      }

      const candidates = (data.files ?? []).map((file) => ({
        type: 'image' as const,
        src: driveImageUrl(file),
        alt: 'Foto Iako Style',
      }))

      const loadable = await Promise.all(candidates.map((item) => preloadImage(item.src!)))
      items.value = candidates.filter((_, i) => loadable[i])

      if (candidates.length > 0 && items.value.length === 0) {
        throw new Error('Le foto di Drive non si sono caricate nel browser (bloccate o link non validi).')
      }
    } catch (err) {
      console.warn('Galleria Google Drive non disponibile, uso le foto di riserva.', err)
      hasError.value = true
      items.value = []
    } finally {
      isLoading.value = false
    }
  }

  return { items, isLoading, hasError, load }
}
