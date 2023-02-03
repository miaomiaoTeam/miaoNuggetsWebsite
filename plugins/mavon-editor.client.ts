import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  nuxtApp.vueApp.use(mavonEditor)
})
