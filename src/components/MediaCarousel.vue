<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { gallery } from '@/data/media'

const N = gallery.length
// Contenuto triplicato: copia prima, centrale (quella "vera", da cui si parte),
// copia dopo. Serve per poter scorrere all'infinito in entrambe le direzioni.
const tripleGallery = computed(() => [...gallery, ...gallery, ...gallery])

const trackEl = ref<HTMLElement | null>(null)
const currentIndex = ref(N) // si parte dal primo elemento della copia centrale
const transitionEnabled = ref(false) // niente animazione sul posizionamento iniziale

let itemStep = 0 // larghezza di un elemento + gap, in pixel

function measureStep() {
  const el = trackEl.value
  if (!el) return
  const first = el.children[0] as HTMLElement | undefined
  if (!first) return
  const style = getComputedStyle(el)
  const gap = parseFloat(style.columnGap || (style as unknown as { gap: string }).gap || '0') || 0
  itemStep = first.getBoundingClientRect().width + gap
}

// Offset di trascinamento manuale (drag/swipe), sommato alla posizione
// durante il gesto, per far seguire il dito/il cursore in tempo reale.
const dragOffset = ref(0)

const trackStyle = computed(() => ({
  transform: `translateX(calc(-${currentIndex.value * itemStep}px + ${dragOffset.value}px))`,
  transition: transitionEnabled.value ? 'transform 450ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
}))

function next() {
  currentIndex.value += 1
}
function prev() {
  currentIndex.value -= 1
}

// Al termine di ogni animazione, se siamo entrati in una delle due copie
// duplicate, ci "teletrasportiamo" alla posizione equivalente nella copia
// centrale — con la transizione disattivata, quindi in modo istantaneo e
// invisibile (il contenuto è identico). Usiamo l'evento nativo
// 'transitionend': scatta una sola volta per ogni animazione completata,
// quindi nessun rischio che più correzioni si sommino.
function handleTransitionEnd(e: TransitionEvent) {
  if (e.propertyName !== 'transform') return

  if (currentIndex.value >= N * 2) {
    transitionEnabled.value = false
    currentIndex.value -= N
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transitionEnabled.value = true
      })
    })
  } else if (currentIndex.value < N) {
    transitionEnabled.value = false
    currentIndex.value += N
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        transitionEnabled.value = true
      })
    })
  }
}

// --- Trascinamento manuale (swipe su mobile, drag col mouse) ---
let dragStartX = 0
let isDragging = false
const DRAG_THRESHOLD = 40 // px minimi di trascinamento per cambiare elemento

function onPointerDown(e: PointerEvent) {
  isDragging = true
  dragStartX = e.clientX
  transitionEnabled.value = false
  ;(e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
}

function onPointerMove(e: PointerEvent) {
  if (!isDragging) return
  dragOffset.value = e.clientX - dragStartX
}

function onPointerUp() {
  if (!isDragging) return
  isDragging = false

  const delta = dragOffset.value
  dragOffset.value = 0
  transitionEnabled.value = true

  if (delta <= -DRAG_THRESHOLD) {
    next()
  } else if (delta >= DRAG_THRESHOLD) {
    prev()
  }
  // altrimenti (trascinamento troppo piccolo) si riassesta sull'elemento corrente
}

let resizeObserver: ResizeObserver | null = null

onMounted(async () => {
  await nextTick()
  measureStep()
  // Attiva l'animazione solo DOPO aver applicato la posizione iniziale,
  // altrimenti il primo posizionamento verrebbe animato da 0.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      transitionEnabled.value = true
    })
  })

  resizeObserver = new ResizeObserver(() => measureStep())
  if (trackEl.value) resizeObserver.observe(trackEl.value)
})

onUnmounted(() => {
  resizeObserver?.disconnect()
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

    <!-- Finestra visibile: il track scorre tramite transform, non scroll nativo -->
    <div class="overflow-hidden">
      <div
        ref="trackEl"
        class="flex gap-4 pb-2 will-change-transform touch-pan-y select-none"
        :style="trackStyle"
        @transitionend="handleTransitionEnd"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp"
      >
        <div
          v-for="(item, i) in tripleGallery"
          :key="i"
          class="relative aspect-[4/5] w-[78%] shrink-0 select-none overflow-hidden rounded-xl border border-border sm:w-[46%] lg:w-[31%]"
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
    </div>

    <p class="mt-3 flex items-center justify-center gap-2 text-xs text-muted md:hidden">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
      Scorri per vedere tutto
    </p>
  </div>
</template>
