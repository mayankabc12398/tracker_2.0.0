import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0B0B12',
          subtle: '#111119',
          card: 'rgba(255,255,255,0.04)',
        },
        border: {
          subtle: 'rgba(255,255,255,0.08)',
        },
        brand: {
          indigo: '#6366F1',
          purple: '#8B5CF6',
          green: '#22C55E',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgba(99,102,241,0.4), 0 8px 40px rgba(99,102,241,0.25)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        'mesh': 'radial-gradient(at 0% 0%, rgba(99,102,241,0.18) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(139,92,246,0.16) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(34,197,94,0.10) 0px, transparent 50%)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
