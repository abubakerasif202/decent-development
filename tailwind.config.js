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
        gold: '#C9A227', // Deep gold
        'gold-soft': '#d4b886',
        porcelain: '#FAF8F2', // Updated to warm-white background
        ivory: '#fffaf2',
        smoke: '#c9c3b8',
        stone: '#8f887d',
        bronze: '#8a6a35',
        // Semantic light theme tokens
        'brand-bg': '#FAF8F2',
        'brand-surface': '#FFFFFF',
        'brand-charcoal': '#111827',
        'brand-muted': '#4B5563',
        'brand-gold': '#C9A227',
        'brand-border': '#E7E0D3',
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
