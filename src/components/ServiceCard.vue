<script setup lang="ts">
import type { Service } from '@/data/salon'
import { salon } from '@/data/salon'

defineProps<{ service: Service }>()
</script>

<template>
  <div
    class="group flex flex-col gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10 sm:flex-row sm:items-center"
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
      <span class="font-display text-xl font-bold text-primary">€ {{ service.price }}</span>
      <a
        :href="salon.bookingUrl"
        target="_blank"
        rel="noopener"
        class="rounded-full bg-accent-soft px-3 py-1 text-xs font-bold text-accent transition-colors hover:bg-accent hover:text-white"
      >
        Seleziona
      </a>
    </div>
  </div>
</template>
