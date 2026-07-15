<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useBrand } from '@/composables/useBrand'
import { salon } from '@/data/salon'

const route = useRoute()
const { isDark, toggle } = useTheme()
const { brandId } = useBrand()
const menuOpen = ref(false)

// Chi Siamo e Contatti sono pagine "indipendenti": raggiungibili solo
// dalla landing page, non appartengono alla navigazione di un marchio
// specifico. Niente menu Home/Listino/Prodotti qui — solo torna
// indietro, tema e prenota ora, sempre visibili anche su mobile.
const isStandalone = computed(() => route.path === '/chi-siamo' || route.path === '/contatti')

// Ogni marchio ha la propria navigazione. Chi Siamo e Contatti sono
// condivisi e ora raggiungibili solo dalla landing page (/), non
// duplicati nel menu di ogni marchio.
const styleLinks = [
  { to: '/style', label: 'Home' },
  { to: '/listino', label: 'Listino' },
  { to: '/prodotti', label: 'Prodotti' },
]

const ritualLinks = [
  { to: '/ritual', label: 'Home' },
  { to: '/ritual/listino', label: 'Listino' },
  { to: '/ritual/prodotti', label: 'Prodotti' },
]

// "With You" è una singola pagina di collezione: nessuna sotto-navigazione.
const withYouLinks = [{ to: '/with-you', label: 'Home' }]

const links = computed(() => {
  if (brandId.value === 'ritual') return ritualLinks
  if (brandId.value === 'withyou') return withYouLinks
  return styleLinks
})
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-lg">
    <nav class="mx-auto flex max-w-6xl items-center justify-between gap-2 px-4 py-3 sm:px-6">
      <div class="flex shrink-0 items-center gap-3">
        <!-- Torna alla schermata di scelta tra i marchi: da qualunque
             pagina, non solo cliccando "Home" su Style. -->
        <RouterLink
          to="/"
          class="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-border px-3.5 text-xs font-bold text-muted transition-colors hover:border-primary hover:text-primary sm:text-sm"
          aria-label="Torna alla scelta tra i marchi Iako"
        >
          <font-awesome-icon :icon="['fas', 'arrow-left']" class="text-[0.7rem]" />
          Torna indietro
        </RouterLink>
      </div>

      <!-- Link desktop: nessuno sulle pagine indipendenti (Chi Siamo, Contatti) -->
      <div v-if="!isStandalone" class="hidden items-center gap-1 md:flex">
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
          class="flex h-10 items-center justify-center gap-1.5 rounded-full border border-border px-3.5 text-xs font-bold text-foreground transition-colors hover:bg-surface-2 sm:text-sm"
          :aria-label="isDark ? 'Passa al tema chiaro' : 'Passa al tema scuro'"
          @click="toggle"
        >
          <font-awesome-icon :icon="['fas', isDark ? 'sun' : 'moon']" class="text-[0.7rem]" />
          {{ isDark ? 'Giorno' : 'Notte' }}
        </button>

        <a
          :href="salon.bookingUrl"
          target="_blank"
          rel="noopener"
          class="items-center gap-2 rounded-full bg-primary px-3.5 py-2.5 text-xs font-bold text-white shadow-md shadow-primary/30 ring-1 ring-gold/40 transition-transform hover:scale-105 sm:px-5 sm:text-sm"
          :class="isStandalone ? 'flex' : 'hidden lg:flex'"
        >
          <font-awesome-icon :icon="['fas', 'calendar-check']" />
          <span class="hidden sm:inline">Prenota ora</span>
        </a>

        <button
          v-if="!isStandalone"
          class="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
          :aria-label="menuOpen ? 'Chiudi menu' : 'Apri menu'"
          @click="menuOpen = !menuOpen"
        >
          <font-awesome-icon :icon="['fas', menuOpen ? 'xmark' : 'bars']" />
        </button>
      </div>
    </nav>

    <!-- Menu mobile: non esiste sulle pagine indipendenti -->
    <Transition
      v-if="!isStandalone"
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
