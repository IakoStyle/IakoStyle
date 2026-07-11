<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { gallery } from '@/data/media'

const track = ref<HTMLElement | null>(null)

// ------------------------------------------------------------------
// Carosello COMPLETAMENTE MANUALE: nessun autoplay, nessun timer,
// nessun monitoraggio continuo dello scroll. Si muove solo quando
// l'utente clicca una freccia (o scorre a mano su mobile).
//
// Il contenuto è ripetuto 2 volte di fila, così cliccando "avanti"
// dall'ultima foto si continua a scorrere in avanti nella copia
// duplicata (identica) invece di animare un salto all'indietro.
// Una volta che l'animazione si è fermata, la posizione viene
// "teletrasportata" UNA SOLA VOLTA e in modo istantaneo all'inizio
// della copia originale — invisibile, perché il contenuto è identico.
// Nessun controllo continuo => nessun rischio di sfarfallio.
// ------------------------------------------------------------------
const doubleGallery = computed(() => [...gallery, ...gallery])

let setWidth = 0 // larghezza di una singola copia del contenuto

function measureSetWidth() {
  const el = track.value
  if (!el) return
  setWidth = el.scrollWidth / 2
}

function settleAfterScroll(cb: () => void) {
  const el = track.value
  if (!el) return
  // Preferisce l'evento nativo 'scrollend' quando disponibile;
  // altrimenti un timeout che copre la durata dello scroll "smooth".
  if ('onscrollend' in el) {
    el.addEventListener('scrollend', cb, { once: true })
  } else {
    setTimeout(cb, 500)
  }
}

function next() {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: el.clientWidth * 0.8, behavior: 'smooth' })
  settleAfterScroll(() => {
    if (!setWidth) measureSetWidth()
    if (el.scrollLeft >= setWidth) {
      el.scrollLeft -= setWidth // salto istantaneo, invisibile
    }
  })
}

function prev() {
  const el = track.value
  if (!el) return
  el.scrollBy({ left: -el.clientWidth * 0.8, behavior: 'smooth' })
  settleAfterScroll(() => {
    if (!setWidth) measureSetWidth()
    if (el.scrollLeft <= 0) {
      el.scrollLeft = setWidth // salto all'ultima copia originale
    }
  })
}

onMounted(async () => {
  await nextTick()
  measureSetWidth()
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

    <!-- Track scrollabile: contenuto duplicato per il loop in avanti -->
    <div
      ref="track"
      class="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
    >
      <div
        v-for="(item, i) in doubleGallery"
        :key="i"
        class="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-xl border border-border sm:w-[46%] lg:w-[31%]"
        :aria-hidden="i >= gallery.length"
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
