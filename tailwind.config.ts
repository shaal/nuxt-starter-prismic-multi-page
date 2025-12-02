import type { Config } from 'tailwindcss'
import tailwindAspectRatio from '@tailwindcss/aspect-ratio'

export default <Partial<Config>>{
  content: [
    './app/**/*.{js,ts,vue}',
    './slices/**/*.{js,ts,vue}'
  ],
  theme: {
    fontFamily: {
      sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      'barlow-condensed': '"Barlow Condensed", ui-sans-serif, system-ui, sans-serif',
      barlow: 'Barlow, ui-sans-serif, system-ui, sans-serif',
    },
    extend: {
      colors: {
        'summit-green': '#18392b',
        'summit-cream': '#f0e2d0',
        'summit-gold': '#e5ccad',
      },
    },
  },
  plugins: [tailwindAspectRatio]
}