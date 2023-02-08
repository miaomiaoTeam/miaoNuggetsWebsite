import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  important: '#__nuxt',
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      postLep: '1000px',
      postDes: '1140px',
    },
  },
}
