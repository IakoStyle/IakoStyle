<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCookieConsent } from '@/composables/useCookieConsent'

const router = useRouter()
const { optional, acceptAll, rejectOptional } = useCookieConsent()

function goToPrivacy() {
  router.push('/privacy')
}
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
      class="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:inset-x-auto sm:left-4 sm:justify-start"
      role="dialog"
      aria-label="Informativa sui cookie"
    >
      <div class="w-full max-w-sm rounded-xl border border-border bg-surface p-6 shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        <div class="flex items-start justify-between gap-3">
          <h2 class="font-display text-lg font-bold text-foreground">Informativa</h2>
          <button
            class="shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
            aria-label="Chiudi e continua senza accettare"
            @click="rejectOptional"
          >
            <font-awesome-icon :icon="['fas', 'xmark']" />
          </button>
        </div>

        <p class="mt-3 text-sm leading-relaxed text-muted">
          Noi e terze parti selezionate utilizziamo cookie o tecnologie simili per finalità
          tecniche e, con il tuo consenso, anche per finalità di
          <strong class="text-foreground">esperienza e misurazione</strong> (mappa e statistiche
          anonime), come specificato nella
          <RouterLink to="/privacy" class="font-bold text-primary hover:underline">cookie policy</RouterLink>.
        </p>
        <p class="mt-3 text-sm leading-relaxed text-muted">
          Puoi liberamente prestare, rifiutare o revocare il tuo consenso in qualsiasi momento,
          accedendo al link "Preferenze cookie" in fondo alla pagina. Il rifiuto del consenso può
          rendere non disponibili le relative funzioni (es. mappa interattiva).
        </p>
        <p class="mt-3 text-sm leading-relaxed text-muted">
          Usa il pulsante "Accetta tutto" per acconsentire. Chiudi questa informativa con la
          "×" per continuare senza accettare.
        </p>

        <div class="mt-5 flex flex-col gap-2.5">
          <button
            class="w-full rounded-full bg-primary py-2.5 text-sm font-bold text-white transition-transform hover:scale-[1.02]"
            @click="acceptAll"
          >
            Accetta tutto
          </button>
          <button
            class="w-full rounded-full border border-border bg-surface py-2.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            @click="goToPrivacy"
          >
            Scopri di più e personalizza
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>
