<script setup lang="ts">
import { ritualProducts } from '@/data/salon'
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-gold-soft opacity-50 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto max-w-4xl px-6 py-16 text-center">
      <p class="ritual-eyebrow text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
        Prodotti usati
      </p>
      <h1 class="ritual-wordmark mt-5 text-4xl font-semibold text-foreground sm:text-5xl">
        {{ ritualProducts.brand }} <span class="text-gold">{{ ritualProducts.line }}</span>
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-muted">
        {{ ritualProducts.tagline }}
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 pb-8">
    <div class="grid gap-4 sm:grid-cols-3">
      <div
        v-for="img in ritualProducts.images"
        :key="img.src"
        class="group overflow-hidden rounded-xl border border-border bg-surface"
      >
        <div class="aspect-[4/5] w-full overflow-hidden bg-surface-2">
          <img
            :src="img.src"
            :alt="img.alt"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <p v-if="img.caption" class="p-4 text-sm font-semibold text-foreground">{{ img.caption }}</p>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-3xl px-6 pb-16">
    <div class="rounded-xl border border-border bg-surface p-8 text-center">
      <p class="text-muted">{{ ritualProducts.desc }}</p>
      <div class="mt-6 flex flex-wrap justify-center gap-2">
        <span
          v-for="h in ritualProducts.highlights"
          :key="h"
          class="rounded-full bg-gold-soft px-4 py-1.5 text-sm font-bold text-gold"
        >
          {{ h }}
        </span>
      </div>
    </div>
  </section>
</template>
