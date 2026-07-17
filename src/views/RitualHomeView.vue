<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { salon, getOpenStatus } from '@/data/salon'
import { ritualFruit } from '@/data/brands'
import { ritualGallery } from '@/data/media'
import ritualLogo from '@/assets/ritual/logo-ritual.webp'
import heroPoster from '@/assets/ritual/hero-ritual-poster.webp'
import MediaCarousel from '@/components/MediaCarousel.vue'

const status = computed(() => getOpenStatus())
</script>

<template>
  <!-- HERO: banner video in loop con vignetta -->
  <section class="relative h-[26rem] w-full overflow-hidden sm:h-[24rem]">
    <video
      class="absolute inset-0 h-full w-full object-cover"
      :poster="heroPoster"
      autoplay
      muted
      loop
      playsinline
      preload="metadata"
      aria-hidden="true"
    >
      <source src="/ritual/hero-ritual-loop.webm" type="video/webm" />
      <source src="/ritual/hero-ritual-loop.mp4" type="video/mp4" />
    </video>
    <!-- Scurimento uniforme -->
    <div class="absolute inset-0 bg-black/50"></div>
    <!-- Vignetta: bordi più scuri, centro più leggibile -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.55) 100%)"
    ></div>
    <!-- Gradiente dal basso, per far risaltare testo e bottoni -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>

    <div class="relative mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center">
      <p class="ritual-eyebrow text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
        Head Spa Experience
      </p>

      <div class="mt-6 flex justify-center">
        <img :src="ritualLogo" alt="Iako Ritual" class="h-24 w-auto object-contain brightness-0 invert sm:h-32" />
      </div>

      <p class="mx-auto mt-8 max-w-md text-base leading-relaxed text-white/85">
        Un rituale di benessere per cute e capelli: massaggio, trattamenti e
        profumi naturali. Ogni anno un frutto diverso guida l'esperienza —
        per il {{ ritualFruit.year }} è il <strong class="text-white">{{ ritualFruit.name }}</strong>
        {{ ritualFruit.emoji }}
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <a
          :href="salon.bookingUrl"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/25 transition-transform hover:scale-105"
        >
          <font-awesome-icon :icon="['fas', 'calendar-check']" />
          Prenota il tuo rituale
        </a>
        <RouterLink
          to="/ritual/contatti"
          class="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white/20"
        >
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          Dove siamo
        </RouterLink>
      </div>

      <p class="mt-6 flex items-center justify-center gap-2 text-sm">
        <span class="h-1.5 w-1.5 rounded-full" :class="status.isOpen ? 'bg-primary' : 'bg-closed'"></span>
        <span class="font-bold text-white/90">
          {{ status.isOpen ? `${status.label} · ${status.detail}` : status.nextOpenLabel }}
        </span>
      </p>
    </div>
  </section>

  <!-- GALLERIA -->
  <section class="mx-auto max-w-6xl px-6 pb-12">
    <div class="mb-8 text-center">
      <p class="ritual-eyebrow text-[0.65rem] font-normal uppercase text-gold sm:text-xs">
        Il rituale
      </p>
      <h2 class="ritual-wordmark mt-2 text-2xl font-semibold text-foreground sm:text-3xl">
        Foto
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
