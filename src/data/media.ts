// ============================================================
//  GALLERIA FOTO / VIDEO — Iako Style
//  ------------------------------------------------------------
//  Per aggiungere altri media:
//  1. Metti il file dentro  src/assets/gallery/
//  2. Importalo in cima a questo file (import nome from '@/assets/gallery/file.webp')
//  3. Aggiungi un oggetto all'array "gallery" qui sotto.
//
//  Per i VIDEO: { type: 'video', src: video, poster: immaginePoster }
// ============================================================

import salone1 from '@/assets/gallery/salone-1.webp'
import salone2 from '@/assets/gallery/salone-2.webp'
import reception from '@/assets/gallery/reception.webp'
import capelli from '@/assets/gallery/capelli.webp'
import riccio from '@/assets/gallery/riccio.webp'
import primaDopo from '@/assets/gallery/prima-dopo.webp'
import rinascita from '@/assets/gallery/rinascita.webp'
import ricostruzione from '@/assets/gallery/ricostruzione.webp'
import tricologia from '@/assets/gallery/tricologia.webp'
import hairBalayage from '@/assets/gallery/hair-balayage.webp'
import hairRicciRame from '@/assets/gallery/hair-ricci-rame.webp'
import hairMosso from '@/assets/gallery/hair-mosso.webp'
import lavoroPiega from '@/assets/gallery/lavoro-piega.webp'
import saloneIngresso from '@/assets/gallery/salone-ingresso.webp'
import salonePostazioni from '@/assets/gallery/salone-postazioni.webp'
import lavoroProdotti from '@/assets/gallery/lavoro-prodotti.webp'
import promoStiraggio from '@/assets/gallery/promo-stiraggio.webp'
import promoPermanente from '@/assets/gallery/promo-permanente.webp'

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
  { type: 'image', src: hairRicciRame, alt: 'Ricci definiti con riflessi ramati', caption: 'Ricci definiti' },
  { type: 'image', src: lavoroPiega, alt: 'Piega professionale allo styling', caption: 'Piega professionale' },
  { type: 'image', src: capelli, alt: 'Colore e piega', caption: 'Colore & luce' },
  { type: 'image', src: promoPermanente, alt: 'Permanente con onde e volume', caption: 'La permanente' },
  { type: 'image', src: salone2, alt: 'Sala tagli Iako Style', caption: 'La sala principale' },
  { type: 'image', src: hairBalayage, alt: 'Balayage su base scura', caption: 'Balayage su base scura' },
  { type: 'image', src: riccio, alt: 'Taglio riccio con volume', caption: 'Texture & volume' },
  { type: 'image', src: saloneIngresso, alt: 'Ingresso del salone Iako Style', caption: "L'ingresso del salone" },
  { type: 'image', src: primaDopo, alt: 'Prima e dopo trattamento capelli', caption: 'Prima & dopo' },
  { type: 'image', src: promoStiraggio, alt: 'Trattamento stiraggio, capelli lisci e lucenti', caption: 'Lo stiraggio' },
  { type: 'image', src: salone1, alt: 'Area lavaggio e prodotti', caption: 'Ambiente del salone' },
  { type: 'image', src: hairMosso, alt: 'Taglio mosso a strati', caption: 'Mosso e movimento' },
  { type: 'image', src: rinascita, alt: 'Trattamento capelli morbidezza e vitalità', caption: 'Morbidezza & Vitalità' },
  { type: 'image', src: lavoroProdotti, alt: 'Prodotti Nubea in salone', caption: 'Cura in vetrina' },
  { type: 'image', src: ricostruzione, alt: 'Trattamento di ricostruzione', caption: 'Ricostruzione & luminosità' },
  { type: 'image', src: salonePostazioni, alt: 'Postazioni taglio con specchi', caption: 'Postazioni taglio' },
  { type: 'image', src: tricologia, alt: 'Consulenza tricologica gratuita', caption: 'Consulenza tricologica' },
]

// Galleria di Iako Ritual: nessuna cartella Drive dedicata ancora
// collegata (vedi TODO.md), quindi per ora solo segnaposto "in arrivo".
export const ritualGallery: MediaItem[] = [
  { type: 'image', placeholder: true, tint: 'gold', caption: 'Il rituale' },
  { type: 'image', placeholder: true, tint: 'mint', caption: 'Cura e benessere' },
  { type: 'image', placeholder: true, tint: 'gold', caption: 'L\'ambiente' },
  { type: 'image', placeholder: true, tint: 'mint', caption: 'I dettagli' },
]
