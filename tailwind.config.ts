import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {},
    screens: {
      postLep: '1000px',
      postDes: '1140px',
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
