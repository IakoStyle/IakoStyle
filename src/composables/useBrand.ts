import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { brands, type BrandId } from '@/data/brands'

/**
 * Il marchio attivo è derivato dalla ROTTA, non da uno stato salvato:
 * ogni mondo ha i propri URL (/ per Style, /ritual per Ritual), quindi
 * i link sono condivisibili e Google può indicizzare le due sezioni
 * separatamente — cosa impossibile se lo stesso URL mostrasse contenuti
 * diversi a seconda di una preferenza salvata nel browser.
 */
export function currentBrandFromPath(path: string): BrandId {
  return path.startsWith('/ritual') ? 'ritual' : 'style'
}

/** Applica la classe del marchio a <html>, che fa scattare la palette CSS. */
export function applyBrandToDom(id: BrandId) {
  const root = document.documentElement
  root.classList.toggle('brand-ritual', id === 'ritual')
}

export function useBrand() {
  const route = useRoute()

  const brandId = computed<BrandId>(() => currentBrandFromPath(route.path))
  const brand = computed(() => brands[brandId.value])
  const isRitual = computed(() => brandId.value === 'ritual')

  watch(brandId, applyBrandToDom, { immediate: true })

  return { brandId, brand, isRitual }
}
