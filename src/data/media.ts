// ============================================================
//  GALLERIA FOTO / VIDEO — Iako Style
//  ------------------------------------------------------------
//  Per aggiungere altri media:
//  1. Metti il file dentro  src/assets/gallery/
//  2. Importalo in cima a questo file (import nome from '@/assets/gallery/file.jpg')
//  3. Aggiungi un oggetto all'array "gallery" qui sotto.
//
//  Per i VIDEO: { type: 'video', src: video, poster: immaginePoster }
// ============================================================

import salone1 from '@/assets/gallery/salone-1.jpg'
import salone2 from '@/assets/gallery/salone-2.jpg'
import reception from '@/assets/gallery/reception.png'
import capelli from '@/assets/gallery/capelli.jpg'
import riccio from '@/assets/gallery/riccio.jpg'
import primaDopo from '@/assets/gallery/prima-dopo.jpg'
import rinascita from '@/assets/gallery/rinascita.jpg'
import ricostruzione from '@/assets/gallery/ricostruzione.jpg'
import tricologia from '@/assets/gallery/tricologia.jpg'

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
  { type: 'image', src: reception, alt: 'Reception Iako Style', caption: 'La nostra reception' },
  { type: 'image', src: capelli, alt: 'Colore e piega', caption: 'Colore & luce' },
  { type: 'image', src: salone2, alt: 'Sala tagli Iako Style', caption: 'La sala principale' },
  { type: 'image', src: riccio, alt: 'Taglio riccio con volume', caption: 'Texture & volume' },
  { type: 'image', src: salone1, alt: 'Area lavaggio e prodotti', caption: 'Ambiente del salone' },
  { type: 'image', src: primaDopo, alt: 'Prima e dopo trattamento capelli', caption: 'Prima & dopo' },
  { type: 'image', src: rinascita, alt: 'Trattamento capelli morbidezza e vitalità', caption: 'Morbidezza & Vitalità' },
  { type: 'image', src: ricostruzione, alt: 'Trattamento di ricostruzione', caption: 'Ricostruzione & luminosità' },
  { type: 'image', src: tricologia, alt: 'Consulenza tricologica gratuita', caption: 'Consulenza tricologica' },
]
