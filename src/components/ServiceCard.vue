<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Service } from '@/data/salon'
import { salon } from '@/data/salon'

const props = defineProps<{ service: Service }>()

const hasVariants = computed(() => (props.service.variants?.length ?? 0) > 0)
const isOpen = ref(false)

function toggle() {
  if (hasVariants.value) isOpen.value = !isOpen.value
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
        </div>
      </div>

      <div class="flex shrink-0 items-center justify-between gap-3 border-t border-border pt-3 sm:flex-col sm:items-end sm:border-t-0 sm:pt-0">
        <span class="font-display text-xl font-bold text-primary">
          <template v-if="hasVariants">da </template>€ {{ service.price }}
        </span>

        <!-- Servizio semplice: bottone diretto -->
        <a
          v-if="!hasVariants"
          :href="salon.bookingUrl"
          target="_blank"
          rel="noopener"
          class="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent transition-colors hover:bg-accent hover:text-white"
          @click.stop
        >
          Seleziona
        </a>
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
            <a
              :href="salon.bookingUrl"
              target="_blank"
              rel="noopener"
              class="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent transition-colors hover:bg-accent hover:text-white"
              @click.stop
            >
              Seleziona
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
