<script setup lang="ts">
import { watch } from 'vue'
import { salon } from '@/data/salon'
import { useBookingModal } from '@/composables/useBookingModal'

const { isOpen, serviceLabel, close } = useBookingModal()

// Blocca lo scroll della pagina sotto mentre il modale è aperto.
watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Prenota il tuo appuntamento"
      @click.self="close"
    >
      <Transition
        appear
        enter-active-class="transition duration-250 ease-out"
        enter-from-class="opacity-0 translate-y-8 sm:translate-y-0 sm:scale-95"
      >
        <div class="flex h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-xl bg-surface shadow-2xl sm:h-[85vh] sm:rounded-xl">
          <div class="flex shrink-0 items-center justify-between border-b border-border px-5 py-4">
            <div class="min-w-0">
              <p class="text-xs font-bold uppercase tracking-wide text-primary">Prenota</p>
              <h2 class="truncate font-display text-lg font-bold text-foreground">
                {{ serviceLabel || salon.name }}
              </h2>
            </div>
            <button
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
              aria-label="Chiudi"
              @click="close"
            >
              <font-awesome-icon :icon="['fas', 'xmark']" />
            </button>
          </div>

          <p v-if="serviceLabel" class="shrink-0 border-b border-border bg-surface-2 px-5 py-2 text-xs text-muted">
            Scegli data e orario per "{{ serviceLabel }}" nel calendario qui sotto.
          </p>

          <iframe
            :src="salon.bookingWidgetUrl"
            title="Calendario di prenotazione Treatwell"
            class="h-full w-full flex-1 border-0"
            loading="lazy"
          ></iframe>
        </div>
      </Transition>
    </div>
  </Transition>
</template>
