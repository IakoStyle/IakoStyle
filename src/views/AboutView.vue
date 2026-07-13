<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { salon, team } from '@/data/salon'
import BlobDecor from '@/components/BlobDecor.vue'
import StarRating from '@/components/StarRating.vue'
import MediaCarousel from '@/components/MediaCarousel.vue'
import matteoPhoto from '@/assets/team/matteo.webp'

const strengths = [
  { icon: ['fas', 'spa'], title: 'Ambiente', desc: 'Professionale e curato, pensato per farti sentire a tuo agio.' },
  { icon: ['fas', 'scissors'], title: 'Specializzazione', desc: 'Servizi di parrucchieri e barberia per uomo, donna e bambino.' },
  { icon: ['fas', 'leaf'], title: 'Prodotti selezionati', desc: 'Insight e Proraso per lui; ghd, Goldwell, Insight e Redken per lei.' },
]
</script>

<template>
  <!-- INTRO -->
  <section class="relative overflow-hidden">
    <BlobDecor />
    <div class="mx-auto max-w-4xl px-6 py-16 text-center">
      <span class="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-bold text-primary">
        <font-awesome-icon :icon="['fas', 'heart']" />
        Chi siamo
      </span>
      <h1 class="mt-5 font-display text-4xl font-bold text-foreground sm:text-5xl">
        Un salone, tante <span class="text-primary">storie di stile</span>
      </h1>
      <p class="mx-auto mt-5 max-w-2xl text-lg text-muted">
        Iako Style si trova in Via Vincenzo Gioberti 60, a Fondi in provincia di Latina:
        un salone di parrucchieri per uomo, donna e bambino dove rinnovare il proprio look
        con un'esperienza altamente personalizzata.
      </p>
    </div>
  </section>

  <!-- TITOLARE -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="grid items-center gap-8 rounded-2xl border border-border bg-surface p-8 md:grid-cols-2 md:p-12">
      <div>
        <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Il titolare</p>
        <h2 class="mt-1 font-display text-3xl font-bold text-foreground">{{ salon.owner }}</h2>
        <p class="mt-4 text-muted">
          Matteo si prende cura dei capelli di lui e di lei proponendo servizi
          specializzati e su misura di cliente. L'obiettivo è sempre lo stesso: regalare
          un'esperienza altamente personalizzata, dalla consulenza al risultato finale.
        </p>
        <p class="mt-4 rounded-2xl bg-surface-2 p-4 text-sm text-muted">
          <font-awesome-icon :icon="['fas', 'circle-check']" class="mr-2 text-primary" />
          Presto qui: la storia completa del salone, l'esperienza e il percorso del team.
          <em>(sezione da completare con i tuoi testi)</em>
        </p>
      </div>
      <div class="flex items-center justify-center">
        <div class="animate-floaty h-56 w-56 overflow-hidden rounded-2xl bg-gradient-to-br from-primary-soft to-accent-soft p-2">
          <img
            :src="matteoPhoto"
            alt="Matteo Iacovello, titolare di Iako Style"
            class="h-full w-full rounded-xl object-cover"
            style="object-position: 38% 20%"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- PUNTI FORTI -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-8 text-center">
      <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Perché sceglierci</p>
      <h2 class="mt-1 font-display text-3xl font-bold text-foreground">I nostri punti forti</h2>
    </div>
    <div class="grid gap-4 md:grid-cols-3">
      <div
        v-for="s in strengths"
        :key="s.title"
        class="group rounded-xl border border-border bg-surface p-7 text-center transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
      >
        <span class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-soft text-2xl text-primary transition-transform duration-300 group-hover:rotate-6">
          <font-awesome-icon :icon="s.icon" />
        </span>
        <h3 class="mt-4 font-display text-lg font-bold text-foreground">{{ s.title }}</h3>
        <p class="mt-2 text-sm text-muted">{{ s.desc }}</p>
      </div>
    </div>
  </section>

  <!-- TEAM -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-8 text-center">
      <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Le persone</p>
      <h2 class="mt-1 font-display text-3xl font-bold text-foreground">Scopri il team</h2>
    </div>
    <div class="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
      <div
        v-for="(m, i) in team"
        :key="i"
        class="flex items-center gap-4 rounded-xl border border-border bg-surface p-6"
      >
        <span
          v-if="m.photo"
          class="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-surface-2"
        >
          <img
            :src="m.photo"
            :alt="m.name"
            class="h-full w-full object-cover"
            style="object-position: 38% 20%"
          />
        </span>
        <span
          v-else
          class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-soft to-accent-soft text-2xl text-primary"
        >
          <font-awesome-icon :icon="m.icon" />
        </span>
        <div>
          <h3 class="font-display text-lg font-bold text-foreground">{{ m.name }}</h3>
          <p class="text-sm text-muted">{{ m.role }}</p>
          <div class="mt-1 flex items-center gap-2">
            <StarRating class="text-xs" />
            <span class="text-xs text-muted">{{ m.rating.toFixed(1) }} · {{ m.reviews }} recensioni</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- GALLERIA -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="mb-8 text-center">
      <p class="font-display text-sm font-bold uppercase tracking-wide text-primary">Il salone</p>
      <h2 class="mt-1 font-display text-3xl font-bold text-foreground">Dai un'occhiata</h2>
    </div>
    <MediaCarousel />
  </section>

  <!-- CTA -->
  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="flex flex-col items-center gap-5 rounded-2xl bg-surface-2 px-8 py-12 text-center">
      <h2 class="font-display text-2xl font-bold text-foreground sm:text-3xl">Vieni a trovarci</h2>
      <p class="max-w-md text-muted">Prenota il tuo appuntamento o scoprine di più sui contatti.</p>
      <div class="flex flex-wrap justify-center gap-3">
        <a :href="salon.bookingUrl" target="_blank" rel="noopener" class="flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white transition-transform hover:scale-105">
          <font-awesome-icon :icon="['fas', 'calendar-check']" />
          Prenota ora
        </a>
        <RouterLink to="/contatti" class="flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3 font-bold text-foreground transition-colors hover:border-primary hover:text-primary">
          <font-awesome-icon :icon="['fas', 'location-dot']" />
          Contatti
        </RouterLink>
      </div>
    </div>
  </section>
</template>
