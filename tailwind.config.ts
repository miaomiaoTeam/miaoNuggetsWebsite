import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  important: '#__nuxt',
  darkMode: 'class',
  theme: {
    extend: {},
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      tabSm: '640px',
      tabLg: '1190px',
      homeLep: '960px',
      postLep: '1000px',
      postDes: '1140px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
