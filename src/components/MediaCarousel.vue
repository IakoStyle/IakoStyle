<script setup lang="ts">
import { ref } from 'vue'
import { gallery } from '@/data/media'

const track = ref<HTMLElement | null>(null)

function scrollByDir(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  const amount = el.clientWidth * 0.8 * dir
  el.scrollBy({ left: amount, behavior: 'smooth' })
}

const tintMap: Record<string, string> = {
  mint: 'from-primary-soft to-accent-soft',
  sky: 'from-accent-soft to-primary-soft',
  gold: 'from-gold-soft to-accent-soft',
}
</script>

<template>
  <div class="relative">
    <!-- Frecce (desktop) -->
    <button
      class="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition-all hover:bg-primary hover:text-surface md:flex"
      aria-label="Elemento precedente"
      @click="scrollByDir(-1)"
    >
      <font-awesome-icon :icon="['fas', 'arrow-left']" />
    </button>
    <button
      class="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-md transition-all hover:bg-primary hover:text-surface md:flex"
      aria-label="Elemento successivo"
      @click="scrollByDir(1)"
    >
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
    </button>

    <!-- Track scrollabile -->
    <div
      ref="track"
      class="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
    >
      <div
        v-for="(item, i) in gallery"
        :key="i"
        class="relative aspect-[4/5] w-[78%] shrink-0 snap-center overflow-hidden rounded-xl border border-border sm:w-[46%] lg:w-[31%]"
      >
        <!-- MEDIA REALE -->
        <template v-if="!item.placeholder">
          <img
            v-if="item.type === 'image'"
            :src="item.src"
            :alt="item.alt || 'Foto Iako Style'"
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <video
            v-else
            :src="item.src"
            :poster="item.poster"
            class="h-full w-full object-cover"
            controls
            playsinline
          ></video>
        </template>

        <!-- SEGNAPOSTO (in attesa dei media) -->
        <div
          v-else
          class="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br p-6 text-center"
          :class="tintMap[item.tint || 'mint']"
        >
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-surface/70 text-primary">
            <font-awesome-icon
              :icon="item.type === 'video' ? ['fas', 'play'] : ['fas', 'images']"
              class="text-xl"
            />
          </div>
          <p class="font-display font-semibold text-foreground">{{ item.caption }}</p>
          <span class="rounded-full bg-surface/80 px-3 py-1 text-xs font-bold text-muted">
            {{ item.type === 'video' ? 'Video in arrivo' : 'Foto in arrivo' }}
          </span>
        </div>

        <!-- Etichetta caption su media reale -->
        <div
          v-if="!item.placeholder && item.caption"
          class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4"
        >
          <p class="font-display font-semibold text-white">{{ item.caption }}</p>
        </div>
      </div>
    </div>

    <p class="mt-3 flex items-center justify-center gap-2 text-xs text-muted md:hidden">
      <font-awesome-icon :icon="['fas', 'arrow-right']" />
      Scorri per vedere tutto
    </p>
  </div>
</template>
