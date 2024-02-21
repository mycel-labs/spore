import react from '@vitejs/plugin-react'
import vike from 'vike/plugin'
import { VitePWA } from 'vite-plugin-pwa'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import type { UserConfig } from 'vite'

const config: UserConfig = {
  resolve: {
    alias: {
      '~/': `${__dirname}/`,
      '@/': `@mycel/shared/`,
    },
  },
  plugins: [
    react(),
    vike(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'SPORE',
        short_name: 'SPORE',
        description: 'Welcome to SPORE',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        start_url: '/home',
        display: 'fullscreen',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
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
