<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Review } from '@/data/salon'
import { censorSurname } from '@/data/salon'
import StarRating from './StarRating.vue'

const props = defineProps<{ review: Review }>()

// Le recensioni sono spesso molto lunghe: si mostra un estratto con
// "... Altro" cliccabile, che espande il testo completo.
const TRUNCATE_LENGTH = 180

const expanded = ref(false)

const isTruncated = computed(() => props.review.text.length > TRUNCATE_LENGTH)

const excerpt = computed(() => {
  const cut = props.review.text.slice(0, TRUNCATE_LENGTH)
  const lastSpace = cut.lastIndexOf(' ')
  return cut.slice(0, lastSpace > 0 ? lastSpace : TRUNCATE_LENGTH)
})
</script>

<template>
  <figure
    class="flex h-full flex-col gap-4 rounded-xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent/10"
  >
    <font-awesome-icon :icon="['fas', 'quote-left']" class="text-2xl text-primary-soft" />

    <blockquote class="flex-1 text-foreground">
      <template v-if="expanded || !isTruncated">{{ review.text }}</template>
      <template v-else
        >{{ excerpt }}...
        <button
          type="button"
          class="font-bold text-foreground underline underline-offset-2 hover:text-primary"
          @click="expanded = true"
        >
          Altro
        </button></template
      >
    </blockquote>

    <div class="flex items-center justify-between border-t border-border pt-4">
      <div>
        <figcaption class="font-display font-semibold text-foreground">{{ censorSurname(review.author) }}</figcaption>
        <p class="text-xs text-muted">{{ review.service }} · {{ review.when }}</p>
      </div>
      <StarRating class="text-sm" />
    </div>
  </figure>
</template>
