// ============================================================
//  DATI DEL SALONE — Iako Style
//  Unica fonte di verità: modifica qui testi, prezzi, orari…
// ============================================================

export const salon = {
  name: 'Iako Style',
  tagline: 'Parrucchiere uomo · donna · bambino a Fondi',
  city: 'Fondi (LT)',
  address: 'Via Vincenzo Gioberti, 60, 04022 Fondi LT, Italia',
  mapsQuery: 'Iako Style, Via Vincenzo Gioberti 60, Fondi LT',
  rating: 5.0,
  reviewsCount: 116,
  bookingUrl: 'https://www.treatwell.it/salone/iako-style/',
  // Widget incorporabile: apre il calendario di prenotazione dentro il
  // sito stesso (in un riquadro), invece di rimandare a una scheda esterna.
  bookingWidgetUrl: 'https://widget.treatwell.it/salone/100038957/menu/',
  treatwellVenueId: '100038957',
  reviewsUrl: 'https://www.treatwell.it/salone/iako-style/reviews/pagina-2/',
  googleMapsReviewUrl: 'https://search.google.com/local/writereview?placeid=ChIJ23eMeNAxJRMRcyEm8Hzuy3c',
  whatsappNumber: '3200155148',
  whatsappDisplay: '320 015 5148',
  owner: 'Matteo Iacovello',
  vatNumber: '03209300593',
  seasonLabel: 'Orario estivo 2026',
}

// Costruisce il link diretto al calendario di disponibilità Treatwell
// per un servizio specifico (data odierna, servizio già selezionato).
// Senza menuItemId, ripiega sul link generale del listino — così un
// servizio senza ancora il proprio codice continua a funzionare
// normalmente, solo senza il salto automatico.
export function buildBookingUrl(menuItemId?: string, optionId?: string): string {
  if (!menuItemId) return salon.bookingWidgetUrl

  const proposedServices = [
    {
      menuItemId,
      ...(optionId ? { optionIds: [optionId] } : {}),
    },
  ]

  const today = new Date().toISOString().slice(0, 10)
  const params = new URLSearchParams({
    venueId: salon.treatwellVenueId,
    proposedServices: JSON.stringify(proposedServices),
    date: today,
  })

  return `https://widget.treatwell.it/availability?${params.toString()}`
}

export const socials = [
  { label: 'Instagram', icon: ['fab', 'instagram'] as const, url: 'https://www.instagram.com/iako_style/' },
  { label: 'Facebook', icon: ['fab', 'facebook'] as const, url: 'https://www.facebook.com/profile.php?id=100088386002002&locale=it_IT' },
  { label: 'WhatsApp', icon: ['fab', 'whatsapp'] as const, url: 'https://wa.me/393200155148' },
]

export interface OpeningDay {
  day: string
  hours: string
  closed?: boolean
}

// Orario estivo 2026 (da locandina del salone)
export const openingHours: OpeningDay[] = [
  { day: 'Lunedì', hours: '09:00 – 13:00' },
  { day: 'Martedì', hours: '16:00 – 20:30' },
  { day: 'Mercoledì', hours: '16:00 – 20:30' },
  { day: 'Giovedì', hours: '16:00 – 20:30' },
  { day: 'Venerdì', hours: '09:00 – 13:00 / 16:00 – 20:30' },
  { day: 'Sabato', hours: '09:00 – 13:00' },
  { day: 'Domenica', hours: 'Chiuso', closed: true },
]

// Indice del giorno odierno nell'array (0 = Lunedì … 6 = Domenica)
export function todayIndex(): number {
  const d = new Date().getDay() // 0 = domenica
  return d === 0 ? 6 : d - 1
}

// ---- Stato apertura in tempo reale -------------------------------------
// Analizza stringhe come "09:00 – 13:00" o turno spezzato
// "09:00 – 13:00 / 16:00 – 20:30" e le confronta con l'orario attuale.

function parseRanges(hours: string): Array<{ start: number; end: number }> {
  return hours
    .split('/')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const [startStr, endStr] = part.split('–').map((t) => t.trim())
      const toMinutes = (t?: string) => {
        if (!t) return 0
        const [h, m] = t.split(':').map(Number)
        return (h ?? 0) * 60 + (m ?? 0)
      }
      return { start: toMinutes(startStr), end: toMinutes(endStr) }
    })
}

function formatTime(minutes: number): string {
  const h = String(Math.floor(minutes / 60)).padStart(2, '0')
  const m = String(minutes % 60).padStart(2, '0')
  return `${h}:${m}`
}

