// vitest.config.ts
import { fileURLToPath } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, UserConfig } from 'vitest/config'

const resolve = (url: string) => fileURLToPath(new URL(url, import.meta.url))
export default defineConfig({
  define: {
    NUXT_TEST_DEV: true,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    deps: {
      inline: ['@nuxt/test-utils-edge'],
    },
    setupFiles: ['scripts/setupVitest.ts'],
  },
  resolve: {
    alias: {
      '@': resolve('.'),
      'server-utils': resolve('./server/utils'),
      'server-config': resolve('./server/config'),
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      vueTemplate: true,
      dts: false,
    }),
    Components({
      dts: false,
    }),
  ],
}) as UserConfig
