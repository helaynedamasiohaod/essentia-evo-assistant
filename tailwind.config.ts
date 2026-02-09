import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Evocare Brand Colors
        bg: {
          primary: '#050505',
          surface: '#18181b',
          elevated: '#0f0f0f',
        },
        text: {
          primary: '#ffffff',
          secondary: '#a1a1aa',
        },
        accent: {
          purple: '#9b51e0',
          teal: '#00d084',
          orange: '#ff6900',
        },
        // DISC Colors (preserved)
        disc: {
          d: '#EF4444',
          i: '#FBBF24',
          s: '#3B82F6',
          c: '#22C55E',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['Sora', 'sans-serif'],
      },
      backgroundImage: {
        'evo-gradient': 'linear-gradient(135deg, #00d084 0%, #9b51e0 50%, #ff6900 100%)',
      },
      borderRadius: {
        DEFAULT: '4px',
      },
    },
  },
  plugins: [],
} satisfies Config;
