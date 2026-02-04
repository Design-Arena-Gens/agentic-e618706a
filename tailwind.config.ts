import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'jarvis-blue': '#00d4ff',
        'jarvis-purple': '#9945ff',
        'jarvis-pink': '#ff006e',
      },
    },
  },
  plugins: [],
}
export default config
