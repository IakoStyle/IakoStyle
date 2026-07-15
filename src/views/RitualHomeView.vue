<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { salon, getOpenStatus } from '@/data/salon'
import { ritualFruit } from '@/data/brands'
import pochetteImg from '@/assets/ritual/pochette.webp'

const status = computed(() => getOpenStatus())
</script>

<template>
  <!-- HERO — il claim del brand, nei font e colori ufficiali -->
  <section class="relative overflow-hidden">
    <!-- Alone decorativo caldo -->
    <div class="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      <div class="absolute -left-16 top-0 h-72 w-72 rounded-full bg-gold-soft opacity-50 blur-3xl"></div>
      <div class="absolute -right-10 top-1/3 h-64 w-64 rounded-full bg-primary-soft opacity-40 blur-3xl"></div>
    </div>

    <div class="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div class="grid items-center gap-12 md:grid-cols-2">
        <!-- Testo -->
        <div class="text-center md:text-left">
          <p class="ritual-eyebrow text-[0.7rem] font-normal uppercase text-gold sm:text-xs">
            Head Spa Experience
          </p>

          <div class="mt-6 flex items-start justify-center gap-2 md:justify-start">
            <div>
              <span class="ritual-wordmark block text-5xl font-semibold text-foreground sm:text-6xl">
                IAKO
              </span>
              <span class="ritual-subword mt-1 block text-sm font-medium text-gold sm:text-base">
                RITUAL
              </span>
            </div>
            <!-- Il frutto dell'anno, come sull'etichetta -->
            <span class="rotate-12 text-3xl leading-none sm:text-4xl" aria-hidden="true">{{ ritualFruit.emoji }}</span>
          </div>

          <!-- Il claim della pochette: EVERYWHERE / linea oro / with you -->
          <div class="mt-10">
            <div class="inline-block">
              <p class="ritual-claim text-3xl font-medium uppercase text-foreground sm:text-4xl">
                Everywhere
              </p>
              <!-- La riga dorata sotto "EVERYWHERE": larga quanto il testo
                   stesso (non il blocco intero, altrimenti si allarga fino
                   a "with you" se più largo, e sporge oltre "EVERYWHERE"). -->
              <svg
                class="mt-1 w-full text-gold"
                viewBox="0 0 300 8"
                fill="none"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M0 5 C 90 2, 210 2, 300 4"
                  stroke="currentColor"
                  stroke-width="2.5"
                  stroke-linecap="round"
                />
              </svg>
            </div>
            <p class="ritual-script -mt-1 text-4xl text-foreground sm:text-5xl">with you</p>
          </div>

          <p class="mx-auto mt-8 max-w-md text-base leading-relaxed text-muted md:mx-0">
            Un rituale di benessere per cute e capelli: massaggio, trattamenti e
            profumi naturali. Ogni anno un frutto diverso guida l'esperienza —
            per il {{ ritualFruit.year }} è il <strong class="text-foreground">{{ ritualFruit.name }}</strong>
            {{ ritualFruit.emoji }}
          </p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
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
              to="/contatti"
              class="flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <font-awesome-icon :icon="['fas', 'location-dot']" />
              Dove siamo
            </RouterLink>
          </div>

          <p class="mt-6 flex items-center justify-center gap-2 text-sm md:justify-start">
            <span class="h-1.5 w-1.5 rounded-full" :class="status.isOpen ? 'bg-primary' : 'bg-closed'"></span>
            <span class="font-bold" :class="status.isOpen ? 'text-primary' : 'text-closed'">
              {{ status.isOpen ? `${status.label} · ${status.detail}` : status.nextOpenLabel }}
            </span>
          </p>
        </div>

        <!-- Immagine -->
        <div class="relative">
          <div class="overflow-hidden rounded-2xl border border-border bg-surface-2 shadow-xl">
            <img
              :src="pochetteImg"
              alt="Pochette Iako Ritual — Everywhere with you"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- IN ARRIVO: servizi e galleria di Ritual -->
  <section class="mx-auto max-w-6xl px-6 pb-20">
    <div class="rounded-2xl border border-dashed border-border bg-surface-2 p-10 text-center">
      <span class="text-3xl">{{ ritualFruit.emoji }}</span>
      <h2 class="mt-3 font-display text-2xl font-bold text-foreground">
        Il rituale sta prendendo forma
      </h2>
      <p class="mx-auto mt-3 max-w-lg text-muted">
        Presto qui trovi i trattamenti, i prezzi e le foto dell'esperienza
        Iako Ritual. Nel frattempo puoi prenotare o passare a trovarci in salone.
      </p>
      <a
        :href="`https://wa.me/39${salon.whatsappNumber}`"
        target="_blank"
        rel="noopener"
        class="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white transition-transform hover:scale-105"
      >
        <font-awesome-icon :icon="['fab', 'whatsapp']" />
        Chiedici info
      </a>
    </div>
  </section>
</template>
