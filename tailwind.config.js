/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'pt-base':       '#0B1410',
        'pt-surface':    '#162620',
        'pt-elevated':   '#2A3530',
        'pt-gold':       '#D4AF37',
        'pt-gold-bright':'#F5C518',
        'pt-text':       '#F3E9D2',
        'pt-muted':      '#9CA3AF',
      },
      fontFamily: {
        sans: ['Be Vietnam Pro', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      animation: {
        'toast-in': 'toastIn 0.3s ease-out',
        'sheet-up': 'sheetUp 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        toastIn: {
          from: { transform: 'translateY(-20px)', opacity: 0 },
          to:   { transform: 'translateY(0)', opacity: 1 },
        },
        sheetUp: {
          from: { transform: 'translateY(100%)' },
          to:   { transform: 'translateY(0)' },
        },
      },
      spacing: {
        'screen': '16px',
        'gap': '12px',
        'section': '24px',
      },
      zIndex: {
        'base': '0',
        'card': '10',
        'sticky': '20',
        'tabbar': '30',
        'overlay': '40',
        'bottomsheet': '50',
        'modal': '60',
        'toast': '70',
      }
    },
  },
  plugins: [],
}
