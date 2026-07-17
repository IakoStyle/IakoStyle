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
  { label: 'Counselling & Olistico', icon: ['fas', 'spa'], desc: 'Consulenze e percorsi personalizzati, corpo e mente.' },
]

export interface Review {
  author: string
  when: string
  service: string
  text: string
  by: string
}

export const reviews: Review[] = [
  {
    author: 'Camilla Lo Stocco',
    when: '1 mese fa',
    service: 'Taglio & Permanente',
    text: "Ho scoperto questo salone grazie a mia sorella, promosso a pieni voti. Ci sono andata prima per il taglio e poi per la permanente, e sono rimasta super soddisfatta entrambe le volte. Matteo oltre ad essere un parrucchiere estremamente competente, attento alle esigenze del cliente e capace di consigliare il look più adatto, riesce a creare un ambiente sereno e divertente. Ogni appuntamento si trasforma in un momento di relax e di allegria, grazie alla sua simpatia e alla capacità di mettere tutti a proprio agio. Taglio preciso, permanente riuscita benissimo.",
    by: 'Matteo',
  },
  {
    author: 'Serena Lo Stocco',
    when: '2 mesi fa',
    service: 'Trattamento Ondulante',
    text: "Ho conosciuto Matteo quasi per caso e da subito ho avuto l'impressione di essere di fronte ad un professionista competente ed innamorato del suo lavoro. Mi sono rivolta a lui per un trattamento ondulante e devo dire, ad un mese di distanza, che il risultato è fantastico. Non mi ha solo consigliato l'onda perfetta, ha cercato di replicarla e mi ha spiegato con chiarezza tutti i passi da fare a casa per ricrearla. È attento alle esigenze di ognuno e di sicuro il tempo trascorso in salone è sempre piacevole. Lo consiglio a tutti coloro che cercano un parrucchiere che prima di fare, ascolta il cliente.",
    by: 'Matteo',
  },
  {
    author: 'Alessia Vardè',
    when: '2 mesi fa',
    service: 'Consulenza & Ricostruzione',
    text: "Mi sono rivolta a Iako Style per una consulenza dato che vedevo i miei capelli sempre più spenti. Tra i suoi vari consigli, tra cui un percorso di varie sedute di ricostruzione del capello di cui non ero a conoscenza, ma sapendo della sua professionalità mi sono fidata e infatti, il risultato si è rivelato ottimo, fin dalle prime sedute, l'effetto è stato immediato; ora, i miei capelli sono morbidi, setosi e lucenti come mai prima. Inoltre, l'ambiente è giovane e pulito e l'accoglienza sempre delle migliori. Consiglio sicuramente!",
    by: 'Matteo',
  },
]

export const reviewStats = { ambiente: 5.0, pulizia: 5.0, staff: 5.0, fiveStar: 107 }

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
  /** Se false, il rituale non è prenotabile online: si mostra un tasto "Chiedi info" al posto di "Prenota". */
  bookable?: boolean
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
  {
    name: 'Rituale Fonte Purificante',
    duration: '6 trattamenti in salone · circa 25 min a seduta',
    price: 210,
    bookable: false,
    desc: "Dedicato a chi desidera contrastare la formazione della forfora e calmare il prurito. Un trattamento capace di detergere in profondità il cuoio capelluto grazie alla sinergia degli Oli Essenziali di Melaleuca (antimicotico), Salvia Officinalis (antinfiammatorio) e Rosmarinus Officinalis (disinfettante). Il percorso include: applicazione dell'estratto purificante, emulsione e fiala pre shampoo, massaggio distensivo/rilassante Nubeà, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo. Frequenza consigliata: 2 volte alla settimana per 2 settimane, 1 volta a settimana per la 3ª e 4ª settimana. Prezzo per il percorso completo di 6 trattamenti in salone (escluso brushing/piega).",
  },
  {
    name: 'Rituale Fonte Equilibrante',
    duration: '6 trattamenti in salone · circa 25 min a seduta',
    price: 175,
    bookable: false,
    desc: "Dedicato a chi desidera normalizzare la secrezione sebacea, per diminuire la frequenza dei lavaggi abbandonando la fastidiosa sensazione di avere sempre capelli pesanti e concedersi il lusso di capelli leggeri e voluminosi. Un trattamento efficace a base di Oli Essenziali di Eugenia Caryophillus (stimolante) e Salvia Officinalis (che favorisce la ricrescita dei capelli sani). Il percorso include: applicazione dell'estratto e della fiala pre shampoo, massaggio distensivo/rilassante Nubeà, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo. Frequenza consigliata: 2 volte alla settimana per 2 settimane, 1 volta a settimana per la 3ª e 4ª settimana. Prezzo per il percorso completo di 6 trattamenti in salone (escluso brushing/piega).",
  },
  {
    name: 'Rituale Fonte Rilassante',
    duration: '6 trattamenti in salone · circa 20 min a seduta',
    price: 175,
    bookable: false,
    desc: "Dedicato a chi desidera ripristinare la funzionalità del cuoio capelluto estremamente sensibile ed irritato. Un trattamento dolce e delicato che aiuta a ritrovare una piacevole sensazione di benessere grazie agli Oli Essenziali di Mentha Arvensis (risanante), Lavandula Angustifolia (calmante e addolcente) ed Aloe Vera (rigenerante). Il percorso include: massaggio distensivo/rilassante Nubeà durante il lavaggio sensoriale con shampoo specifico, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo. Frequenza consigliata: 1 volta alla settimana per almeno 6 settimane. Prezzo per il percorso completo di 6 trattamenti in salone (escluso brushing/piega).",
  },
  {
    name: 'Rituale Fonte Detossinante',
    duration: '5 trattamenti in salone · circa 25 min a seduta',
    price: 150,
    bookable: false,
    desc: "Dedicato a chi desidera un cuoio capelluto sano, requisito essenziale per avere capelli forti e belli. Un trattamento detossinante di bellezza che non si esaurisce con una piega, ma dura nel tempo, a base di Oli Essenziali di Pinus Sylvestris e di Rosmarinus Officinalis, che favorisce la ricrescita dei capelli. Il percorso include: applicazione estratto e della fiala pre shampoo, massaggio distensivo/rilassante Nubeà, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo. Frequenza consigliata: 2 volte durante la prima settimana, 1 volta in ognuna delle 3 settimane successive. Prezzo per il percorso completo di 5 trattamenti in salone (escluso brushing/piega).",
  },
  {
    name: 'Rituale Fonte Energizzante',
    duration: '6 trattamenti in salone · circa 25 min a seduta',
    price: 180,
    bookable: false,
    desc: "Dedicato a chi desidera contrastare la caduta sia progressiva che reattiva, favorendo la crescita di capelli più forti e vigorosi. Un trattamento all'insegna della rinascita, all'estratto di Serena Repens e agli Oli Essenziali di Citrus Limonum e Citrus Aurantium Bergamia, dalle conclamate proprietà stimolanti. Il percorso include: applicazione dell'estratto e della fiala pre shampoo, massaggio distensivo/rilassante Nubeà, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo. Frequenza consigliata: 1 volta alla settimana per almeno 6 settimane. Prezzo per il percorso completo di 6 trattamenti in salone (escluso brushing/piega).",
  },
]
