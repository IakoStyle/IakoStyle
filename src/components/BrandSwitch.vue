<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useBrand } from '@/composables/useBrand'
import { brands } from '@/data/brands'

const { brandId } = useBrand()
</script>

<template>
  <div
    class="flex items-center rounded-full border border-border bg-surface-2 p-0.5"
    role="tablist"
    aria-label="Scegli il marchio"
  >
    <RouterLink
      v-for="b in brands"
      :key="b.id"
      :to="b.basePath"
      role="tab"
      :aria-selected="brandId === b.id"
      class="rounded-full px-3 py-1.5 text-xs font-bold transition-colors sm:px-4 sm:text-sm"
      :class="brandId === b.id
        ? 'bg-primary text-white shadow-sm'
        : 'text-muted hover:text-primary'"
    >
      {{ b.switchLabel }}
    </RouterLink>
  </div>
</template>