// Cerca la prossima apertura, oggi (se resta un turno) oppure nei giorni
// successivi, e restituisce una frase pronta tipo "Apre oggi alle 16:00",
// "Apre domani alle 09:00" oppure "Apre Lunedì alle 09:00".
function getNextOpeningLabel(): string {
  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const currentIdx = todayIndex()

  const today = openingHours[currentIdx]
  if (today && !today.closed) {
    const ranges = parseRanges(today.hours)
    const next = ranges.find((r) => nowMinutes < r.start)
    if (next) return `Apre oggi alle ${formatTime(next.start)}`
  }

  for (let offset = 1; offset <= 7; offset++) {
    const idx = (currentIdx + offset) % 7
    const day = openingHours[idx]
    if (day && !day.closed) {
      const ranges = parseRanges(day.hours)
      const first = ranges[0]
      if (first) {
        const dayLabel = offset === 1 ? 'domani' : day.day
        return `Apre ${dayLabel} alle ${formatTime(first.start)}`
      }
    }
  }

  return 'Al momento chiuso'
}

export interface OpenStatus {
  isOpen: boolean
  label: string // es. "Aperto" oppure "Chiuso"
  detail: string // es. "chiude alle 13:00" oppure "riapre alle 16:00" oppure l'orario del giorno
  nextOpenLabel: string // es. "Apre Lunedì alle 09:00", usata quando il salone è chiuso
}

export function getOpenStatus(): OpenStatus {
  const today = openingHours[todayIndex()]
  if (!today || today.closed) {
    return { isOpen: false, label: 'Chiuso', detail: 'Chiuso oggi', nextOpenLabel: getNextOpeningLabel() }
  }

  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()
  const ranges = parseRanges(today.hours)

  const activeRange = ranges.find((r) => nowMinutes >= r.start && nowMinutes < r.end)
  if (activeRange) {
    return {
      isOpen: true,
      label: 'Aperto',
      detail: `chiude alle ${formatTime(activeRange.end)}`,
      nextOpenLabel: '',
    }
  }

  // Non è nella fascia attuale: cerca la prossima apertura di oggi
  const nextRange = ranges.find((r) => nowMinutes < r.start)
  if (nextRange) {
    return {
      isOpen: false,
      label: 'Chiuso',
      detail: `riapre alle ${formatTime(nextRange.start)}`,
      nextOpenLabel: getNextOpeningLabel(),
    }
  }

  return { isOpen: false, label: 'Chiuso', detail: today.hours, nextOpenLabel: getNextOpeningLabel() }
}

// Alcuni servizi hanno prezzo variabile in base all'opzione scelta
// (es. Piega Liscia o Mossa/Onde). In quel caso "variants" elenca le
// opzioni, ciascuna con la propria durata e il proprio prezzo.
export interface ServiceVariant {
  label: string
  duration: string
  price: number
  // Codici Treatwell per il link diretto al calendario (opzionali: se
  // mancano, il pulsante "Seleziona" apre il calendario generale).
  treatwellMenuItemId?: string
  treatwellOptionId?: string
}

export interface Service {
  name: string
  duration: string // per i servizi con varianti: intervallo (es. "1 ora - 1 ora 15 min")
  price: number // per i servizi con varianti: il prezzo "da"
  category: string
  featured?: boolean
  variants?: ServiceVariant[]
  // Codici Treatwell per il link diretto al calendario (solo per i
  // servizi SENZA varianti — quelli con varianti li hanno per opzione,
  // vedi sopra).
  treatwellMenuItemId?: string
  treatwellOptionId?: string
}

