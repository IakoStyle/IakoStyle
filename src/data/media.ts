// ============================================================
//  GALLERIA FOTO / VIDEO — Iako Style
//  ------------------------------------------------------------
//  Le foto dello studio sono servite da Cloudinary (CDN) quando la
//  variabile d'ambiente VITE_CLOUDINARY_CLOUD_NAME è impostata; in caso
//  contrario si usa il fallback locale in public/studio/ (così il sito
//  non si rompe finché Cloudinary non è configurato).
//
//  SETUP CLOUDINARY (una volta sola):
//  1. Crea un account gratuito su cloudinary.com
//  2. Carica le foto dentro una cartella chiamata "iako-style/studio"
//     TENENDO GLI STESSI NOMI FILE (IMG_9226, IMG_0754, ...). In fase di
//     upload attiva "Use filename as public ID" (o rinomina il public ID
//     al nome del file senza estensione).
//  3. Metti il tuo "Cloud name" (lo trovi nella dashboard) nella variabile
//     VITE_CLOUDINARY_CLOUD_NAME — nel file .env in locale e nelle env del
//     tuo hosting per la produzione. Vedi .env.example.
//
//  Per aggiungere altri media:
//  - Carica il file su Cloudinary in "iako-style/studio" e aggiungi un
//    oggetto all'array "gallery" con src: studioImg('nome-file').
//
//  Per i VIDEO: { type: 'video', src: video, poster: immaginePoster }
// ============================================================

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined
const CLOUDINARY_FOLDER = 'iako-style/studio'

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
  { type: 'image', src: '/ritual/primadopo.webp', alt: 'Iako Ritual, risultato prima e dopo' },
]
