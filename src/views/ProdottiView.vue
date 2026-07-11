<script setup lang="ts">
import { computed } from 'vue'
import { products } from '@/data/salon'
import BlobDecor from '@/components/BlobDecor.vue'

const uomo = computed(() => products.filter((p) => p.reparto === 'Uomo'))
const donna = computed(() => products.filter((p) => p.reparto === 'Donna'))
const tricologia = computed(() => products.filter((p) => p.reparto === 'Tricologia'))
</script>

<template>
  <section class="relative overflow-hidden">
    <BlobDecor />
    <div class="mx-auto max-w-4xl px-6 py-16 text-center">
      <span class="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-bold text-primary">
        <font-awesome-icon :icon="['fas', 'spray-can-sparkles']" />
        Prodotti usati
      </span>
      <h1 class="mt-5 font-display text-4xl font-bold text-foreground sm:text-5xl">
        Solo <span class="text-primary">marche</span> che amiamo
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-muted">
        Lavoriamo con prodotti professionali selezionati per ogni esigenza, dal reparto
        uomo a quello donna, fino alla cura tricologica.
      </p>
    </div>
  </section>

  <!-- REPARTO UOMO -->
  <section class="mx-auto max-w-6xl px-6 py-8">
    <div class="mb-6 flex items-center gap-3">
      <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <font-awesome-icon :icon="['fas', 'wand-magic-sparkles']" />
      </span>
      <h2 class="font-display text-2xl font-bold text-foreground">Reparto Uomo</h2>
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="p in uomo"
        :key="p.brand"
        class="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-accent/10"
      >
        <div v-if="p.image" class="aspect-[16/10] w-full overflow-hidden bg-surface-2">
          <img :src="p.image" :alt="p.brand" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between">
            <h3 class="font-display text-xl font-bold text-foreground">{{ p.brand }}</h3>
            <span class="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent">Uomo</span>
          </div>
          <p class="mt-2 text-sm text-muted">{{ p.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- REPARTO DONNA -->
  <section class="mx-auto max-w-6xl px-6 py-8">
    <div class="mb-6 flex items-center gap-3">
      <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
        <font-awesome-icon :icon="['fas', 'palette']" />
      </span>
      <h2 class="font-display text-2xl font-bold text-foreground">Reparto Donna</h2>
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="p in donna"
        :key="p.brand + p.desc"
        class="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
      >
        <div v-if="p.image" class="aspect-[16/10] w-full overflow-hidden bg-surface-2">
          <img :src="p.image" :alt="p.brand" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between">
            <h3 class="font-display text-xl font-bold text-foreground">{{ p.brand }}</h3>
            <span class="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">Donna</span>
          </div>
          <p class="mt-2 text-sm text-muted">{{ p.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- TRICOLOGIA -->
  <section class="mx-auto max-w-6xl px-6 py-8">
    <div class="mb-6 flex items-center gap-3">
      <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-soft text-gold">
        <font-awesome-icon :icon="['fas', 'hand-sparkles']" />
      </span>
      <h2 class="font-display text-2xl font-bold text-foreground">Cura Tricologica</h2>
    </div>
    <div class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="p in tricologia"
        :key="p.brand"
        class="group overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-lg hover:shadow-gold/10"
      >
        <div v-if="p.image" class="aspect-[16/10] w-full overflow-hidden bg-surface-2">
          <img :src="p.image" :alt="p.brand" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </div>
        <div class="p-6">
          <div class="flex items-center justify-between">
            <h3 class="font-display text-xl font-bold text-foreground">{{ p.brand }}</h3>
            <span class="rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-gold">Tricologia</span>
          </div>
          <p class="mt-2 text-sm text-muted">{{ p.desc }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 py-12">
    <div class="rounded-xl bg-surface-2 p-8 text-center">
      <font-awesome-icon :icon="['fas', 'leaf']" class="text-3xl text-primary" />
      <p class="mx-auto mt-3 max-w-lg text-muted">
        Ti consigliamo sempre il prodotto giusto per mantenere il risultato a casa, dopo
        ogni trattamento.
      </p>
    </div>
  </section>
</template>
