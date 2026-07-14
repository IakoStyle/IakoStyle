<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useBrand } from '@/composables/useBrand'
import { salon } from '@/data/salon'
import BrandSwitch from '@/components/BrandSwitch.vue'
import logoUrl from '@/assets/logo-iako.webp'

const { isDark, toggle } = useTheme()
const { brand, isRitual } = useBrand()
const menuOpen = ref(false)

// Ogni marchio ha la propria navigazione. Le pagine condivise
// (contatti, privacy) restano uniche: stesso salone, stessa sede.
const styleLinks = [
  { to: '/', label: 'Home' },
  { to: '/chi-siamo', label: 'Chi Siamo' },
  { to: '/listino', label: 'Listino' },
  { to: '/prodotti', label: 'Prodotti' },
  { to: '/contatti', label: 'Contatti' },
]

const ritualLinks = [
  { to: '/ritual', label: 'Home' },
  { to: '/ritual/prodotti', label: 'Prodotti' },
  { to: '/ritual/contatti', label: 'Contatti' },
]

const links = computed(() => (isRitual.value ? ritualLinks : styleLinks))
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
    <nav class="relative mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
      <!-- Logo + nome del marchio attivo -->
      <RouterLink :to="brand.basePath" class="flex shrink-0 items-center gap-2" @click="menuOpen = false">
        <span class="flex items-center justify-center rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-border">
          <img :src="logoUrl" :alt="brand.name" class="h-9 w-9 object-contain" />
        </span>
        <span v-if="!isRitual" class="hidden font-display text-xl font-bold text-foreground lg:block">
          Iako <span class="text-primary">Style</span>
        </span>
        <span v-else class="hidden text-left leading-tight lg:block">
          <span class="ritual-wordmark block text-lg font-semibold text-foreground">IAKO</span>
          <span class="ritual-subword block text-[0.6rem] font-medium text-gold">RITUAL</span>
        </span>
      </RouterLink>

      <!-- Switch tra i due marchi: ancorato al centro esatto dello schermo,
           indipendente dalla larghezza dei link a destra (che cambiano tra
           Style e Ritual) — altrimenti "justify-between" lo spostava fuori
           centro ogni volta che i due lati avevano larghezze diverse. -->
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <BrandSwitch />
      </div>

      <!-- Link desktop -->
      <div class="hidden items-center gap-1 md:flex">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="rounded-full px-4 py-2 text-sm font-bold text-muted transition-colors hover:bg-primary-soft hover:text-primary"
          active-class="!bg-primary-soft !text-primary"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <!-- Azioni -->
      <div class="flex shrink-0 items-center gap-2">
        <button
          class="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-surface-2"
          :aria-label="isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro'"
          @click="toggle"
        >
          <font-awesome-icon :icon="['fas', isDark ? 'sun' : 'moon']" />
        </button>

        <a
          :href="salon.bookingUrl"
          target="_blank"
          rel="noopener"
          class="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-primary/30 ring-1 ring-gold/40 transition-transform hover:scale-105 lg:flex"
        >
          <font-awesome-icon :icon="['fas', 'calendar-check']" />
          Prenota ora
        </a>

        <button
          class="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          :aria-label="menuOpen ? 'Chiudi menu' : 'Apri menu'"
          @click="menuOpen = !menuOpen"
        >
          <font-awesome-icon :icon="['fas', menuOpen ? 'xmark' : 'bars']" />
        </button>
      </div>
    </nav>

    <!-- Menu mobile -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="menuOpen" class="border-t border-border bg-background px-4 py-3 md:hidden">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="block rounded-2xl px-4 py-3 font-bold text-foreground transition-colors hover:bg-primary-soft hover:text-primary"
          active-class="!bg-primary-soft !text-primary"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </RouterLink>
        <a
          :href="salon.bookingUrl"
          target="_blank"
          rel="noopener"
          class="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 font-bold text-white"
        >
          <font-awesome-icon :icon="['fas', 'calendar-check']" />
          Prenota ora
        </a>
      </div>
    </Transition>
  </header>
</template>
