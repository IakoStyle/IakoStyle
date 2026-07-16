<script setup lang="ts">
import { RouterLink } from 'vue-router'
import styleLogoUrl from '@/assets/logo-iako.webp'
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-gold-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <!-- Logo -->
      <img :src="styleLogoUrl" alt="Iako Style" class="h-24 w-auto object-contain sm:h-28" />

      <!-- Riquadro di scelta, come da bozzetto -->
      <div class="mt-12 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div class="grid grid-cols-2">
          <RouterLink
            to="/style"
            class="group flex flex-col items-center justify-center gap-2 border-r border-border px-6 py-14 transition-colors hover:bg-primary-soft/40"
          >
            <font-awesome-icon :icon="['fas', 'scissors']" class="text-2xl text-primary transition-transform group-hover:scale-110" />
            <span class="font-display text-2xl font-semibold text-foreground">Studio</span>
            <span class="text-xs text-muted">Parrucchiere</span>
          </RouterLink>
          <RouterLink
            to="/ritual"
            class="group flex flex-col items-center justify-center gap-2 px-6 py-14 transition-colors hover:bg-gold-soft/40"
          >
            <font-awesome-icon :icon="['fas', 'spa']" class="text-2xl text-gold transition-transform group-hover:scale-110" />
            <span class="ritual-wordmark text-2xl font-semibold text-foreground">Ritual</span>
            <span class="text-xs text-muted">Head Spa Experience</span>
          </RouterLink>
        </div>

        <RouterLink
          to="/with-you"
          class="group block border-t border-border px-6 py-8 transition-colors hover:bg-gold-soft/30"
        >
          <span class="ritual-claim inline-block text-xl font-medium uppercase text-foreground transition-transform group-hover:scale-105 sm:text-2xl">
            Everywhere
          </span>
          <svg
            class="mx-auto mt-0.5 w-40 text-gold sm:w-48"
            viewBox="0 0 300 10"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,5 C 40,1.5 100,0.5 150,0.5 C 200,0.5 260,3 300,10"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
            />
          </svg>
          <span class="ritual-script -mt-1 block text-2xl text-foreground sm:text-3xl">with you</span>
        </RouterLink>
      </div>

      <p class="mt-8 text-sm text-muted">Scegli il mondo che vuoi scoprire.</p>

      <!-- Pagine condivise: raggiungibili solo da qui, non duplicate
           nel menu di ogni marchio. -->
      <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
        <RouterLink
          to="/chi-siamo"
          class="flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <font-awesome-icon :icon="['fas', 'heart']" />
          Chi Siamo
        </RouterLink>
        <RouterLink
          to="/contatti"
          class="flex items-center gap-2 rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          Contatti
        </RouterLink>
      </div>
    </div>
  </section>
</template>
