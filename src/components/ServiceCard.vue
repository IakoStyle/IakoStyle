<script setup lang="ts">
import type { Service } from '@/data/salon'
import { salon } from '@/data/salon'

defineProps<{ service: Service }>()
</script>

<template>
  <div
    class="group flex items-center gap-4 rounded-xl border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lg hover:shadow-primary/10"
  >
    <div
      class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-300 group-hover:rotate-6"
    >
      <font-awesome-icon :icon="['fas', 'scissors']" />
    </div>

    <div class="min-w-0 flex-1">
      <h3 class="truncate font-display text-lg font-semibold text-foreground">
        {{ service.name }}
      </h3>
      <p class="flex items-center gap-1.5 text-sm text-muted">
        <font-awesome-icon :icon="['fas', 'clock']" class="text-xs" />
        {{ service.duration }}
      </p>
    </div>

    <div class="flex shrink-0 flex-col items-end gap-2">
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
