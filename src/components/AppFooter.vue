<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { salon, socials, openingHours, todayIndex } from '@/data/salon'
import logoUrl from '@/assets/logo-iako.jpg'

const idx = todayIndex()
</script>

<template>
  <footer class="mt-20 border-t border-border bg-surface-2">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
      <!-- Brand -->
      <div>
        <div class="inline-flex items-center gap-2 rounded-2xl bg-white p-2 shadow-sm ring-1 ring-border">
          <img :src="logoUrl" alt="Iako Style" class="h-16 w-16 object-contain" />
        </div>
        <p class="mt-4 text-sm text-muted">{{ salon.tagline }}.</p>
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
          <li><RouterLink to="/" class="text-muted transition-colors hover:text-primary">Home</RouterLink></li>
          <li><RouterLink to="/chi-siamo" class="text-muted transition-colors hover:text-primary">Chi Siamo</RouterLink></li>
          <li><RouterLink to="/listino" class="text-muted transition-colors hover:text-primary">Listino Prezzi</RouterLink></li>
          <li><RouterLink to="/prodotti" class="text-muted transition-colors hover:text-primary">Prodotti</RouterLink></li>
          <li><RouterLink to="/contatti" class="text-muted transition-colors hover:text-primary">Contatti</RouterLink></li>
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
        <p class="mt-1 flex items-center gap-1.5 text-xs font-bold text-gold">
          <font-awesome-icon :icon="['fas', 'sun']" />
          {{ salon.seasonLabel }}
        </p>
        <ul class="mt-3 space-y-1.5 text-xs">
          <li
            v-for="(d, i) in openingHours"
            :key="d.day"
            class="flex justify-between gap-3 rounded-lg px-2 py-1"
            :class="i === idx ? 'bg-primary-soft font-bold text-primary' : 'text-muted'"
          >
            <span>{{ d.day }}</span>
            <span class="text-right">{{ d.hours }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="border-t border-border">
      <p class="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-muted">
        © {{ new Date().getFullYear() }} Iako Style · {{ salon.city }} · Tutti i diritti riservati
      </p>
    </div>
  </footer>
</template>
