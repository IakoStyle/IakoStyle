<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { salon, socials, openingHours, todayIndex, getOpenStatus } from '@/data/salon'
import { useCookieConsent } from '@/composables/useCookieConsent'
import { useBrand } from '@/composables/useBrand'
import { brands } from '@/data/brands'
import logoUrl from '@/assets/logo-iako.webp'

const idx = todayIndex()
const status = computed(() => getOpenStatus())
const { reset } = useCookieConsent()
const { brand, brandId } = useBrand()

// I marchi diversi da quello attivo, per i link "Scopri anche..." in fondo.
const otherBrands = computed(() => Object.values(brands).filter((b) => b.id !== brandId.value))
</script>

<template>
  <footer class="mt-20 border-t border-border bg-surface-2">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Brand -->
      <div>
        <div class="inline-flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-border">
          <img :src="logoUrl" :alt="brand.name" class="h-16 w-16 object-contain" />
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
          <li><RouterLink to="/chi-siamo" class="text-muted transition-colors hover:text-primary">Chi Siamo</RouterLink></li>
          <li><RouterLink to="/listino" class="text-muted transition-colors hover:text-primary">Listino Prezzi</RouterLink></li>
          <li><RouterLink to="/prodotti" class="text-muted transition-colors hover:text-primary">Prodotti</RouterLink></li>
          <li><RouterLink to="/contatti" class="text-muted transition-colors hover:text-primary">Contatti</RouterLink></li>
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
        <span aria-hidden="true">·</span>
        <button class="font-bold text-muted underline-offset-2 hover:text-primary hover:underline" @click="reset">
          Preferenze cookie
        </button>
      </p>
    </div>
  </footer>
</template>
