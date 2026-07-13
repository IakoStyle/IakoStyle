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

/**
 * Recupera le immagini dalla cartella Google Drive pubblica del salone.
 * Restituisce un array vuoto (mai un errore bloccante) se qualcosa va
 * storto — il chiamante può così ricadere sulla galleria statica.
 */
export function useDriveGallery() {
  const items = ref<MediaItem[]>([])
  const isLoading = ref(true)
  const hasError = ref(false)

  async function load() {
    isLoading.value = true
    hasError.value = false

    try {
      const params = new URLSearchParams({
        q: `'${DRIVE_FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
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

      items.value = (data.files ?? []).map((file) => ({
        type: 'image',
        src: driveImageUrl(file),
        alt: 'Foto Iako Style',
      }))
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
