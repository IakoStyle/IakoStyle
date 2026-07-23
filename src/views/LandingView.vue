<script setup lang="ts">
import { RouterLink } from 'vue-router'
import styleLogoUrl from '@/assets/logo-iako.webp'
import { salon, reviews, totalReviewsCount } from '@/data/salon'
import ReviewCard from '@/components/ReviewCard.vue'
import StarRating from '@/components/StarRating.vue'
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-gold-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 py-16 text-center">
      <!-- Logo (elemento LCP: caricato con priorità alta, non lazy) -->
      <img
        :src="styleLogoUrl"
        alt="Iako Style — parrucchiere a Fondi (LT)"
        width="301"
        height="320"
        fetchpriority="high"
        decoding="async"
        class="h-24 w-auto object-contain sm:h-28"
      />

      <!-- Titolo principale della home: fondamentale per la SEO (il motore
           di ricerca legge l'H1 come argomento della pagina). Il logo resta
           l'elemento grafico; il testo è pensato per i lettori di schermo e
           per Google, con le parole chiave del salone. -->
      <h1 class="sr-only">Iako Style — Parrucchiere &amp; Head Spa a Fondi (LT)</h1>

      <!-- Riquadro di scelta, come da bozzetto -->
      <div class="mt-12 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div class="grid grid-cols-2">
          <RouterLink
            to="/style"
            class="group relative flex flex-col items-center justify-center gap-2 overflow-hidden border-r border-border px-6 py-14"
          >
            <img
              src="/scelte/studio.webp"
              alt=""
              aria-hidden="true"
              width="640"
              height="640"
              decoding="async"
              class="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-40"
            />
            <div
              class="absolute inset-0"
              style="background: radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.35) 100%)"
            ></div>
            <font-awesome-icon :icon="['fas', 'scissors']" class="relative text-2xl text-primary transition-transform group-hover:scale-110" />
            <span class="relative font-display text-2xl font-semibold text-foreground">Studio</span>
            <span class="relative text-xs font-medium text-foreground/80">Parrucchiere</span>
          </RouterLink>
          <RouterLink
            to="/ritual"
            class="group relative flex flex-col items-center justify-center gap-2 overflow-hidden px-6 py-14"
          >
            <img
              src="/scelte/ritual.webp"
              alt=""
              aria-hidden="true"
              width="640"
              height="640"
              decoding="async"
              class="absolute inset-0 h-full w-full object-cover opacity-30 transition-transform duration-500 group-hover:scale-105 group-hover:opacity-40"
            />
            <div
              class="absolute inset-0"
              style="background: radial-gradient(ellipse at center, transparent 15%, rgba(0,0,0,0.35) 100%)"
            ></div>
            <font-awesome-icon :icon="['fas', 'spa']" class="relative text-2xl text-gold transition-transform group-hover:scale-110" />
            <span class="ritual-wordmark relative text-2xl font-semibold text-foreground">Ritual</span>
            <span class="relative text-xs font-medium text-foreground/80">Head Spa Experience</span>
          </RouterLink>
        </div>

        <RouterLink
          to="/with-you"
          class="group relative flex flex-col items-center overflow-hidden border-t border-border px-6 py-8 transition-colors"
          style="background-color: #A19790"
        >
          <div class="relative transition-transform group-hover:scale-105">
            <span class="ritual-claim block text-xl font-medium uppercase sm:text-2xl" style="color: #4a3428">
              Everywhere
            </span>
            <svg
              class="absolute inset-x-0 top-full mt-0.5"
              viewBox="0 0 300 10"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
              style="color: #966706"
            >
              <path
                d="M0,5 C 40,1.5 100,0.5 150,0.5 C 200,0.5 260,3 300,10"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <span class="ritual-script mt-2 block text-2xl sm:text-3xl" style="color: #4a3428">with you</span>
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

  <!-- RECENSIONI — trasferite qui dalla home di Iako Style, dato che
       valgono per l'intera attività e non solo per lo Studio. -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-8 flex flex-col items-center gap-3 text-center">
      <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Cosa dicono di noi</p>
      <h2 class="font-display text-3xl font-bold text-foreground">Recensioni verificate</h2>
      <span class="flex items-center gap-2">
        <StarRating class="text-lg" />
        <span class="font-display font-bold text-foreground">{{ salon.rating.toFixed(1) }}</span>
        <span class="text-sm text-muted">· {{ totalReviewsCount() }}+ recensioni</span>
      </span>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <ReviewCard v-for="r in reviews.slice(0, 3)" :key="r.author" :review="r" />
    </div>
    <div class="mt-8 flex flex-wrap justify-center gap-3 text-center">
      <a
        :href="salon.googleMapsReviewUrl"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105"
      >
        <font-awesome-icon :icon="['fas', 'star']" class="text-gold" />
        Lascia una recensione su Google
      </a>
      <a
        :href="salon.reviewsUrl"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <font-awesome-icon :icon="['fas', 'star']" class="text-gold" />
        Lascia una recensione su Treatwell
      </a>
    </div>
  </section>
</template>
