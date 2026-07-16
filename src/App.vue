<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import CookieBanner from '@/components/CookieBanner.vue'
import BookingModal from '@/components/BookingModal.vue'

const route = useRoute()
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <!-- Sulla landing (la schermata di scelta tra i marchi) non mostriamo
         la barra di navigazione standard: la scelta stessa È la navigazione. -->
    <AppHeader v-if="route.path !== '/'" />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter />
    <CookieBanner />
    <BookingModal />
  </div>
</template>
