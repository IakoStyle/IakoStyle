<script setup lang="ts">
import { ref, computed } from 'vue'
import { salon, services, serviceCategories } from '@/data/salon'
import BlobDecor from '@/components/BlobDecor.vue'
import ServiceCard from '@/components/ServiceCard.vue'

const active = ref('Tutti')

const filtered = computed(() =>
  active.value === 'Tutti'
    ? services
    : services.filter((s) => s.category === active.value),
)

function count(cat: string) {
  return cat === 'Tutti' ? services.length : services.filter((s) => s.category === cat).length
}
</script>

<template>
  <section class="relative overflow-hidden">
    <BlobDecor />
    <div class="mx-auto max-w-4xl px-6 py-16 text-center">
      <span class="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-bold text-primary">
        <font-awesome-icon :icon="['fas', 'scissors']" />
        Listino
      </span>
      <h1 class="mt-5 font-display text-4xl font-bold text-foreground sm:text-5xl">
        Servizi &amp; <span class="text-primary">prezzi</span>
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-muted">
        Ogni servizio è pensato su misura. Filtra per categoria e prenota quello che fa per te.
      </p>
    </div>
  </section>

  <!-- SERVIZI CON NOME E PREZZO -->
  <section class="mx-auto max-w-6xl px-6 pb-16">
    <div class="no-scrollbar mb-8 flex gap-2 overflow-x-auto pb-2">
      <button
        v-for="cat in serviceCategories"
        :key="cat"
        class="flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold transition-colors"
        :class="active === cat
          ? 'border-primary bg-primary text-white'
          : 'border-border bg-surface text-muted hover:border-primary hover:text-primary'"
        @click="active = cat"
      >
        {{ cat }}
        <span
          class="rounded-full px-1.5 text-xs"
          :class="active === cat ? 'bg-white/25' : 'bg-surface-2'"
        >{{ count(cat) }}</span>
      </button>
    </div>

    <TransitionGroup
      tag="div"
      class="columns-1 gap-4 md:columns-2"
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
    >
      <div v-for="s in filtered" :key="s.name + s.category" class="mb-4 break-inside-avoid-column">
        <ServiceCard :service="s" />
      </div>
    </TransitionGroup>

    <p class="mt-8 text-center text-sm text-muted">
      <font-awesome-icon :icon="['fas', 'circle-check']" class="mr-1 text-primary" />
      Alcuni servizi hanno prezzo variabile in base all'opzione scelta: tocca la card per vedere tutti i dettagli.
    </p>

    <div class="mt-8 text-center">
      <a
        :href="salon.bookingUrl"
        target="_blank"
        rel="noopener"
        class="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-bold text-white shadow-lg shadow-primary/30 ring-1 ring-gold/40 transition-transform hover:scale-105"
      >
        <font-awesome-icon :icon="['fas', 'calendar-check']" />
        Prenota ora
      </a>
    </div>
  </section>
</template>
