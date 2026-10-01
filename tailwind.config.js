/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        raj: {
          bg: '#0F1012',
          card: '#16181C',
          surface: '#1E2126',
          border: 'rgba(255, 255, 255, 0.08)',
          sand: '#E6DEC9',
          cream: '#F4EFE6',
          beige: '#D9CEB9',
          gold: '#C5A880',
          'gold-light': '#DFC4A0',
          charcoal: '#1A1C20',
          muted: '#8E949F'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