// Listino completo, per categoria (fonte: Treatwell).
export const services: Service[] = [
  // Barba
  {
    name: 'Modellatura Barba',
    duration: '15 min',
    price: 10,
    category: 'Barba',
    featured: true,
    treatwellMenuItemId: 'TR1359192096',
    treatwellOptionId: '100851193',
  },

  // Trattamenti Per Cute E Capello
  { name: 'Ricostruzione capello', duration: '1 ora 30 min', price: 85, category: 'Trattamenti Per Cute E Capello' },

  // Consulenza
  { name: 'Consulenza Tecnica/Stilistica', duration: '15 min', price: 20, category: 'Consulenza', featured: true },
  { name: 'Consulenza Tricologica', duration: '15 min', price: 20, category: 'Consulenza', featured: true },
  { name: 'Biondo Perfetto | Solo Consulenza', duration: '15 min', price: 20, category: 'Consulenza', featured: true },

  // Piega (prezzo variabile in base alla piega)
  {
    name: 'Piega Benessere',
    duration: '1 ora - 1 ora 15 min',
    price: 35,
    category: 'Piega',
    variants: [
      { label: 'Liscia', duration: '1 ora', price: 35 },
      { label: 'Mossa/Onde', duration: '1 ora 15 min', price: 42 },
    ],
  },
  {
    name: 'Piega Illuminante',
    duration: '1 ora - 1 ora 15 min',
    price: 40,
    category: 'Piega',
    variants: [
      { label: 'Liscia', duration: '1 ora', price: 40 },
      { label: 'Mossa/Onde', duration: '1 ora 15 min', price: 47 },
    ],
  },

  // Taglio (donna) — servizi separati, uno per ogni opzione di piega finale
  { name: 'Taglio Donna | Benessere Cute (Shampoo SPA / Taglio dei capelli / Piega Liscia)', duration: '1 ora 15 min', price: 55, category: 'Taglio' },
  { name: 'Taglio Donna | Benessere Cute (Shampoo SPA / Taglio dei capelli / Piega Mossa/Onde)', duration: '1 ora 30 min', price: 60, category: 'Taglio' },

  // Taglio Uomo
  { name: 'Taglio Uomo | Benessere Cute', duration: '45 min', price: 37, category: 'Taglio Uomo' },

  // Colore — servizi separati, uno per ogni tipo di colore
  { name: 'Colore (Tonalizzante) - Piega', duration: '1 ora 45 min', price: 45, category: 'Colore' },
  { name: 'Colore (Ricrescita) - Piega', duration: '2 ore', price: 55, category: 'Colore' },
  { name: 'Colore (Completo: Ricrescita e Lunghezze) - Piega', duration: '2 ore 15 min', price: 70, category: 'Colore' },
]

export const serviceCategories = [
  'Tutti',
  'Barba',
  'Trattamenti Per Cute E Capello',
  'Consulenza',
  'Piega',
  'Taglio',
  'Taglio Uomo',
  'Colore',
]

export interface Macro {
  label: string
  icon: string[]
  desc: string
}

export const macroServices: Macro[] = [
  { label: 'Capelli', icon: ['fas', 'scissors'], desc: 'Taglio, colore e styling su misura per lui e per lei.' },
  { label: 'Barba', icon: ['fas', 'wand-magic-sparkles'], desc: 'Modellatura e cura della barba con prodotti dedicati.' },
  { label: 'Medicina Estetica', icon: ['fas', 'hand-sparkles'], desc: 'Trattamenti mirati per il benessere di cute e capello.' },
  { label: 'Counselling & Olistico', icon: ['fas', 'spa'], desc: 'Consulenze e percorsi personalizzati, corpo e mente.' },
]

import matteoPhoto from '@/assets/team/matteo.webp'

export interface TeamMember {
  name: string
  role: string
  rating: number
  reviews: number
  icon: string[]
  photo?: string
}

export const team: TeamMember[] = [
  { name: 'Matteo', role: 'Phonista', rating: 5.0, reviews: 100, icon: ['fas', 'wind'], photo: matteoPhoto },
  { name: 'Matteo', role: 'Colorista', rating: 5.0, reviews: 8, icon: ['fas', 'palette'], photo: matteoPhoto },
]

export interface Review {
  author: string
  when: string
  service: string
  text: string
  by: string
}

export const reviews: Review[] = [
  { author: 'Elena P.', when: '3 mesi fa', service: 'Gloss', text: 'Top, esperienza impeccabile dall\'inizio alla fine.', by: 'Matteo' },
  { author: 'Floriana D.', when: '6 mesi fa', service: 'Piega', text: 'Top, sempre curata nei minimi dettagli.', by: 'Matteo' },
  { author: 'Melissa I.', when: '6 mesi fa', service: 'Taglio donna', text: 'Taglio capelli lunghi top 🔝 Sempre una garanzia!', by: 'Matteo' },
  { author: 'Lorella C.', when: '6 mesi fa', service: 'Piega', text: 'Prodotti ottimi e servizio perfetto.', by: 'Matteo' },
  { author: 'Valentina D\'A.', when: '7 mesi fa', service: 'Piega', text: 'Sempre una garanzia!!!', by: 'Matteo' },
]

export const reviewStats = { ambiente: 5.0, pulizia: 5.0, staff: 5.0, fiveStar: 107 }

