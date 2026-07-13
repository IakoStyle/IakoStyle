import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer'

// https://vite.dev/config/
export default defineConfig({
  // Vercel serve sempre dalla root del dominio, quindi il base path resta '/'
  base: '/',
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    // Rete di sicurezza: comprime automaticamente in fase di build QUALSIASI
    // immagine (anche future aggiunte non ancora convertite a mano in WebP).
    ViteImageOptimizer({
      webp: { quality: 78 },
      jpg: { quality: 78 },
      jpeg: { quality: 78 },
      png: { quality: 78 },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
