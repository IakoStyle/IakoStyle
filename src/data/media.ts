// ============================================================
//  GALLERIA FOTO / VIDEO — Iako Style
//  ------------------------------------------------------------
//  Per aggiungere altri media:
//  1. Metti il file dentro  public/studio/
//  2. Aggiungi un oggetto all'array "gallery" qui sotto con src: '/studio/file.jpg'
//
//  Per i VIDEO: { type: 'video', src: video, poster: immaginePoster }
// ============================================================

const salone1 = '/studio/salone-1.jpg'
const salone2 = '/studio/salone-2.jpg'
const reception = '/studio/reception.png'
const capelli = '/studio/capelli.jpg'
const riccio = '/studio/riccio.jpg'
const primaDopo = '/studio/prima-dopo.jpg'
const rinascita = '/studio/rinascita.jpg'
const ricostruzione = '/studio/ricostruzione.jpg'
const tricologia = '/studio/tricologia.jpg'
const hairBalayage = '/studio/hair-balayage.jpg'
const hairRicciRame = '/studio/hair-ricci-rame.jpg'
const hairMosso = '/studio/hair-mosso.jpg'
const lavoroPiega = '/studio/lavoro-piega.jpg'
const saloneIngresso = '/studio/salone-ingresso.jpg'
const salonePostazioni = '/studio/salone-postazioni.jpg'
const lavoroProdotti = '/studio/lavoro-prodotti.jpg'
const promoStiraggio = '/studio/promo-stiraggio.jpg'
const promoPermanente = '/studio/promo-permanente.jpg'

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

// Galleria di Iako Ritual: solo segnaposto "in arrivo" più qualche foto
// reale caricata a mano (vedi TODO.md).
export const ritualGallery: MediaItem[] = [
  { type: 'image', src: '/ritual/trattamentoRitual.jpeg', alt: 'Trattamento Iako Ritual, risultati prima e dopo' },
  { type: 'image', placeholder: true, tint: 'mint', caption: 'Cura e benessere' },
  { type: 'image', placeholder: true, tint: 'gold', caption: 'L\'ambiente' },
  { type: 'image', placeholder: true, tint: 'mint', caption: 'I dettagli' },
]
