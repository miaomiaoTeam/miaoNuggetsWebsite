export default defineNuxtConfig({
  // modules: ["@nuxt/ui"],
  modules: [
    "@nuxt/ui",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // 自动引入 `usePinia()`
          "defineStore",
          // 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
          ["defineStore", "definePiniaStore"],
        ],
      },
    ],
  ],
  css: ["~/assets/css/main.css", "element-plus/dist/index.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
