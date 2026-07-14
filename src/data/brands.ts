// ============================================================
//  MARCHI — Iako Style · Iako Ritual
//  ------------------------------------------------------------
//  Stesso salone, stessa sede: due mondi con identità visiva
//  propria. Contatti, orari, indirizzo e P.IVA restano condivisi
//  (vedi salon.ts) — qui c'è solo ciò che DIFFERISCE.
// ============================================================

export type BrandId = 'style' | 'ritual'

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
}

// Il frutto cambia ogni anno: nel 2026 è il limone.
// Per cambiarlo l'anno prossimo basta modificare questo blocco.
export const ritualFruit = {
  year: 2026,
  name: 'Limone',
  emoji: '🍋',
}
