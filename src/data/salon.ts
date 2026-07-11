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
  reviewsUrl: 'https://www.treatwell.it/salone/iako-style/reviews/pagina-2/',
  whatsappNumber: '3200155148',
  whatsappDisplay: '320 015 5148',
  owner: 'Matteo Iacovello',
  seasonLabel: 'Orario estivo 2026',
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

export interface Service {
  name: string
  duration: string
  price: number
  category: string
  featured?: boolean
}

// Servizi con NOME e PREZZO reali (fonte: Treatwell).
export const services: Service[] = [
  { name: 'Rituale Origine', duration: '1 ora', price: 48, category: 'Trattamenti', featured: true },
  { name: 'Rituale Rinascita', duration: '1 ora 15 min', price: 63, category: 'Trattamenti' },
  { name: 'Modellatura Barba', duration: '15 min', price: 10, category: 'Barba', featured: true },
  { name: 'Biondo Perfetto | Solo Consulenza', duration: '15 min', price: 20, category: 'Consulenza', featured: true },
  { name: 'Consulenza Tecnica/Stilistica', duration: '15 min', price: 20, category: 'Consulenza', featured: true },
  { name: 'Consulenza Tricologica', duration: '15 min', price: 20, category: 'Consulenza', featured: true },
]

// Categorie con NUMERO di servizi e prezzo di partenza (fonte: Treatwell).
// Usate per la panoramica: i singoli nomi non tutti pubblici → si prenota su Treatwell.
export interface CategoryInfo {
  name: string
  count: number
  from: number
  exact?: boolean
  icon: string[]
}

export const categoryOverview: CategoryInfo[] = [
  { name: 'Taglio', count: 1, from: 55, icon: ['fas', 'scissors'] },
  { name: 'Taglio Uomo', count: 1, from: 37, exact: true, icon: ['fas', 'scissors'] },
  { name: 'Colore', count: 1, from: 45, icon: ['fas', 'palette'] },
  { name: 'Piega', count: 2, from: 35, icon: ['fas', 'wind'] },
  { name: 'Barba', count: 3, from: 10, icon: ['fas', 'wand-magic-sparkles'] },
  { name: 'Trattamenti per cute e capello', count: 1, from: 85, exact: true, icon: ['fas', 'spa'] },
  { name: 'Consulenza', count: 3, from: 20, exact: true, icon: ['fas', 'hand-sparkles'] },
]

export const serviceCategories = ['Tutti', 'Trattamenti', 'Barba', 'Consulenza']

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

export interface TeamMember {
  name: string
  role: string
  rating: number
  reviews: number
  icon: string[]
}

export const team: TeamMember[] = [
  { name: 'Matteo', role: 'Phonista', rating: 5.0, reviews: 100, icon: ['fas', 'wind'] },
  { name: 'Matteo', role: 'Colorista', rating: 5.0, reviews: 8, icon: ['fas', 'palette'] },
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

import goldwellImg from '@/assets/products/goldwell.jpg'
import insightImg from '@/assets/products/insight.jpg'
import insightDonnaImg from '@/assets/products/insight-2.jpg'
import nubeaImg from '@/assets/products/nubea.jpg'
import ghdImg from '@/assets/products/ghd.png'
import prorasoImg from '@/assets/products/proraso.png'
import redkenImg from '@/assets/products/redken.jpg'

export interface Product {
  brand: string
  reparto: 'Uomo' | 'Donna' | 'Tricologia'
  desc: string
  image?: string
}

export const products: Product[] = [
  { brand: 'Insight', reparto: 'Uomo', desc: 'Cosmetica professionale naturale per la cura quotidiana del capello.', image: insightImg },
  { brand: 'Proraso', reparto: 'Uomo', desc: 'Icona italiana della rasatura: barba e cura maschile dal 1948.', image: prorasoImg },
  { brand: 'ghd', reparto: 'Donna', desc: 'Styling di alta gamma: piastre e strumenti caldi di riferimento.', image: ghdImg },
  { brand: 'Goldwell', reparto: 'Donna', desc: 'Colore professionale e tecniche di schiaritura per un risultato luminoso e su misura.', image: goldwellImg },
  { brand: 'Insight', reparto: 'Donna', desc: 'Linee naturali e delicate per ogni tipo di capello.', image: insightDonnaImg },
  { brand: 'Redken', reparto: 'Donna', desc: 'Scienza e performance per trattamenti e styling avanzati.', image: redkenImg },
  { brand: 'Nubea · Sursum', reparto: 'Tricologia', desc: 'Trattamento coadiuvante anticaduta: shampoo, lozione e patch per rinforzare cute e capelli.', image: nubeaImg },
]
