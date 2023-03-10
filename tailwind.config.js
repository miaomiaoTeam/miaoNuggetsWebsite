/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#__nuxt',
  darkMode: 'class',
  content: [
    './components/**/*.{vue,js,jsx,ts,tsx}',
    './layouts/**/*.{vue,js,jsx,ts,tsx}',
    './pages/**/*.{vue,js,jsx,ts,tsx}',
    './plugins/**/*.{js,jsx,ts,tsx}',
    './nuxt.config.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {},
    screens: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
