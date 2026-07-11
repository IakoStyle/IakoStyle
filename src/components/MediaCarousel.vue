<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gallery } from '@/data/media'

const track = ref<HTMLElement | null>(null)

const AUTOPLAY_DELAY = 3800 // ms tra un avanzamento automatico e il successivo
const RESUME_DELAY = 5000 // ms di pausa dopo un'interazione manuale, prima di ripartire

let autoplayTimer: ReturnType<typeof setInterval> | null = null
let resumeTimer: ReturnType<typeof setTimeout> | null = null
const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// ------------------------------------------------------------------
// Loop infinito "a ruota": il contenuto è ripetuto 3 volte di fila.
// Si parte al centro (copia 1). Uno scroll listener controlla in
// continuazione la posizione: appena si esce dalla copia centrale
// (avanti o indietro), la posizione viene "teletrasportata" di uno
// spessore esatto nella copia equivalente — invisibile, perché il
// contenuto è identico. Il risultato: si può scorrere sempre nella
// stessa direzione, senza mai fermarsi o tornare indietro.
// ------------------------------------------------------------------
const tripleGallery = computed(() => [...gallery, ...gallery, ...gallery])

let setWidth = 0 // larghezza di una singola copia del contenuto

function measureSetWidth() {
  const el = track.value
  if (!el) return
  setWidth = el.scrollWidth / 3
}

function centerTrack(instant = true) {
  const el = track.value
  if (!el || !setWidth) return
  el.scrollTo({ left: setWidth, behavior: instant ? 'auto' : 'smooth' })
}

function handleScroll() {
  const el = track.value
  if (!el || !setWidth) return

  if (el.scrollLeft >= setWidth * 2) {
    el.scrollLeft -= setWidth
  } else if (el.scrollLeft < setWidth) {
    el.scrollLeft += setWidth
  }
}

function advance(dir: 1 | -1 = 1) {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: 'smooth' })
}

function startAutoplay() {
  if (prefersReducedMotion) return
  stopAutoplay()
  autoplayTimer = setInterval(() => advance(1), AUTOPLAY_DELAY)
}

function stopAutoplay() {
  if (autoplayTimer) {
    clearInterval(autoplayTimer)
    autoplayTimer = null
  }
}

// Quando l'utente interagisce manualmente, mettiamo in pausa l'autoplay
// e lo facciamo ripartire dopo un breve momento di tranquillità.
function pauseThenResume() {
  stopAutoplay()
  if (resumeTimer) clearTimeout(resumeTimer)
  resumeTimer = setTimeout(startAutoplay, RESUME_DELAY)
}

function scrollByDir(dir: 1 | -1) {
  advance(dir)
  pauseThenResume()
}

let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  measureSetWidth()
  centerTrack(true)
  track.value?.addEventListener('scroll', handleScroll, { passive: true })

  // Ricalcola se cambiano le dimensioni (resize, cambio breakpoint, font caricati)
  resizeObserver = new ResizeObserver(() => {
    measureSetWidth()
    centerTrack(true)
  })
  if (track.value) resizeObserver.observe(track.value)

  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
  if (resumeTimer) clearTimeout(resumeTimer)
  track.value?.removeEventListener('scroll', handleScroll)
  resizeObserver?.disconnect()
})

const tintMap: Record<string, string> = {
  mint: 'from-primary-soft to-accent-soft',
  sky: 'from-accent-soft to-primary-soft',
  gold: 'from-gold-soft to-accent-soft',
}
</script>

<template>
  <div
    class="relative"
    @mouseenter="stopAutoplay"
    @mouseleave="startAutoplay"
    @touchstart.passive="pauseThenResume"
  >
    <!-- Frecce (desktop) -->
    <button
      class="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition-all hover:bg-primary hover:text-surface md:flex"
      aria-label="Elemento precedente"
      @click="scrollByDir(-1)"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <button
      class="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition-all hover:bg-primary hover:text-surface md:flex"
      aria-label="Elemento successivo"
      @click="scrollByDir(1)"
    >
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </button>

    <!-- Track scrollabile: contenuto triplicato per il loop infinito -->
    <div
      ref="track"
      class="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
    >
      <div
        v-for="(item, i) in tripleGallery"
        :key="i"
        class="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-xl border border-border sm:w-[46%] lg:w-[31%]"
        :aria-hidden="i < gallery.length || i >= gallery.length * 2"
      >
        <!-- MEDIA REALE -->
        <template v-if="!item.placeholder">
          <img
            v-if="item.type === 'image'"
            :src="item.src"
            :alt="item.alt || 'Foto Iako Style'"
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <video
            v-else
            :src="item.src"
            :poster="item.poster"
            class="h-full w-full object-cover"
            controls
            playsinline
            @play="stopAutoplay"
            @pause="pauseThenResume"
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
