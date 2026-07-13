<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useCookieConsent } from '@/composables/useCookieConsent'

const { optional, acceptAll, rejectOptional } = useCookieConsent()
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-4"
    leave-active-class="transition duration-200 ease-in"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div
      v-if="optional === null"
      class="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface/98 px-4 py-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:px-6"
      role="dialog"
      aria-label="Preferenze sui cookie"
    >
      <div class="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-foreground">
          <font-awesome-icon :icon="['fas', 'circle-check']" class="mr-1.5 text-primary" />
          Usiamo cookie tecnici necessari al funzionamento del sito, e — solo con il tuo consenso —
          la mappa di Google e strumenti statistici anonimi. Puoi cambiare idea quando vuoi dal
          footer. Leggi la
          <RouterLink to="/privacy" class="font-bold text-primary hover:underline">Privacy Policy</RouterLink>.
        </p>
        <div class="flex shrink-0 gap-3">
          <button
            class="rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            @click="rejectOptional"
          >
            Solo necessari
          </button>
          <button
            class="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition-transform hover:scale-105"
            @click="acceptAll"
          >
            Accetta tutto
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
