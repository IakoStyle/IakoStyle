import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { brands, type BrandId } from '@/data/brands'

/**
 * Il marchio attivo è derivato dalla ROTTA, non da uno stato salvato:
 * ogni mondo ha i propri URL (/ per Style, /ritual per Ritual, /with-you
 * per la collezione), quindi i link sono condivisibili e Google può
 * indicizzare le sezioni separatamente — cosa impossibile se lo stesso
 * URL mostrasse contenuti diversi a seconda di una preferenza salvata
 * nel browser.
 */
export function currentBrandFromPath(path: string): BrandId {
  if (path.startsWith('/with-you')) return 'withyou'
  if (path.startsWith('/ritual')) return 'ritual'
  return 'style'
}

/** Applica la classe del marchio a <html>, che fa scattare la palette CSS.
 * "Everywhere With You" condivide la palette di Ritual (stessa etichetta,
 * stessi colori marrone/oro), quindi attiva la stessa classe. */
export function applyBrandToDom(id: BrandId) {
  const root = document.documentElement
  root.classList.toggle('brand-ritual', id === 'ritual' || id === 'withyou')
}

export function useBrand() {
  const route = useRoute()

  const brandId = computed<BrandId>(() => currentBrandFromPath(route.path))
  const brand = computed(() => brands[brandId.value])
  const isRitual = computed(() => brandId.value === 'ritual')
  const isWithYou = computed(() => brandId.value === 'withyou')

  watch(brandId, applyBrandToDom, { immediate: true })

  return { brandId, brand, isRitual, isWithYou }
}
