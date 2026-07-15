<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { salon, getOpenStatus } from '@/data/salon'
import { ritualFruit } from '@/data/brands'
import { ritualGallery } from '@/data/media'
import ritualLogo from '@/assets/ritual/logo-ritual.webp'
import MediaCarousel from '@/components/MediaCarousel.vue'

const status = computed(() => getOpenStatus())
</script>

<template>
  <!-- HERO -->
  <section class="relative overflow-hidden">
    <!-- Alone decorativo caldo -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-gold-soft opacity-50 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
      <p class="ritual-eyebrow text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
        Head Spa Experience
      </p>

      <div class="mt-6 flex justify-center">
        <img :src="ritualLogo" alt="Iako Ritual" class="h-24 w-auto object-contain sm:h-32" />
      </div>

      <p class="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted">
        Un rituale di benessere per cute e capelli: massaggio, trattamenti e
        profumi naturali. Ogni anno un frutto diverso guida l'esperienza —
        per il {{ ritualFruit.year }} è il <strong class="text-foreground">{{ ritualFruit.name }}</strong>
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
          class="flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          Dove siamo
        </RouterLink>
      </div>

      <p class="mt-6 flex items-center justify-center gap-2 text-sm">
        <span class="h-1.5 w-1.5 rounded-full" :class="status.isOpen ? 'bg-primary' : 'bg-closed'"></span>
        <span class="font-bold" :class="status.isOpen ? 'text-primary' : 'text-closed'">
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

  <!-- Rimandi a Listino e Prodotti -->
  <section class="mx-auto max-w-6xl px-6 pb-20">
    <div class="grid gap-4 sm:grid-cols-2">
      <RouterLink
        to="/ritual/listino"
        class="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:shadow-gold/10"
      >
        <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold transition-transform duration-300 group-hover:rotate-6">
          <font-awesome-icon :icon="['fas', 'spa']" />
        </span>
        <h3 class="mt-4 ritual-wordmark text-lg font-semibold text-foreground">I Rituali</h3>
        <p class="mt-1 text-sm text-muted">Scopri Rituale Origine e Rituale Rinascita, prezzi e durata.</p>
      </RouterLink>
      <RouterLink
        to="/ritual/prodotti"
        class="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:shadow-gold/10"
      >
        <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-soft text-gold transition-transform duration-300 group-hover:rotate-6">
          <font-awesome-icon :icon="['fas', 'leaf']" />
        </span>
        <h3 class="mt-4 ritual-wordmark text-lg font-semibold text-foreground">Prodotti usati</h3>
        <p class="mt-1 text-sm text-muted">Nubea Sursum, il trattamento coadiuvante anticaduta.</p>
      </RouterLink>
    </div>
  </section>
</template>
