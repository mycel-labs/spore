import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import type { UserConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import { VitePluginRadar } from 'vite-plugin-radar'
import mix, { vercelAdapter } from 'vite-plugin-mix'

const config: UserConfig = {
  resolve: {
    alias: {
      '~/': `${__dirname}/src/`,
      '@/': `@mycel/shared/`,
    },
  },
  plugins: [
    react(),
    TanStackRouterVite(),
    mix.default({
      handler: './api/handler.ts',
      adapter: vercelAdapter(),
    }),
    VitePluginRadar({
      analytics: {
        id: 'G-9LRZ9KB92V',
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: { enabled: true },
      includeAssets: [
        '/icons/favicon.ico',
        '/icons/apple-touch-icon.png',
        '/icons/mask-icon.svg',
      ],
      manifest: {
        name: 'SPORE',
        short_name: 'SPORE',
        description: 'ID based Intent-Centric Interface',
        theme_color: '#ff4615',
        background_color: '#ff4615',
        start_url: '/home',
        display: 'fullscreen',
        icons: [
          {
            src: '/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
    nodePolyfills(),
  ],
  define: {
    global: 'window',
  },
}

export default config
