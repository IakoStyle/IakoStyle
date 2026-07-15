<script setup lang="ts">
import { salon, ritualServices, ritualSeason } from '@/data/salon'
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-gold-soft opacity-50 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto max-w-4xl px-6 py-16 text-center">
      <p class="ritual-eyebrow text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
        {{ ritualSeason }}
      </p>
      <h1 class="ritual-wordmark mt-5 text-4xl font-semibold text-foreground sm:text-5xl">
        I <span class="text-gold">Rituali</span>
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-muted">
        La collezione stagionale di Iako Ritual: due percorsi di benessere per cute e capelli.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-4xl px-6 pb-16">
    <div class="grid gap-6 sm:grid-cols-2">
      <div
        v-for="s in ritualServices"
        :key="s.name"
        class="flex flex-col gap-4 rounded-xl border border-border bg-surface p-6"
      >
        <div>
          <h2 class="ritual-wordmark text-2xl font-semibold text-foreground">{{ s.name }}</h2>
          <p class="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <font-awesome-icon :icon="['fas', 'clock']" class="text-xs" />
            {{ s.duration }}
          </p>
        </div>
        <p class="flex-1 text-sm leading-relaxed text-muted">{{ s.desc }}</p>
        <div class="flex items-center justify-between border-t border-border pt-4">
          <span class="font-display text-2xl font-bold text-gold">€ {{ s.price }}</span>
          <a
            :href="salon.bookingUrl"
            target="_blank"
            rel="noopener"
            class="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            Prenota
          </a>
        </div>
      </div>
    </div>

    <p class="mt-8 text-center text-sm text-muted">
      <font-awesome-icon :icon="['fas', 'circle-check']" class="mr-1 text-gold" />
      Ogni stagione porta un nuovo rituale: la collezione si rinnova nel tempo.
    </p>
  </section>
</template>
