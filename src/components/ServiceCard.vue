<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Service } from '@/data/salon'
import { useBookingModal } from '@/composables/useBookingModal'

const props = defineProps<{ service: Service }>()

const hasVariants = computed(() => (props.service.variants?.length ?? 0) > 0)
const hasDesc = computed(() => !!props.service.desc)
const isOpen = ref(false)
const descOpen = ref(false)
const { open: openBooking } = useBookingModal()

function toggle() {
  if (hasVariants.value) isOpen.value = !isOpen.value
}

function toggleDesc() {
  descOpen.value = !descOpen.value
}
</script>

<template>
  <div
    class="overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
  >
    <!-- Riga principale: sempre visibile -->
    <div
      class="group flex flex-col gap-4 p-5 sm:flex-row sm:items-center"
      :class="hasVariants ? 'cursor-pointer' : ''"
      @click="toggle"
    >
      <div class="flex items-center gap-4 sm:min-w-0 sm:flex-1">
        <div
          class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:rotate-6"
        >
          <font-awesome-icon :icon="['fas', 'scissors']" />
        </div>

        <div class="min-w-0 flex-1">
          <h3 class="break-words font-display text-lg font-semibold leading-snug text-foreground">
            {{ service.name }}
          </h3>
          <p class="flex items-center gap-1.5 text-sm text-muted">
            <font-awesome-icon :icon="['fas', 'clock']" class="text-xs" />
            {{ service.duration }}
          </p>
          <button
            v-if="hasDesc"
            class="mt-1 flex items-center gap-1.5 text-xs font-bold text-primary"
            :aria-expanded="descOpen"
            @click.stop="toggleDesc"
          >
            {{ descOpen ? 'Nascondi dettagli' : 'Scopri di più' }}
            <font-awesome-icon
              :icon="['fas', 'chevron-down']"
              class="text-[0.65rem] transition-transform duration-300"
              :class="descOpen ? 'rotate-180' : ''"
            />
          </button>
        </div>
      </div>

      <div class="flex shrink-0 items-center justify-between gap-3 border-t border-border pt-3 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
        <span class="font-display text-xl font-bold text-primary">
          <template v-if="hasVariants">da </template>€ {{ service.price }}
        </span>

        <!-- Servizio semplice: apre il calendario di prenotazione -->
        <button
          v-if="!hasVariants"
          class="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent transition-colors hover:bg-accent hover:text-white"
          @click.stop="openBooking(service.name, service.treatwellMenuItemId, service.treatwellOptionId)"
        >
          Seleziona
        </button>
        <!-- Servizio con varianti: freccia per aprire/chiudere -->
        <span
          v-else
          class="flex h-7 w-7 items-center justify-center rounded-full bg-surface-2 text-muted transition-transform duration-300"
          :class="isOpen ? 'rotate-180' : ''"
        >
          <font-awesome-icon :icon="['fas', 'chevron-down']" class="text-xs" />
        </span>
      </div>
    </div>

    <!-- Descrizione: si apre a tendina sotto "Scopri di più" -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[32rem] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[32rem] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div
        v-if="hasDesc && descOpen"
        class="overflow-hidden border-t border-border bg-surface-2 px-5 py-4 text-sm leading-relaxed text-muted [&_p]:mb-3 [&_p:last-child]:mb-0"
        v-html="service.desc"
      ></div>
    </Transition>

    <!-- Varianti: si aprono a tendina, ciascuna con il proprio prezzo -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="max-h-0 opacity-0"
      enter-to-class="max-h-[32rem] opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="max-h-[32rem] opacity-100"
      leave-to-class="max-h-0 opacity-0"
    >
      <div v-if="hasVariants && isOpen" class="overflow-hidden border-t border-border bg-surface-2">
        <div
          v-for="(variant, i) in service.variants"
          :key="variant.label"
          class="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
          :class="i > 0 ? 'border-t border-border/60' : ''"
        >
          <div class="min-w-0 flex-1">
            <p class="break-words font-semibold text-foreground">{{ variant.label }}</p>
            <p class="flex items-center gap-1.5 text-sm text-muted">
              <font-awesome-icon :icon="['fas', 'clock']" class="text-xs" />
              {{ variant.duration }}
            </p>
          </div>
          <div class="flex shrink-0 items-center gap-3">
            <span class="font-display text-lg font-bold text-primary">€ {{ variant.price }}</span>
            <button
              class="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent transition-colors hover:bg-accent hover:text-white"
              @click.stop="openBooking(`${service.name} — ${variant.label}`, variant.treatwellMenuItemId, variant.treatwellOptionId)"
            >
              Seleziona
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
