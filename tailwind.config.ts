import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {},
    screens: {
      tabSm: '640px',
      tabLg: '1190px',
      postLep: '1000px',
      postDes: '1140px',
    },
  },
}
