<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { salon, services, macroServices, reviews, getOpenStatus } from '@/data/salon'
import BlobDecor from '@/components/BlobDecor.vue'
import MediaCarousel from '@/components/MediaCarousel.vue'
import ServiceCard from '@/components/ServiceCard.vue'
import ReviewCard from '@/components/ReviewCard.vue'
import StarRating from '@/components/StarRating.vue'

const featured = services.filter((s) => s.featured)

const status = computed(() => getOpenStatus())
</script>

<template>
  <!-- HERO -->
  <section class="relative overflow-hidden">
    <BlobDecor />
    <div class="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-14 md:grid-cols-2 md:pt-20">
      <div class="animate-pop-in">
        <span class="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-bold text-primary">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          {{ salon.city }}
        </span>
        <h1 class="mt-5 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
          Il tuo look,<br />
          <span class="text-primary">su misura</span><span class="text-accent">.</span>
        </h1>
        <p class="mt-5 max-w-md text-lg text-muted">
          Salone di parrucchieri per uomo, donna e bambino. Taglio, colore, barba e
          trattamenti curati nei minimi dettagli da {{ salon.owner }}.
        </p>

        <div class="mt-7 flex flex-wrap items-center gap-3">
          <a
            :href="salon.bookingUrl"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 font-bold text-white shadow-lg shadow-primary/30 transition-transform hover:scale-105"
          >
            <font-awesome-icon :icon="['fas', 'calendar-check']" />
            Prenota ora
          </a>
          <RouterLink
            to="/listino"
            class="flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Vedi il listino
            <font-awesome-icon :icon="['fas', 'arrow-right']" />
          </RouterLink>
        </div>

        <div class="mt-8 flex items-center gap-3">
          <StarRating class="text-lg" />
          <span class="font-display text-lg font-bold text-foreground">{{ salon.rating.toFixed(1) }}</span>
          <span class="text-sm text-muted">· {{ salon.reviewsCount }} recensioni</span>
        </div>
      </div>

      <div class="relative animate-pop-in">
        <div class="animate-floaty rounded-2xl bg-gradient-to-br from-primary-soft via-surface to-accent-soft p-8 shadow-xl">
          <div class="rounded-xl bg-surface p-8">
            <div class="flex items-center justify-between">
              <span class="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white p-1.5 ring-1 ring-border">
                <img src="@/assets/logo-iako.jpg" alt="Iako Style" class="h-full w-full object-contain" />
              </span>
              <span
                class="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
                :class="status.isOpen ? 'bg-primary-soft text-primary' : 'bg-closed-soft text-closed'"
              >
                <span
                  class="h-1.5 w-1.5 rounded-full"
                  :class="status.isOpen ? 'bg-primary' : 'bg-closed'"
                ></span>
                {{ status.label }} · {{ status.detail }}
              </span>
            </div>
            <p class="mt-6 font-display text-2xl font-bold text-foreground">Iako Style</p>
            <p class="mt-1 text-sm text-muted">{{ salon.address }}</p>
            <div class="mt-6 grid grid-cols-3 gap-3 text-center">
              <div class="rounded-2xl bg-surface-2 py-3">
                <p class="font-display text-xl font-bold text-primary">5.0</p>
                <p class="text-xs text-muted">Rating</p>
              </div>
              <div class="rounded-2xl bg-surface-2 py-3">
                <p class="font-display text-xl font-bold text-primary">116</p>
                <p class="text-xs text-muted">Recensioni</p>
              </div>
              <div class="rounded-2xl bg-surface-2 py-3">
                <p class="font-display text-xl font-bold text-primary">1</p>
                <p class="text-xs text-muted">Salone</p>
              </div>
            </div>
          </div>
        </div>
        <div class="animate-floaty-slow absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold text-2xl text-white shadow-lg">
          <font-awesome-icon :icon="['fas', 'heart']" />
        </div>
      </div>
    </div>
  </section>

  <!-- MACRO SERVIZI -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="m in macroServices"
        :key="m.label"
        class="group rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
      >
        <span class="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-xl text-accent transition-transform duration-300 group-hover:rotate-6">
          <font-awesome-icon :icon="m.icon" />
        </span>
        <h3 class="mt-4 font-display text-lg font-bold text-foreground">{{ m.label }}</h3>
        <p class="mt-1 text-sm text-muted">{{ m.desc }}</p>
      </div>
    </div>
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
    <div class="grid gap-4 md:grid-cols-2">
      <ServiceCard v-for="s in featured" :key="s.name" :service="s" />
    </div>
  </section>

  <!-- GALLERIA / CAROSELLO -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-8 text-center">
      <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Il salone</p>
      <h2 class="mt-1 font-display text-3xl font-bold text-foreground">Foto &amp; video</h2>
      <p class="mx-auto mt-2 max-w-md text-muted">
        Uno sguardo tra tagli, colori e atmosfera. Scorri la galleria.
      </p>
    </div>
    <MediaCarousel />
  </section>

  <!-- RECENSIONI -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Dicono di noi</p>
        <h2 class="mt-1 font-display text-3xl font-bold text-foreground">Recensioni verificate</h2>
      </div>
      <a :href="salon.reviewsUrl" target="_blank" rel="noopener" class="flex items-center gap-2 font-bold text-primary hover:underline">
        Tutte le recensioni
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </a>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <ReviewCard v-for="r in reviews.slice(0, 3)" :key="r.author" :review="r" />
    </div>
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
