// ============================================================
//  MARCHI — Iako Style · Iako Ritual · Everywhere With You
//  ------------------------------------------------------------
//  Stesso salone, stessa sede: tre mondi con identità visiva
//  propria. Contatti, orari, indirizzo e P.IVA restano condivisi
//  (vedi salon.ts) — qui c'è solo ciò che DIFFERISCE.
//  "Everywhere With You" è la collezione di prodotti firmati Iako
//  Ritual (es. la pochette): condivide la palette di Ritual.
// ============================================================

export type BrandId = 'style' | 'ritual' | 'withyou'

export interface Brand {
  id: BrandId
  /** Nome breve mostrato nello switch */
  switchLabel: string
  /** Nome completo del marchio */
  name: string
  /** Percorso base delle sue pagine */
  basePath: string
  tagline: string
}

export const brands: Record<BrandId, Brand> = {
  style: {
    id: 'style',
    switchLabel: 'Style',
    name: 'Iako Style',
    basePath: '/',
    tagline: 'Parrucchiere uomo · donna · bambino a Fondi',
  },
  ritual: {
    id: 'ritual',
    switchLabel: 'Ritual',
    name: 'Iako Ritual',
    basePath: '/ritual',
    tagline: 'Head Spa Experience',
  },
  withyou: {
    id: 'withyou',
    switchLabel: 'With You',
    name: 'Everywhere With You',
    basePath: '/with-you',
    tagline: 'La collezione firmata Iako Ritual',
  },
}

// La collezione attuale (dalla pochette): Collection N. 01, Summer 2026.
export const withYouCollection = {
  number: 1,
  season: 'Summer 2026',
  nextSeason: 'Summer 2027',
}

// Il frutto cambia ogni anno: nel 2026 è il limone.
// Per cambiarlo l'anno prossimo basta modificare questo blocco.
export const ritualFruit = {
  year: 2026,
  name: 'Limone',
  emoji: '🍋',
}