import medavitaLinea from '@/assets/medavita/medavita-linea.webp'
import medavitaSalone from '@/assets/medavita/medavita-salone.webp'
import medavitaLavoro from '@/assets/medavita/medavita-lavoro.webp'
import nubeaLinea from '@/assets/nubea/nubea-linea.webp'
import nubeaShampoo from '@/assets/nubea/nubea-shampoo.webp'
import nubeaPatch from '@/assets/nubea/nubea-patch.webp'

export interface ProductImage {
  src: string
  alt: string
  caption?: string
}

export interface ProductShowcase {
  brand: string
  line: string
  tagline: string
  desc: string
  highlights: string[]
  images: ProductImage[]
}

// Iako Style usa in salone la linea ricostruttiva Medavita Beta Refibre.
export const styleProducts: ProductShowcase = {
  brand: 'Medavita',
  line: 'Beta Refibre',
  tagline: "La soluzione d'urto che dona forza ai tuoi capelli",
  desc: 'Linea ricostruttiva professionale al beta-carotene per capelli sfibrati e provati: shampoo, maschera, fluido e fiala concentrata, clinicamente testati e senza parabeni.',
  highlights: ['Clinicamente testato', 'Senza parabeni', 'Amino Concentré'],
  images: [
    { src: medavitaSalone, alt: 'Prodotti Medavita Beta Refibre in salone', caption: 'Beta Refibre in salone' },
    { src: medavitaLinea, alt: 'Linea completa Medavita Beta Refibre', caption: 'Shampoo, maschera e fluido ricostruttore' },
    { src: medavitaLavoro, alt: 'Matteo al lavoro in salone, con Beta Refibre sul set', caption: 'Beta Refibre sul set di lavoro' },
  ],
}

// Iako Ritual usa la linea anticaduta Nubea Sursum.
export const ritualProducts: ProductShowcase = {
  brand: 'Nubea',
  line: 'Sursum',
  tagline: 'Essential Oil Therapy — trattamento coadiuvante anticaduta',
  desc: 'Con oli essenziali di limone e bergamotto ed estratto di Serenoa Repens: nutre, rinforza e prolunga il ciclo vitale del capello.',
  highlights: ['100% Made in Italy', 'Oli essenziali naturali', 'Nickel tested'],
  images: [
    { src: nubeaLinea, alt: 'Linea completa Nubea Sursum', caption: 'La linea Sursum' },
    {
      src: nubeaShampoo,
      alt: 'Shampoo coadiuvante anticaduta Nubea Sursum',
      caption: 'Shampoo coadiuvante anticaduta',
    },
    {
      src: nubeaPatch,
      alt: 'Patch coadiuvante anticaduta Nubea Sursum',
      caption: 'Patch a rilascio prolungato (10-12 ore)',
    },
  ],
}

// ============================================================
//  SERVIZI — Iako Ritual
//  ------------------------------------------------------------
//  I "Rituali" (Origine, Rinascita) appartengono a Iako Ritual,
//  non a Iako Style: sono la collezione stagionale del momento.
// ============================================================

export interface RitualService {
  name: string
  duration: string
  price: number
  desc: string
  treatwellMenuItemId?: string
  treatwellOptionId?: string
}

export const ritualSeason = 'Summer Ritual 2026'

export const ritualServices: RitualService[] = [
  {
    name: 'Rituale Origine',
    duration: '1 ora',
    price: 48,
    desc: "Durante l'estate, sole, sudorazione, salsedine, cloro e lavaggi frequenti possono alterare il naturale equilibrio del cuoio capelluto, provocando prurito, pizzicore, arrossamenti e una fastidiosa sensazione di tensione. Il Rituale Origine nasce per ristabilire comfort e benessere attraverso un trattamento lenitivo agli oli essenziali. Risultato: cute riequilibrata, sensazione di freschezza immediata, riduzione di prurito e fastidi.",
  },
  {
    name: 'Rituale Rinascita',
    duration: '1 ora 15 min',
    price: 63,
    desc: "Durante l'estate, sole, sudorazione, salsedine, cloro e lavaggi frequenti possono alterare il naturale equilibrio del cuoio capelluto e impoverire la fibra capillare, provocando pizzicore, arrossamenti e una fastidiosa sensazione di tensione, oltre a capelli secchi, spenti e difficili da gestire. Attraverso oli nutrienti, attivi specifici e tecniche di massaggio rilassanti, il Rituale Rinascita lavora in profondità sia sulla cute che sulle lunghezze. Risultato: cute lenita e riequilibrata, sensazione di freschezza immediata, riduzione di prurito e fastidi, capelli nutriti in profondità, luminosità e vitalità dalla radice alle punte.",
  },
]
