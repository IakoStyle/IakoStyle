// ============================================================
//  GALLERIA FOTO / VIDEO — Iako Style
//  ------------------------------------------------------------
//  Le foto dello studio sono servite da Cloudinary (CDN) quando la
//  variabile d'ambiente VITE_CLOUDINARY_CLOUD_NAME è impostata; in caso
//  contrario si usa il fallback locale in public/studio/ (così il sito
//  non si rompe finché Cloudinary non è configurato).
//
//  SETUP CLOUDINARY (una volta sola) — vedi anche CLOUDINARY.md:
//  1. Crea un account gratuito su cloudinary.com
//  2. Settings → Security: togli "Resource list" dai tipi limitati
//     (serve per far leggere al sito l'elenco delle foto).
//  3. Crea un "Upload preset" che applichi in automatico il tag "iako-studio"
//     a ogni foto caricata (così non devi taggarle a mano).
//  4. Metti il tuo "Cloud name" (dashboard) nella variabile
//     VITE_CLOUDINARY_CLOUD_NAME — nel file .env in locale e nelle env del
//     tuo hosting per la produzione. Vedi .env.example.
//
//  AGGIUNGERE FOTO (l'uso di tutti i giorni):
//  - Carica la foto su Cloudinary con il tag "iako-studio" (se usi l'upload
//    preset del punto 3, il tag viene messo da solo). Compare nel carosello
//    entro pochi minuti, SENZA modificare il codice né rifare il deploy.
//
//  L'array "gallery" qui sotto resta solo come fallback (se Cloudinary non
//  è configurato o irraggiungibile).
//
//  Per i VIDEO: { type: 'video', src: video, poster: immaginePoster }
// ============================================================

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined
const CLOUDINARY_FOLDER = 'iako-style/studio'
// Tag applicato alle foto dello studio su Cloudinary. Il carosello scarica
// automaticamente TUTTE le foto con questo tag: basta caricarne una nuova
// (con il tag) e compare da sola sul sito, senza toccare il codice.
const CLOUDINARY_TAG = 'iako-studio'

// Costruisce l'URL di una foto dello studio. Se Cloudinary è configurato
// serve dal CDN con ottimizzazione automatica (f_auto = miglior formato
// WebP/AVIF, q_auto = qualità automatica); altrimenti resta sul file locale.
function studioImg(name: string, localExt = 'webp'): string {
  if (CLOUDINARY_CLOUD_NAME) {
    return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${CLOUDINARY_FOLDER}/${name}`
  }
  return `/studio/${name}.${localExt}`
}

const balayageInsegna = studioImg('IMG_9226')
const rameNaturale = studioImg('IMG_0754')
const acconciaturaSposa = studioImg('IMG_8884')
const rossoCiliegia = studioImg('IMG_2981')
const balayageMosso = studioImg('IMG_0884')
const bobOndulato = studioImg('IMG_4106')
const ramatoLucente = studioImg('IMG_2984')
const ondeCastane = studioImg('IMG_3124')
const raccoltoCerimonia = studioImg('IMG_8624')
const riflessiRossi = studioImg('IMG_5314')
const ondeBionde = studioImg('IMG_9220')
const ramatoOndulato = studioImg('IMG_1664')
const castanoCaramello = studioImg('IMG_5753')
const acconciaturaBimba = studioImg('IMG_1907')
const biondoFreddo = studioImg('IMG_6221')
const piegaMorbida = studioImg('IMG_5756')

export interface MediaItem {
  type: 'image' | 'video'
  src?: string
  poster?: string
  alt?: string
  caption?: string
  placeholder?: boolean
  tint?: 'mint' | 'sky' | 'gold'
}

// Forma (parziale) della risposta di Cloudinary all'endpoint "resource list".
interface CloudinaryResource {
  public_id: string
  format?: string
  created_at?: string
}

// Scarica da Cloudinary l'elenco di tutte le foto taggate CLOUDINARY_TAG e le
// trasforma in MediaItem pronti per il carosello. Restituisce null se
// Cloudinary non è configurato o se la richiesta fallisce: in quel caso il
// carosello usa la galleria statica di fallback qui sopra.
//
// NB: perché funzioni, su Cloudinary va abilitata la "Resource list"
// (Settings → Security → togli la spunta a "Resource list" tra i tipi
// limitati) e ogni foto deve avere il tag "iako-studio".
export async function fetchStudioGallery(): Promise<MediaItem[] | null> {
  if (!CLOUDINARY_CLOUD_NAME) return null
  try {
    const url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/list/${CLOUDINARY_TAG}.json`
    const res = await fetch(url)
    if (!res.ok) return null
    const data = (await res.json()) as { resources?: CloudinaryResource[] }
    const resources = data.resources ?? []
    if (resources.length === 0) return null
    return resources.map((r) => ({
      type: 'image' as const,
      src: `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/f_auto,q_auto/${r.public_id}`,
      alt: 'Foto Iako Style',
    }))
  } catch {
    return null
  }
}

export const gallery: MediaItem[] = [
  { type: 'image', src: balayageInsegna, alt: 'Balayage biondo con onde morbide' },
  { type: 'image', src: rameNaturale, alt: 'Colore rame naturale con onde morbide' },
  { type: 'image', src: acconciaturaSposa, alt: 'Acconciatura sposa realizzata in salone' },
  { type: 'image', src: rossoCiliegia, alt: 'Colore rosso ciliegia su capelli lunghi lisci' },
  { type: 'image', src: balayageMosso, alt: 'Balayage biondo con piega mossa' },
  { type: 'image', src: bobOndulato, alt: 'Taglio bob corto ondulato con balayage caramello' },
  { type: 'image', src: ramatoLucente, alt: 'Colore ramato lucente con onde' },
  { type: 'image', src: ondeCastane, alt: 'Capelli castani con onde morbide' },
  { type: 'image', src: raccoltoCerimonia, alt: 'Raccolto da cerimonia con fermaglio gioiello' },
  { type: 'image', src: riflessiRossi, alt: 'Riflessi rossi su capelli mossi' },
  { type: 'image', src: ondeBionde, alt: 'Onde bionde luminose davanti al salone' },
  { type: 'image', src: ramatoOndulato, alt: 'Colore ramato con lunghezze ondulate' },
  { type: 'image', src: castanoCaramello, alt: 'Balayage castano caramello su onde morbide' },
  { type: 'image', src: acconciaturaBimba, alt: 'Acconciatura da cerimonia con fiori tra i capelli' },
  { type: 'image', src: biondoFreddo, alt: 'Colore biondo freddo con piega liscia' },
  { type: 'image', src: piegaMorbida, alt: 'Piega morbida su capelli castano ramato' },
]

// Galleria di Iako Ritual: foto reali caricate a mano (vedi TODO.md).
export const ritualGallery: MediaItem[] = [
  { type: 'image', src: '/ritual/volantino.webp', alt: 'Volantino Iako Ritual' },
  { type: 'image', src: '/ritual/trattamentoRitual.png', alt: 'Trattamento Iako Ritual, risultati prima e dopo' },
]
