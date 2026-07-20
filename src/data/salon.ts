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
  // Recensioni raccolte su Google Maps (da sommare a quelle di Treatwell
  // per il totale mostrato nella home di scelta). Valore da riconfermare
  // periodicamente controllando la scheda Google del salone, dato che
  // cresce nel tempo e non è recuperabile via API senza una chiave a
  // pagamento.
  googleReviewsCount: 29,
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

// Somma le recensioni raccolte su Treatwell e su Google Maps, per mostrare
// un unico numero complessivo nella home di scelta.
export function totalReviewsCount(): number {
  return salon.reviewsCount + salon.googleReviewsCount
}

// Censura il cognome di una recensione verificata, mostrando solo
// l'iniziale puntata (es. "Camilla Lo Stocco" -> "Camilla L."), per
// tutela della privacy di chi ha lasciato la recensione.
export function censorSurname(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  const [first, surname] = parts
  if (!first || !surname) return fullName
  return `${first} ${surname.charAt(0)}.`
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
  // Descrizione estesa del servizio, mostrata a tendina ("Scopri di più").
  // Stringa HTML (paragrafi <p>, eventuale <strong>), come per i Rituali.
  desc?: string
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
    desc: "<p>La modellatura barba è molto più di una semplice rifinitura: è un rituale di cura pensato per valorizzare il viso e il tuo stile.</p><p>Attraverso una consulenza mirata, definiamo la forma più adatta in base ai lineamenti, alla crescita del pelo e al risultato che desideri ottenere.</p><p>Il servizio comprende la rifinitura precisa, l'equilibrio delle proporzioni e la cura della pelle, per una barba ordinata, armoniosa e dall'aspetto sano.</p><p>Ogni gesto è studiato per offrirti comfort, relax e un risultato pulito e duraturo.</p><p><strong class=\"font-semibold text-foreground\">Consiglio:</strong> Abbinala al Taglio Uomo Benessere… Non te ne pentirai!</p>",
  },

  // Trattamenti Per Cute E Capello
  {
    name: 'Ricostruzione capello',
    duration: '1 ora 30 min',
    price: 85,
    category: 'Trattamenti Per Cute E Capello',
    desc: "<p>La ricostruzione capelli è un trattamento profondo pensato per restituire forza, elasticità e vitalità ai capelli stressati, trattati o indeboliti.</p><p>È un vero momento di rigenerazione, in cui il capello viene nutrito e rinforzato dall'interno, migliorandone visibilmente struttura e luminosità.</p><p>Il servizio viene personalizzato in base alle reali esigenze del capello, valutandone lo stato, il livello di sensibilizzazione e i trattamenti precedenti.</p><p>Ogni fase è studiata per ripristinare l'equilibrio della fibra capillare, rendendo i capelli più sani, morbidi e resistenti nel tempo.</p><p>Ideale come trattamento singolo o come supporto fondamentale prima e dopo servizi tecnici, per proteggere il capello e valorizzare ogni risultato.</p><p>Un gesto di cura profonda, per capelli che tornano a sentirsi forti, belli e pieni di vita.</p><p class=\"text-xs\">Il servizio include la messa in piega dei capelli.</p>",
  },

  // Consulenza
  {
    name: 'Consulenza Tecnica/Stilistica',
    duration: '15 min',
    price: 20,
    category: 'Consulenza',
    featured: true,
    desc: "<p>La consulenza tecnica/stilistica è un momento dedicato all'ascolto e alla valutazione personalizzata delle tue esigenze.</p><p>Durante l'incontro analizzeremo il tuo colore di partenza, la struttura e la salute del capello, lo storico dei trattamenti, il taglio di capelli attuale e il risultato che desideri ottenere.</p><p>La consulenza permette di definire la soluzione più adatta a te, stabilire tempi realistici e formulare un preventivo chiaro e trasparente, soprattutto per servizi tecnici complessi come schiariture, balayage, colpi di sole e permanente.</p><p>Il costo del servizio verrà scalato dal servizio finale in caso di conferma del lavoro.</p><p>Un passaggio fondamentale per garantirti un risultato su misura, consapevole e senza sorprese.</p>",
  },
  {
    name: 'Consulenza Tricologica',
    duration: '15 min',
    price: 20,
    category: 'Consulenza',
    featured: true,
    desc: "<p>La consulenza tricologica è un servizio dedicato al benessere del capello e del cuoio capelluto.</p><p>Attraverso l'utilizzo della tricocamera, analizzeremo in modo approfondito lo stato del cuoio capelluto e della fibra capillare, individuando eventuali anomalie, sensibilità o squilibri.</p><p>L'analisi strumentale viene affiancata da domande mirate e fondamentali per comprendere le abitudini quotidiane, lo stile di vita, i trattamenti effettuati e le esigenze specifiche del cliente.</p><p>Questo ci permette di avere una visione completa e proporre un percorso personalizzato, mirato ed efficace.</p><p>Al termine della consulenza verranno consigliati i trattamenti e i prodotti più adatti per migliorare e mantenere la salute di cute e capelli.</p><p>Un momento di ascolto e analisi approfondita, pensato per prendersi cura dei tuoi capelli partendo dalla radice.</p>",
  },
  {
    name: 'Biondo Perfetto | Solo Consulenza',
    duration: '15 min',
    price: 20,
    category: 'Consulenza',
    featured: true,
    desc: "<p>Ogni schiaritura racconta una storia diversa.</p><p>Balayage, colpi di sole e tecniche avanzate non sono servizi standard, ma lavori sartoriali che nascono dall'ascolto, dall'analisi e dalla personalizzazione.</p><p>Per offrirti un risultato davvero su misura, abbiamo scelto di iniziare sempre con una consulenza tecnica personalizzata di 15 minuti con lo stilista.</p><p>Durante l'incontro valuteremo insieme il tuo colore di partenza, il risultato che desideri ottenere, la tecnica più adatta e la salute dei tuoi capelli, definendo tempi realistici e un preventivo chiaro e trasparente.</p><p>Il costo della consulenza verrà interamente scalato dal prezzo del servizio finale qualora decidessi di procedere.</p><p>Questo momento è fondamentale per prenderci cura dei tuoi capelli nel modo giusto, evitare sorprese e garantirti un risultato che ti rappresenti davvero.</p>",
  },

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
    desc: "<p>Dedicata a chi desidera mantenere il giusto equilibrio del cuoio capelluto e conferire morbidezza, leggerezza e splendore ai capelli. Un trattamento agli olii essenziali calmanti, lenitivi e rilassanti rendono la piega nel nostro salone un vero e proprio percorso sensoriale.</p><p>Il percorso include il massaggio distensivo e rilassante della cute per 15 minuti (durante la detersione dei capelli), shampoo specifico, posa della maschera idratante e asciugatura desiderata dei capelli.</p>",
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
    desc: "<p>Un trattamento esclusivo che esalta la bellezza dei capelli, donando una luminosità intensa e sofisticata. Ravviva i riflessi, perfeziona la fibra capillare e lascia la chioma incredibilmente setosa, levigata e visibilmente più sana.</p>",
  },

  // Taglio (donna, prezzo variabile in base alla piega finale)
  {
    name: 'Taglio Donna | Benessere Cute',
    duration: '1 ora 15 min - 1 ora 30 min',
    price: 55,
    category: 'Taglio',
    variants: [
      { label: 'Shampoo SPA / Taglio dei capelli / Piega Liscia', duration: '1 ora 15 min', price: 55 },
      { label: 'Shampoo SPA / Taglio dei capelli / Piega Mossa/Onde', duration: '1 ora 30 min', price: 60 },
    ],
    desc: "<p>Formazione e aggiornamento sono le parole chiave per offrire le migliori proposte al passo con i tempi alle nostre clienti.</p><p>Da noi però, non può mancare il benessere, il relax e la cura della cute.</p><p>Dedicato a chi, oltre al taglio dei capelli desiderato, vuole mantenere il giusto eqilibrio del cuoio capelluto e conferire morbidezza, leggerezza e splendore ai capelli.</p><p>Un trattamento agli olii essenziali calmanti, lenitivi e rilassanti rendono la permanenza nel nostro salone un vero e proprio percorso sensoriale.</p><p>Il percorso include il massaggio distensivo e rilassante della cute per 15 minuti (durante la detersione dei capelli), shampoo specifico, posa della maschera idratante, taglio e messa in piega dei capelli.</p>",
  },

  // Taglio Uomo
  {
    name: 'Taglio Uomo | Benessere Cute',
    duration: '45 min',
    price: 37,
    category: 'Taglio Uomo',
    desc: "<p>Dedicato e a chi desidera mantenere il giusto eqilibrio del cuoio capelluto e conferire morbidezza, leggerezza e splendore ai capelli.</p><p>Un trattamento agli olii essenziali calmanti, lenitivi e rilassanti rendono il taglio uomo nel nostro salone un vero e proprio percorso sensoriale.</p><p>Oltre al taglio dei capelli, andremo ad effettuare un massaggio distensivo e rilassante (di 10 minuti) del cuoio capelluto, detersione sensoriale con shampoo specifico e applicazione in posa della maschera idratante.</p>",
  },

  // Colore (prezzo variabile in base al tipo di colore)
  {
    name: 'Colore',
    duration: '1 ora 45 min - 2 ore 15 min',
    price: 45,
    category: 'Colore',
    variants: [
      { label: 'Tonalizzante - Piega', duration: '1 ora 45 min', price: 45 },
      { label: 'Ricrescita - Piega', duration: '2 ore', price: 55 },
      { label: 'Completo: Ricrescita e Lunghezze - Piega', duration: '2 ore 15 min', price: 70 },
    ],
    desc: "<p>Un’esperienza colore su misura che esalta la tua unicità. Formule professionali e tecniche personalizzate si fondono per creare nuance profonde, luminose e perfettamente armoniose con il tuo incarnato. Il risultato è un colore elegante, brillante e duraturo, con capelli dall’aspetto sano e sofisticato.</p>",
  },
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
    name: 'Rituale Purificante',
    duration: '6 trattamenti in salone · circa 25 min a seduta',
    price: 210,
    bookable: false,
    desc: "<p>Dedicato a chi desidera <strong class=\"font-semibold text-foreground\">contrastare la formazione della forfora e calmare il prurito</strong>. Un trattamento capace di detergere in profondità il cuoio capelluto grazie alla sinergia degli Oli Essenziali di Melaleuca (antimicotico), Salvia Officinalis (antinfiammatorio) e Rosmarinus Officinalis (disinfettante).</p><p><strong class=\"font-semibold text-foreground\">Il percorso include:</strong> applicazione dell'estratto purificante, emulsione e fiala pre shampoo, massaggio distensivo/rilassante Nubeà, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo.</p><p class=\"italic\">Frequenza consigliata: 2 volte alla settimana per 2 settimane, 1 volta a settimana per la 3ª e 4ª settimana.</p><p class=\"text-xs\">Prezzo per il percorso completo di 6 trattamenti in salone (escluso brushing/piega).</p>",
  },
  {
    name: 'Rituale Equilibrante',
    duration: '6 trattamenti in salone · circa 25 min a seduta',
    price: 175,
    bookable: false,
    desc: "<p>Dedicato a chi desidera <strong class=\"font-semibold text-foreground\">normalizzare la secrezione sebacea</strong>, per diminuire la frequenza dei lavaggi abbandonando la fastidiosa sensazione di avere sempre capelli pesanti e concedersi il lusso di capelli leggeri e voluminosi. Un trattamento efficace a base di Oli Essenziali di Eugenia Caryophillus (stimolante) e Salvia Officinalis (che favorisce la ricrescita dei capelli sani).</p><p><strong class=\"font-semibold text-foreground\">Il percorso include:</strong> applicazione dell'estratto e della fiala pre shampoo, massaggio distensivo/rilassante Nubeà, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo.</p><p class=\"italic\">Frequenza consigliata: 2 volte alla settimana per 2 settimane, 1 volta a settimana per la 3ª e 4ª settimana.</p><p class=\"text-xs\">Prezzo per il percorso completo di 6 trattamenti in salone (escluso brushing/piega).</p>",
  },
  {
    name: 'Rituale Rilassante',
    duration: '6 trattamenti in salone · circa 20 min a seduta',
    price: 175,
    bookable: false,
    desc: "<p>Dedicato a chi desidera <strong class=\"font-semibold text-foreground\">ripristinare la funzionalità del cuoio capelluto</strong> estremamente sensibile ed irritato. Un trattamento dolce e delicato che aiuta a ritrovare una piacevole sensazione di benessere grazie agli Oli Essenziali di Mentha Arvensis (risanante), Lavandula Angustifolia (calmante e addolcente) ed Aloe Vera (rigenerante).</p><p><strong class=\"font-semibold text-foreground\">Il percorso include:</strong> massaggio distensivo/rilassante Nubeà durante il lavaggio sensoriale con shampoo specifico, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo.</p><p class=\"italic\">Frequenza consigliata: 1 volta alla settimana per almeno 6 settimane.</p><p class=\"text-xs\">Prezzo per il percorso completo di 6 trattamenti in salone (escluso brushing/piega).</p>",
  },
  {
    name: 'Rituale Detossinante',
    duration: '5 trattamenti in salone · circa 25 min a seduta',
    price: 150,
    bookable: false,
    desc: "<p>Dedicato a chi desidera un <strong class=\"font-semibold text-foreground\">cuoio capelluto sano</strong>, requisito essenziale per avere capelli forti e belli. Un trattamento detossinante di bellezza che non si esaurisce con una piega, ma dura nel tempo, a base di Oli Essenziali di Pinus Sylvestris e di Rosmarinus Officinalis, che favorisce la ricrescita dei capelli.</p><p><strong class=\"font-semibold text-foreground\">Il percorso include:</strong> applicazione estratto e della fiala pre shampoo, massaggio distensivo/rilassante Nubeà, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo.</p><p class=\"italic\">Frequenza consigliata: 2 volte durante la prima settimana, 1 volta in ognuna delle 3 settimane successive.</p><p class=\"text-xs\">Prezzo per il percorso completo di 5 trattamenti in salone (escluso brushing/piega).</p>",
  },
  {
    name: 'Rituale Energizzante',
    duration: '6 trattamenti in salone · circa 25 min a seduta',
    price: 180,
    bookable: false,
    desc: "<p>Dedicato a chi desidera <strong class=\"font-semibold text-foreground\">contrastare la caduta</strong> sia progressiva che reattiva, favorendo la crescita di capelli più forti e vigorosi. Un trattamento all'insegna della rinascita, all'estratto di Serena Repens e agli Oli Essenziali di Citrus Limonum e Citrus Aurantium Bergamia, dalle conclamate proprietà stimolanti.</p><p><strong class=\"font-semibold text-foreground\">Il percorso include:</strong> applicazione dell'estratto e della fiala pre shampoo, massaggio distensivo/rilassante Nubeà, lavaggio sensoriale con shampoo specifico, posa in maschera idratante, applicazione fiala post shampoo.</p><p class=\"italic\">Frequenza consigliata: 1 volta alla settimana per almeno 6 settimane.</p><p class=\"text-xs\">Prezzo per il percorso completo di 6 trattamenti in salone (escluso brushing/piega).</p>",
  },
]
