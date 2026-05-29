/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b0907',
        navy: '#15110d',
        charcoal: '#14110f',
        graphite: '#29231d',
        gold: '#c6a15b',
        'gold-soft': '#ead29b',
        porcelain: '#f7f0e4',
        ivory: '#fffaf2',
        smoke: '#d8cbb8',
        stone: '#a9987e',
        bronze: '#7c5d35',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
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
