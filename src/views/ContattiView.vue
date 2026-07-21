<script setup lang="ts">
import { computed } from 'vue'
import { salon, socials, openingHours, todayIndex, getOpenStatus } from '@/data/salon'
import BlobDecor from '@/components/BlobDecor.vue'

const idx = todayIndex()
const status = computed(() => getOpenStatus())

const mapsEmbed = computed(
  () => `https://www.google.com/maps?q=${encodeURIComponent(salon.mapsQuery)}&output=embed`,
)
const mapsLink = computed(
  () => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(salon.mapsQuery)}`,
)
</script>

<template>
  <section class="relative overflow-hidden">
    <BlobDecor />
    <div class="mx-auto max-w-4xl px-6 py-16 text-center">
      <span class="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-1.5 text-sm font-bold text-primary">
        <font-awesome-icon :icon="['fas', 'location-dot']" />
        Contatti
      </span>
      <h1 class="mt-5 font-display text-4xl font-bold text-foreground sm:text-5xl">
        Passa a <span class="text-primary">trovarci</span>
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-muted">
        Dove siamo, quando siamo aperti e come raggiungerci. Ti aspettiamo!
      </p>
    </div>
  </section>

  <section class="mx-auto grid max-w-6xl gap-6 px-6 pb-12 lg:grid-cols-2">
    <!-- MAPPA -->
    <div class="overflow-hidden rounded-xl border border-border bg-surface">
      <div class="flex items-center gap-3 p-6">
        <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <font-awesome-icon :icon="['fas', 'map-location-dot']" />
        </span>
        <div>
          <h2 class="font-display text-xl font-bold text-foreground">Dove siamo</h2>
          <p class="text-sm text-muted">{{ salon.address }}</p>
        </div>
      </div>
      <iframe
        :src="mapsEmbed"
        class="h-72 w-full border-0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        title="Mappa del salone"
      ></iframe>
      <div class="p-4">
        <a
          :href="mapsLink"
          target="_blank"
          rel="noopener"
          class="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white transition-transform hover:scale-[1.02]"
        >
          <font-awesome-icon :icon="['fas', 'directions']" />
          Ottieni indicazioni
        </a>
      </div>
    </div>

    <!-- ORARI -->
    <div class="rounded-xl border border-border bg-surface p-6">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div class="flex items-center gap-3">
          <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
            <font-awesome-icon :icon="['fas', 'clock']" />
          </span>
          <h2 class="font-display text-xl font-bold text-foreground">Orari</h2>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span
            class="flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold"
            :class="status.isOpen ? 'bg-primary-soft text-primary' : 'bg-closed-soft text-closed'"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="status.isOpen ? 'bg-primary' : 'bg-closed'"></span>
            {{ status.isOpen ? `${status.label} · ${status.detail}` : status.nextOpenLabel }}
          </span>
          <span class="flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-bold text-gold">
            <font-awesome-icon :icon="['fas', 'sun']" />
            {{ salon.seasonLabel }}
          </span>
        </div>
      </div>
      <ul class="mt-5 space-y-1.5">
        <li
          v-for="(d, i) in openingHours"
          :key="d.day"
          class="flex items-center justify-between gap-3 rounded-2xl px-4 py-3 text-sm"
          :class="i === idx
            ? (status.isOpen ? 'bg-primary-soft font-bold text-primary' : 'bg-closed-soft font-bold text-closed')
            : 'text-foreground'"
        >
          <span class="flex items-center gap-2">
            <font-awesome-icon
              v-if="i === idx"
              :icon="[ 'fas', status.isOpen ? 'circle-check' : 'circle-exclamation' ]"
            />
            {{ d.day }}
            <span
              v-if="i === idx"
              class="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
              :class="status.isOpen ? 'bg-primary' : 'bg-closed'"
            >Oggi</span>
          </span>
          <span class="text-right" :class="d.closed ? 'font-bold text-closed' : ''">{{ d.hours }}</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- RECAPITI + SOCIAL -->
  <section class="mx-auto grid max-w-6xl gap-6 px-6 pb-12 lg:grid-cols-2">
    <div class="rounded-xl border border-border bg-surface p-6">
      <div class="flex items-center gap-3">
        <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-soft text-accent">
          <font-awesome-icon :icon="['fas', 'phone']" />
        </span>
        <h2 class="font-display text-xl font-bold text-foreground">Recapiti</h2>
      </div>
      <ul class="mt-5 space-y-3">
        <li>
          <a
            :href="`tel:+39${salon.whatsappNumber}`"
            class="flex items-center gap-3 rounded-2xl bg-surface-2 p-4 transition-colors hover:bg-primary-soft"
          >
            <font-awesome-icon :icon="['fas', 'phone']" class="text-xl text-primary" />
            <span>
              <span class="block text-xs text-muted">Telefono</span>
              <span class="font-bold text-foreground">{{ salon.whatsappDisplay }}</span>
            </span>
          </a>
        </li>
        <li>
          <div class="flex items-start gap-3 rounded-2xl bg-surface-2 p-4">
            <font-awesome-icon :icon="['fas', 'location-dot']" class="mt-1 text-primary" />
            <span class="text-foreground">{{ salon.address }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- SOCIAL -->
    <div class="rounded-xl border border-border bg-surface p-6">
      <div class="flex items-center gap-3">
        <span class="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-soft text-gold">
          <font-awesome-icon :icon="['fas', 'heart']" />
        </span>
        <h2 class="font-display text-xl font-bold text-foreground">Seguici</h2>
      </div>
      <div class="mt-5 grid gap-3 sm:grid-cols-3">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.url"
          target="_blank"
          rel="noopener"
          class="group flex flex-col items-center gap-2 rounded-2xl bg-surface-2 p-4 text-center transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-white"
        >
          <font-awesome-icon :icon="s.icon" class="text-2xl" />
          <span class="text-sm font-bold">{{ s.label }}</span>
        </a>
      </div>
      <a
        :href="salon.bookingUrl"
        target="_blank"
        rel="noopener"
        class="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3.5 font-bold text-white ring-1 ring-gold/40 transition-transform hover:scale-[1.02]"
      >
        <font-awesome-icon :icon="['fas', 'calendar-check']" />
        Prenota su Treatwell
      </a>
    </div>
  </section>
</template>
