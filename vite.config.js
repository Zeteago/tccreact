import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,

      manifest: {
        name: 'ayvu',
        short_name: 'ayvu',
        description: 'E-commerce + i-food',
        theme_color: '#fcf5f9',
        icons: [
          {
            src: 'favicon.png', // Caminho para o favicon.png
            sizes: '192x192', // Tamanho do ícone
            type: 'image/png',
          },
          {
            src: 'favicon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,png,ico}'], // Inclua o PNG nos padrões
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
});