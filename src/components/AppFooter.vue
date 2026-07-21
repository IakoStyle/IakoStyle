<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { salon, socials, openingHours, todayIndex, getOpenStatus } from '@/data/salon'
import { useBrand } from '@/composables/useBrand'
import { brands } from '@/data/brands'
import styleLogoUrl from '@/assets/logo-iako.webp'
import lemonIcon from '@/assets/ritual/lemon-icon.webp'

const route = useRoute()
const idx = todayIndex()
const status = computed(() => getOpenStatus())
const { brand, brandId, isRitual, isWithYou } = useBrand()

// Sulla pagina di scelta (la landing) la scelta tra i marchi È già la
// navigazione: niente link "Scopri Ritual / Everywhere" ripetuti anche
// nel footer.
const isLanding = computed(() => route.path === '/')

// I marchi diversi da quello attivo, per i link "Scopri anche..." in fondo.
const otherBrands = computed(() =>
  isLanding.value ? [] : Object.values(brands).filter((b) => b.id !== brandId.value),
)
</script>

<template>
  <footer class="mt-20 border-t border-border bg-surface-2">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Brand -->
      <div>
        <!-- Everywhere With You: il "logo" è il wordmark testuale
             (EVERYWHERE / riga oro / with you), senza sfondo. La riga è
             posizionata in assoluto rispetto al testo (invece di una
             larghezza percentuale in un contenitore "w-fit"): alcuni
             browser mobili calcolano comunque la dimensione intrinseca
             dell'SVG anche dentro "w-fit", allungando la riga oltre il
             testo. Con l'assoluto l'SVG è fuori dal flusso e non
             influenza la larghezza del contenitore, che resta quella
             esatta di "EVERYWHERE". -->
        <div v-if="isWithYou" class="inline-flex flex-col items-center">
          <div class="relative">
            <p class="ritual-claim text-2xl font-medium uppercase text-foreground">Everywhere</p>
            <svg
              class="absolute inset-x-0 top-full mt-0.5 text-gold"
              viewBox="0 0 300 10"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0,5 C 40,1.5 100,0.5 150,0.5 C 200,0.5 260,3 300,10"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
              />
            </svg>
          </div>
          <p class="ritual-script mt-1 text-3xl text-foreground">with you</p>
        </div>
        <!-- Studio: logo immagine, senza riquadro di sfondo. -->
        <img v-if="brandId === 'style'" :src="styleLogoUrl" :alt="brand.name" class="h-12 w-auto max-w-full object-contain" />
        <!-- Ritual: come nell'header della sua home, testo reale bianco
             (leggibile sullo sfondo scuro del footer) accanto al limone,
             che resta a colori. -->
        <div v-else-if="isRitual" class="flex items-center gap-3">
          <div>
            <p class="ritual-wordmark text-2xl font-semibold text-white">IAKO</p>
            <p class="ritual-subword mt-1 text-[0.55rem] font-medium text-white/90">RITUAL</p>
          </div>
          <img :src="lemonIcon" alt="" class="h-10 w-auto object-contain" />
        </div>
        <p class="mt-4 text-sm text-muted">{{ brand.tagline }}.</p>
        <div class="mt-4 flex gap-2">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.url"
            target="_blank"
            rel="noopener"
            :aria-label="s.label"
            class="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-primary hover:text-white"
          >
            <font-awesome-icon :icon="s.icon" />
          </a>
        </div>
      </div>

      <!-- Naviga -->
      <div>
        <h3 class="font-display font-bold text-foreground">Naviga</h3>
        <ul class="mt-4 space-y-2 text-sm">
          <li><RouterLink :to="brand.basePath" class="text-muted transition-colors hover:text-primary">Home</RouterLink></li>
          <li><RouterLink to="/listino" class="text-muted transition-colors hover:text-primary">Listino Prezzi</RouterLink></li>
          <li><RouterLink to="/privacy" class="text-muted transition-colors hover:text-primary">Privacy Policy</RouterLink></li>
          <li v-for="b in otherBrands" :key="b.id" class="pt-2">
            <RouterLink
              :to="b.basePath"
              class="inline-flex items-center gap-1.5 font-bold text-gold transition-colors hover:underline"
            >
              <font-awesome-icon :icon="['fas', 'arrow-right']" class="text-xs" />
              Scopri {{ b.name }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- Contatti -->
      <div>
        <h3 class="font-display font-bold text-foreground">Dove siamo</h3>
        <ul class="mt-4 space-y-3 text-sm text-muted">
          <li class="flex gap-2">
            <font-awesome-icon :icon="['fas', 'location-dot']" class="mt-1 text-primary" />
            <span>{{ salon.address }}</span>
          </li>
          <li class="flex gap-2">
            <font-awesome-icon :icon="['fas', 'phone']" class="mt-1 text-primary" />
            <a :href="`tel:+39${salon.whatsappNumber}`" class="hover:text-primary">
              {{ salon.whatsappDisplay }}
            </a>
          </li>
          <li class="flex gap-2">
            <font-awesome-icon :icon="['fab', 'whatsapp']" class="mt-1 text-primary" />
            <a :href="`https://wa.me/39${salon.whatsappNumber}`" target="_blank" rel="noopener" class="hover:text-primary">
              {{ salon.whatsappDisplay }}
            </a>
          </li>
        </ul>
      </div>

      <!-- Orari -->
      <div>
        <h3 class="font-display font-bold text-foreground">Orari</h3>
        <p class="mt-1 flex flex-wrap items-center gap-2">
          <span
            class="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold"
            :class="status.isOpen ? 'bg-primary-soft text-primary' : 'bg-closed-soft text-closed'"
          >
            <span class="h-1.5 w-1.5 rounded-full" :class="status.isOpen ? 'bg-primary' : 'bg-closed'"></span>
            {{ status.isOpen ? status.label : status.nextOpenLabel }}
          </span>
          <span class="flex items-center gap-1.5 text-xs font-bold text-gold">
            <font-awesome-icon :icon="['fas', 'sun']" />
            {{ salon.seasonLabel }}
          </span>
        </p>
        <ul class="mt-3 space-y-1.5 text-xs">
          <li
            v-for="(d, i) in openingHours"
            :key="d.day"
            class="flex justify-between gap-3 rounded-lg px-2 py-1"
            :class="i === idx
              ? (status.isOpen ? 'bg-primary-soft font-bold text-primary' : 'bg-closed-soft font-bold text-closed')
              : 'text-muted'"
          >
            <span>{{ d.day }}</span>
            <span class="text-right" :class="d.closed ? 'font-bold text-closed' : ''">{{ d.hours }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border">
      <p class="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-2 gap-y-1 px-6 py-5 text-center text-xs text-muted">
        <span>© {{ new Date().getFullYear() }} {{ brand.name }} · {{ salon.city }} · P.IVA {{ salon.vatNumber }} · Tutti i diritti riservati</span>
      </p>
    </div>
  </footer>
</template>
