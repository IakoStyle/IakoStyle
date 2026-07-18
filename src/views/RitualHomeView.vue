<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { getOpenStatus } from '@/data/salon'
import { ritualFruit } from '@/data/brands'
import { ritualGallery } from '@/data/media'
import lemonIcon from '@/assets/ritual/lemon-icon.webp'
import heroPoster from '@/assets/ritual/hero-ritual-poster.webp'
import MediaCarousel from '@/components/MediaCarousel.vue'

const status = computed(() => getOpenStatus())

// Audio del video hero: i browser bloccano l'autoplay con audio, quindi
// proviamo a partire con il suono e ripieghiamo su "muto" solo se il
// browser lo impedisce. Il pulsante in basso a destra permette di
// attivare/disattivare il suono in ogni momento.
const heroVideo = ref<HTMLVideoElement | null>(null)
const audioOn = ref(true)

function toggleAudio() {
  const video = heroVideo.value
  if (!video) return
  audioOn.value = !audioOn.value
  video.muted = !audioOn.value
}

onMounted(async () => {
  const video = heroVideo.value
  if (!video) return
  try {
    video.muted = false
    await video.play()
    audioOn.value = true
  } catch {
    // Autoplay con audio bloccato dal browser: riparte muto.
    video.muted = true
    audioOn.value = false
    video.play().catch(() => {})
  }
})
</script>

<template>
  <!-- HERO: banner video in loop con vignetta -->
  <section class="relative flex min-h-[24rem] w-full items-center justify-center overflow-hidden py-14 sm:min-h-[22rem] sm:py-16">
    <video
      ref="heroVideo"
      class="absolute inset-0 h-full w-full object-cover"
      :poster="heroPoster"
      loop
      playsinline
      preload="auto"
      aria-hidden="true"
    >
      <source src="/ritual/mare.mp4" type="video/mp4" />
    </video>
    <!-- Scurimento uniforme -->
    <div class="absolute inset-0 bg-black/50"></div>
    <!-- Vignetta: bordi più scuri, centro più leggibile -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.6) 100%)"
    ></div>
    <!-- Gradiente dal basso, per far risaltare testo -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"></div>

    <div class="relative mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
      <p class="ritual-eyebrow text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
        Head Spa Experience
      </p>

      <div class="mt-6 flex items-center justify-center gap-3">
        <div class="text-left leading-none">
          <p class="ritual-wordmark text-4xl font-semibold text-white drop-shadow-sm sm:text-5xl">IAKO</p>
          <p class="ritual-subword mt-2 text-xs font-medium text-white/90 sm:text-sm">RITUAL</p>
        </div>
        <img :src="lemonIcon" alt="" class="h-16 w-auto object-contain drop-shadow-md sm:h-20" />
      </div>

      <p class="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/85">
        Un rituale di benessere per cute e capelli: massaggio, trattamenti e
        profumi naturali. Ogni anno un frutto diverso guida l'esperienza —
        per il {{ ritualFruit.year }} è il <strong class="text-white">{{ ritualFruit.name }}</strong>
        {{ ritualFruit.emoji }}
      </p>

      <p class="mt-6 flex items-center justify-center gap-2 text-sm">
        <span class="h-1.5 w-1.5 shrink-0 rounded-full" :class="status.isOpen ? 'bg-primary' : 'bg-closed'"></span>
        <span class="font-bold text-white/90">
          {{ status.isOpen ? `${status.label} · ${status.detail}` : status.nextOpenLabel }}
        </span>
      </p>
    </div>

    <!-- Toggle audio -->
    <button
      type="button"
      class="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white ring-1 ring-white/25 backdrop-blur-sm transition-colors hover:bg-black/60"
      :aria-label="audioOn ? 'Disattiva audio' : 'Attiva audio'"
      @click="toggleAudio"
    >
      <font-awesome-icon :icon="['fas', audioOn ? 'volume-high' : 'volume-xmark']" />
    </button>
  </section>

  <!-- GALLERIA -->
  <section class="mx-auto max-w-6xl px-6 pb-12">
    <div class="mb-8 text-center">
      <h2 class="ritual-wordmark mt-4 text-2xl font-semibold text-gold sm:text-3xl">
        I rituali
      </h2>
    </div>
    <MediaCarousel :items="ritualGallery" :drive-folder-id="null" />
  </section>

  <!-- Rimando al Listino -->
  <section class="mx-auto max-w-6xl px-6 pb-20">
    <div class="mx-auto max-w-sm">
      <RouterLink
        to="/ritual/listino"
        class="group block rounded-xl border border-border bg-surface p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:shadow-gold/10"
      >
        <span class="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold transition-transform duration-300 group-hover:rotate-6">
          <font-awesome-icon :icon="['fas', 'spa']" />
        </span>
        <h3 class="mt-4 ritual-wordmark text-lg font-semibold text-foreground">I Rituali</h3>
        <p class="mt-1 text-sm text-muted">Scopri Rituale Origine e Rituale Rinascita, prezzi e durata.</p>
      </RouterLink>
    </div>
  </section>
</template>
