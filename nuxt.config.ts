import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import VueJSX from '@vitejs/plugin-vue-jsx'

export default defineNuxtConfig({
	typescript: {
		shim: false,
		strict: true,
	},
	app: {
		head: {
			title: '喵队掘金官网',
			viewport: 'width=device-width, initial-scale=1.0',
			charset: 'utf-8',
			meta: [],
		},
	},
	modules: [
		'@vueuse/nuxt',
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
	css: [
		'~/assets/css/main.css',
		'element-plus/theme-chalk/dark/css-vars.css',
		'element-plus/es/components/message/style/css',
		'element-plus/es/components/message-box/style/css',
	],
	vite: {
		plugins: [
			VueJSX(),
			AutoImport({
				imports: ['vue', '@vueuse/core'],
				dts: './interface/auto-imports.d.ts',
			}),
			Components({
				resolvers: [ElementPlusResolver()],
				dts: './interface/components.d.ts',
			}),
		],
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	imports: {
		dirs: [
			'composables',
			'composables/*/index.{ts,js,tsx,jsx,mjs,mts}',
			'composables/**',
		],
	},
	build: { transpile: ['element-plus'] },
})
