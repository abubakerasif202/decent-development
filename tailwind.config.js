/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#121212',
        navy: '#171717',
        charcoal: '#1a1a1a',
        graphite: '#2a2a2a',
        gold: '#c5a059',
        'gold-soft': '#d4b886',
        porcelain: '#f5f2ea',
        ivory: '#fffaf2',
        smoke: '#c9c3b8',
        stone: '#8f887d',
        bronze: '#8a6a35',
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        premium: '0 28px 80px rgba(11, 9, 7, 0.34)',
        gold: '0 20px 48px rgba(198, 161, 91, 0.26)',
      },
    },
  },
  plugins: [],
}
