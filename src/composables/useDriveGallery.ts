import { ref } from 'vue'
import { DRIVE_FOLDER_ID, DRIVE_API_KEY } from '@/data/drive-config'
import type { MediaItem } from '@/data/media'

interface DriveFile {
  id: string
  name: string
  mimeType: string
  createdTime: string
}

interface DriveListResponse {
  files?: DriveFile[]
  error?: { message: string }
}

// Costruisce l'URL diretto per mostrare un'immagine ospitata su Drive,
// passando dall'endpoint ufficiale "alt=media" dell'API v3.
function driveImageUrl(fileId: string): string {
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${DRIVE_API_KEY}`
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
        fields: 'files(id,name,mimeType,createdTime)',
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
        src: driveImageUrl(file.id),
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
