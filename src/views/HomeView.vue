<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { salon, services, getOpenStatus } from '@/data/salon'
import MediaCarousel from '@/components/MediaCarousel.vue'
import ServiceCard from '@/components/ServiceCard.vue'

const heroPhoto = '/studio/salone-ingresso.jpg'

const featuredOrder = [
  'Taglio Uomo | Benessere Cute',
  'Taglio Donna | Benessere Cute',
  'Piega Illuminante',
  'Piega Benessere',
]
const featured = featuredOrder
  .map((name) => services.find((s) => s.name === name))
  .filter((s): s is (typeof services)[number] => !!s)

const status = computed(() => getOpenStatus())
</script>

<template>
  <!-- HERO: banner fotografico con vignetta -->
  <section class="relative min-h-[28rem] w-full overflow-hidden py-14 sm:min-h-[26rem]">
    <img
      :src="heroPhoto"
      alt="Interno del salone Iako Style"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <!-- Scurimento uniforme -->
    <div class="absolute inset-0 bg-black/50"></div>
    <!-- Vignetta: bordi più scuri, centro più leggibile -->
    <div
      class="absolute inset-0"
      style="background: radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.55) 100%)"
    ></div>
    <!-- Gradiente dal basso, per far risaltare testo e bottoni -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent"></div>

    <div class="relative mx-auto flex h-full max-w-6xl flex-col justify-center px-6">
      <span class="inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold text-white ring-1 ring-white/25 backdrop-blur-sm">
        <font-awesome-icon :icon="['fas', 'location-dot']" />
        {{ salon.city }}
      </span>

      <h1 class="mt-5 font-display text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
        Il tuo look,<br />
        <span class="text-gold">su misura</span><span class="text-white">.</span>
      </h1>

      <p class="mt-4 max-w-xl text-base font-medium text-white/90 sm:text-lg">
        Iako Style, parrucchiere a Fondi (LT) per uomo, donna e bambino: taglio, colore, barba e trattamenti benessere per cute e capelli.
      </p>

      <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span class="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/25 backdrop-blur-sm">
          <span class="h-1.5 w-1.5 rounded-full" :class="status.isOpen ? 'bg-primary' : 'bg-closed'"></span>
          {{ status.isOpen ? `${status.label} · ${status.detail}` : status.nextOpenLabel }}
        </span>
      </div>

      <div class="mt-7 flex flex-wrap items-center gap-3">
        <a
          :href="salon.bookingUrl"
          target="_blank"
          rel="noopener"
          class="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-black/30 transition-transform hover:scale-105"
        >
          <font-awesome-icon :icon="['fas', 'calendar-check']" />
          Prenota ora
        </a>
        <RouterLink
          to="/listino"
          class="flex items-center gap-2 rounded-full bg-white/10 px-6 py-3.5 font-bold text-white ring-1 ring-white/30 backdrop-blur-sm transition-colors hover:bg-white/20"
        >
          Vedi il listino
          <font-awesome-icon :icon="['fas', 'arrow-right']" />
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Testo descrittivo -->
  <section class="mx-auto max-w-2xl px-6 py-12 text-center">
    <p class="text-lg text-muted">
      Salone di parrucchieri per uomo, donna e bambino. Taglio, colore, barba e
      trattamenti curati nei minimi dettagli da {{ salon.owner }}.
    </p>
  </section>

  <!-- SERVIZI PIÙ RICHIESTI -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Preferiti dai clienti</p>
        <h2 class="mt-1 font-display text-3xl font-bold text-foreground">Servizi più richiesti</h2>
      </div>
      <RouterLink to="/listino" class="flex items-center gap-2 font-bold text-primary hover:underline">
        Tutti i servizi
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </RouterLink>
    </div>
    <div class="columns-1 gap-4 md:columns-2">
      <div v-for="s in featured" :key="s.name" class="mb-4 break-inside-avoid-column">
        <ServiceCard :service="s" />
      </div>
    </div>
  </section>

  <!-- GALLERIA -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-8 text-center">
      <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Il salone</p>
      <h2 class="mt-1 font-display text-3xl font-bold text-foreground">Foto</h2>
      <p class="mx-auto mt-2 max-w-md text-muted">
        Uno sguardo tra tagli, colori e atmosfera. Scorri la galleria.
      </p>
    </div>
    <MediaCarousel />
  </section>

  <!-- CTA -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="relative overflow-hidden rounded-2xl bg-primary px-8 py-14 text-center">
      <div class="absolute -left-6 -top-6 h-32 w-32 rounded-full bg-surface/10"></div>
      <div class="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-surface/10"></div>
      <h2 class="relative font-display text-3xl font-bold text-white sm:text-4xl">Pronti a rinnovare il look?</h2>
      <p class="relative mx-auto mt-3 max-w-md text-white/90">
        Prenota il tuo appuntamento in pochi tap e lasciati coccolare.
      </p>
      <a
        :href="salon.bookingUrl"
        target="_blank"
        rel="noopener"
        class="relative mt-7 inline-flex items-center gap-2 rounded-full bg-surface px-7 py-3.5 font-bold text-primary shadow-lg transition-transform hover:scale-105"
      >
        <font-awesome-icon :icon="['fas', 'calendar-check']" />
        Prenota ora
      </a>
    </div>
  </section>
</template>
