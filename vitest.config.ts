// vitest.config.ts
import { resolve } from "path";
import Vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
    deps: {
      inline: ["@nuxt/test-utils-edge"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "."),
    },
  },
  plugins: [
    Vue(),
    AutoImport({
      imports: ["vue", "@vueuse/core"],
      vueTemplate: true,
      dts: "./interface/auto-imports.d.ts",
    }),
    Components({
      dts: "./interface/components.d.ts",
    }),
  ],
});
