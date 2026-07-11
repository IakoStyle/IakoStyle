<script setup lang="ts">
withDefaults(defineProps<{ rating?: number; size?: string }>(), {
  rating: 5,
  size: '',
})
</script>

<template>
  <span class="inline-flex items-center gap-0.5 text-gold" :class="size">
    <font-awesome-icon
      v-for="n in 5"
      :key="n"
      :icon="['fas', 'star']"
      aria-hidden="true"
    />
  </span>
</template>
