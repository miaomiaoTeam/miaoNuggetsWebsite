import { fileURLToPath } from 'url'
import ESLint from 'vite-plugin-eslint'
import Compression from 'compression-webpack-plugin'

const resolve = (url: string) => fileURLToPath(new URL(url, import.meta.url))
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  alias: {
    stores: resolve('./stores'),
    utils: resolve('./utils'),
    'server-utils': resolve('./server/utils'),
    'server-config': resolve('./server/config'),
  },
  app: {
    head: {
      title: '喵队掘金官网',
      viewport: 'width=device-width, initial-scale=1.0',
      charset: 'utf-8',
      meta: [],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicons/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicons/favicon-16x16.png',
        },
        {
          rel: 'mask-icon',
          type: 'image/png',
          href: '/favicons/safari-pinned-tab.svg',
          color: '#1E80FF',
        },
      ],
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@element-plus/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    // https://github.com/nuxt-community/eslint-module/issues/78
    // '@nuxtjs/eslint-module',
    [
      '@pinia/nuxt',
      {
        autoImports: [
          // 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
  ],
  // @ts-ignore
  content: {
    highlight: {
      preload: ['javascript', 'typescript', 'vue', 'vue-html'],
    },
  },
  vite: {
    plugins: [ESLint()],
  },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  imports: {
    dirs: ['composables/*/index.{ts,js,tsx,jsx,mjs,mts}', 'stores/**/*.ts'],
  },
  build: {
    analyze: {
      title: 'miaoNuggets',
      filename: '.output/stats.{name}.html',
      open: true,
      template: 'treemap',
      gzipSize: true,
      brotliSize: true,
    },
  },
  webpack: {
    plugins: [
      new Compression({
        test: /\.js$|\.html$|\.css$/,
        threshold: 10240,
        deleteOriginalAssets: false,
      }),
    ],
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 250000,
      },
    },
  },
  elementPlus: {
    components: ['ElSubMenu'],
  },
})
