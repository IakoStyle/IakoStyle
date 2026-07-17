<script setup lang="ts">
import { ref } from 'vue'
import { ritualServices, ritualSeason, salon } from '@/data/salon'
import { useBookingModal } from '@/composables/useBookingModal'

const openItems = ref<Record<string, boolean>>({})
function toggle(name: string) {
  openItems.value[name] = !openItems.value[name]
}
const { open: openBooking } = useBookingModal()

function infoUrl(name: string) {
  const msg = `Ciao! Vorrei avere informazioni sul ${name} di Iako Ritual.`
  return `https://wa.me/39${salon.whatsappNumber}?text=${encodeURIComponent(msg)}`
}
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
      <h1 class="ritual-wordmark mt-5 text-4xl font-semibold text-gold sm:text-5xl">
        I Rituali
      </h1>
      <p class="mx-auto mt-5 max-w-xl text-lg text-muted">
        La collezione stagionale di Iako Ritual: percorsi di benessere per cute e capelli.
      </p>
    </div>
  </section>

  <section class="mx-auto max-w-4xl px-6 pb-16">
    <div class="grid items-start gap-6 sm:grid-cols-2">
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

        <div class="flex-1">
          <button
            class="flex items-center gap-1.5 text-sm font-bold text-gold"
            :aria-expanded="!!openItems[s.name]"
            @click="toggle(s.name)"
          >
            {{ openItems[s.name] ? 'Nascondi dettagli' : 'Scopri di più' }}
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="text-xs transition-transform duration-300"
              :class="openItems[s.name] ? 'rotate-180' : ''"
            />
          </button>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openItems[s.name]" class="mt-3 overflow-hidden text-sm leading-relaxed text-muted [&_p]:mb-3 [&_p:last-child]:mb-0" v-html="s.desc"></div>
          </Transition>
        </div>

        <div class="flex items-center justify-between border-t border-border pt-4">
          <span class="font-display text-2xl font-bold text-gold">€ {{ s.price }}</span>
          <button
            v-if="s.bookable !== false"
            class="rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
            @click="openBooking(s.name, s.treatwellMenuItemId, s.treatwellOptionId)"
          >
            Prenota
          </button>
          <a
            v-else
            :href="infoUrl(s.name)"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105"
          >
            <font-awesome-icon :icon="['fab', 'whatsapp']" />
            Chiedi info
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
