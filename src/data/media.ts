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
import hairBalayage from '@/assets/gallery/hair-balayage.jpg'
import hairRicciRame from '@/assets/gallery/hair-ricci-rame.jpg'
import hairMosso from '@/assets/gallery/hair-mosso.jpg'
import lavoroPiega from '@/assets/gallery/lavoro-piega.jpg'
import saloneIngresso from '@/assets/gallery/salone-ingresso.jpg'
import salonePostazioni from '@/assets/gallery/salone-postazioni.jpg'
import lavoroProdotti from '@/assets/gallery/lavoro-prodotti.jpg'
import promoStiraggio from '@/assets/gallery/promo-stiraggio.jpg'
import promoPermanente from '@/assets/gallery/promo-permanente.jpg'

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
