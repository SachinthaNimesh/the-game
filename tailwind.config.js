/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0F172A', // Slate 900
          card: '#1E293B', // Slate 800
          border: '#334155', // Slate 700
        },
        primary: {
          DEFAULT: '#3B82F6', // Blue 500
          hover: '#2563EB', // Blue 600
        },
        accent: {
          DEFAULT: '#10B981', // Emerald 500
          hover: '#059669', // Emerald 600
        },
        danger: {
          DEFAULT: '#EF4444', // Red 500
          hover: '#DC2626', // Red 600
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pop-in': 'pop-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        'pop-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
