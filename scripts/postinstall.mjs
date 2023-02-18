import fs from 'fs'
import url from 'url'
import path from 'path'

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const nuxt_core_path = path.resolve(
  __dirname,
  '../node_modules/nuxt/dist/index.mjs'
)
const nuxt_core = fs.readFileSync(nuxt_core_path, 'utf-8')
const new_nuxt_core = nuxt_core.replace(
  `declare module 'vue'`,
  `declare module '@vue/runtime-core'`
)
fs.writeFileSync(nuxt_core_path, new_nuxt_core)
