import VueJSX from '@vitejs/plugin-vue-jsx'
import ESLint from 'vite-plugin-eslint'

export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
    typeCheck: true,
  },
  alias: {
    'server-utils': 'server/utils',
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
    plugins: [ESLint(), VueJSX()],
  },
  postcss: {
    plugins: {
      autoprefixer: {},
    },
  },
  imports: {
    dirs: [
      'composables',
      'composables/*/index.{ts,js,tsx,jsx,mjs,mts}',
      'composables/**',
      './utils',
    ],
  },
  build: { transpile: ['element-plus/es'] },
})
