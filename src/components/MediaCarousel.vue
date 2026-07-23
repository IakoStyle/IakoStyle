<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import type { MediaItem } from '@/data/media'
import { gallery as styleGallery } from '@/data/media'

const props = withDefaults(
  defineProps<{
    items?: MediaItem[]
  }>(),
  {
    items: () => styleGallery,
  },
)

const N = computed(() => props.items.length)
// Contenuto triplicato: copia prima, centrale (quella "vera", da cui si parte),
// copia dopo. Serve per poter scorrere all'infinito in entrambe le direzioni.
const tripleGallery = computed(() => [...props.items, ...props.items, ...props.items])

// Il carosello NON simula più il trascinamento via JS (era fragile su
// mobile: bastava che il browser decidesse, anche solo per un istante,
// che il gesto fosse uno scroll verticale della pagina, e lo swipe
// smetteva di rispondere). Usiamo invece lo scroll orizzontale nativo
// con scroll-snap: è il browser stesso a gestire il tocco — lo stesso
// meccanismo di qualunque carosello nativo — quindi funziona sempre,
// in modo fluido, su ogni dispositivo.
const scrollerEl = ref<HTMLElement | null>(null)

let itemStep = 0 // larghezza di un elemento + gap, in pixel

function measureStep() {
  const el = scrollerEl.value
  if (!el) return
  const first = el.children[0] as HTMLElement | undefined
  if (!first) return
  const style = getComputedStyle(el)
  const gap = parseFloat(style.columnGap || (style as unknown as { gap: string }).gap || '0') || 0
  itemStep = first.getBoundingClientRect().width + gap
}

// Ricentra la carrellata sulla copia centrale, senza animazione (si
// imposta scrollLeft direttamente, quindi è istantaneo). Usata al
// primo montaggio.
async function recenter() {
  await nextTick()
  measureStep()
  const el = scrollerEl.value
  if (el) el.scrollLeft = N.value * itemStep
}

function next() {
  scrollerEl.value?.scrollBy({ left: itemStep, behavior: 'smooth' })
}
function prev() {
  scrollerEl.value?.scrollBy({ left: -itemStep, behavior: 'smooth' })
}

// Quando lo scroll si ferma, se siamo entrati in una delle due copie
// duplicate ci "teletrasportiamo" alla posizione equivalente nella copia
// centrale, impostando scrollLeft direttamente: istantaneo e invisibile
// (il contenuto è identico). Usiamo l'evento nativo 'scrollend' dove
// disponibile, con un fallback a debounce sull'evento 'scroll' per i
// browser che non lo supportano ancora.
let scrollEndTimer: ReturnType<typeof setTimeout> | null = null

function checkLoop() {
  const el = scrollerEl.value
  if (!el || !itemStep) return
  const index = Math.round(el.scrollLeft / itemStep)
  if (index >= N.value * 2) {
    el.scrollLeft -= N.value * itemStep
  } else if (index < N.value) {
    el.scrollLeft += N.value * itemStep
  }
}

function handleScroll() {
  if (scrollEndTimer) clearTimeout(scrollEndTimer)
  scrollEndTimer = setTimeout(checkLoop, 120)
}

function handleScrollEnd() {
  if (scrollEndTimer) {
    clearTimeout(scrollEndTimer)
    scrollEndTimer = null
  }
  checkLoop()
}

let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
  await recenter()

  resizeObserver = new ResizeObserver(() => measureStep())
  if (scrollerEl.value) resizeObserver.observe(scrollerEl.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
  if (scrollEndTimer) clearTimeout(scrollEndTimer)
})

const tintMap: Record<string, string> = {
  mint: 'from-primary-soft to-accent-soft',
  sky: 'from-accent-soft to-primary-soft',
  gold: 'from-gold-soft to-accent-soft',
}
</script>

<template>
  <div class="relative">
    <!-- Frecce (desktop) -->
    <button
      class="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition-all hover:bg-primary hover:text-surface md:flex"
      aria-label="Elemento precedente"
      @click="prev"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <button
      class="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition-all hover:bg-primary hover:text-surface md:flex"
      aria-label="Elemento successivo"
      @click="next"
    >
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </button>

    <!-- Finestra visibile: scroll orizzontale nativo con snap, il browser
         gestisce il tocco direttamente (niente drag simulato via JS). -->
    <div
      ref="scrollerEl"
      class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 no-scrollbar"
      @scroll="handleScroll"
      @scrollend="handleScrollEnd"
    >
        <div
          v-for="(item, i) in tripleGallery"
          :key="i"
          class="relative aspect-[4/5] w-[78%] shrink-0 snap-start snap-always overflow-hidden rounded-xl border border-border sm:w-[46%] lg:w-[31%]"
          :aria-hidden="i < N || i >= N * 2"
        >
          <!-- MEDIA REALE -->
          <template v-if="!item.placeholder">
            <img
              v-if="item.type === 'image'"
              :src="item.src"
              :alt="item.alt || 'Foto Iako Style'"
              class="h-full w-full object-cover"
              loading="lazy"
              draggable="false"
            />
            <video
              v-else
              :src="item.src"
              :poster="item.poster"
              class="h-full w-full object-cover"
              controls
              playsinline
            ></video>
          </template>

          <!-- SEGNAPOSTO (in attesa dei media) -->
          <div
            v-else
            class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br p-6 text-center"
            :class="tintMap[item.tint || 'mint']"
          >
            <div class="flex h-14 w-14 items-center justify-center rounded-full bg-surface/70 text-primary">
              <font-awesome-icon
                :icon="item.type === 'video' ? ['fas', 'play'] : ['fas', 'images']"
                class="text-xl"
              />
            </div>
            <p class="font-display font-semibold text-foreground">{{ item.caption }}</p>
            <span class="rounded-full bg-surface/80 px-3 py-1 text-xs font-bold text-muted">
              {{ item.type === 'video' ? 'Video in arrivo' : 'Foto in arrivo' }}
            </span>
          </div>

          <!-- Etichetta caption su media reale -->
          <div
            v-if="!item.placeholder && item.caption"
            class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4"
          >
            <p class="font-display font-semibold text-white">{{ item.caption }}</p>
          </div>
        </div>
      </div>

    <p class="mt-3 flex items-center justify-center gap-2 text-xs text-muted md:hidden">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
      Scorri per vedere tutto
    </p>
  </div>
</template>
