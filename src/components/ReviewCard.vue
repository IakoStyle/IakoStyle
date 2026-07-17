<script setup lang="ts">
import type { Review } from '@/data/salon'
import { censorSurname } from '@/data/salon'
import StarRating from './StarRating.vue'

defineProps<{ review: Review }>()
</script>

<template>
  <figure
    class="flex h-full flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
  >
    <font-awesome-icon :icon="['fas', 'quote-left']" class="text-2xl text-primary-soft" />

    <blockquote class="flex-1 text-foreground">{{ review.text }}</blockquote>

    <div class="flex items-center justify-between border-t border-border pt-4">
      <div>
        <figcaption class="font-display font-semibold text-foreground">{{ censorSurname(review.author) }}</figcaption>
        <p class="text-xs text-muted">{{ review.service }} · {{ review.when }}</p>
      </div>
      <StarRating class="text-sm" />
    </div>
  </figure>
</template>
