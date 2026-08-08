/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070A12',
          900: '#0B0F19',
          800: '#111622',
          700: '#1A2030',
          600: '#252D40',
          500: '#364056',
        },
        amber: {
          DEFAULT: '#FF6B00',
          50: '#FFF3E8',
          100: '#FFE2C7',
          200: '#FFC79A',
          300: '#FFAB6B',
          400: '#FF8E3D',
          500: '#FF6B00',
          600: '#E55A00',
          700: '#B34A00',
          800: '#803800',
          900: '#4D2400',
        },
        cool: {
          50: '#F5F7FA',
          100: '#E7EBF0',
          200: '#C9D0DA',
          300: '#A6B0BF',
          400: '#7C889B',
          500: '#5A6678',
          600: '#404A5A',
          700: '#2C3442',
          800: '#1B212C',
          900: '#10141C',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(255, 107, 0, 0.45)',
        'glow-sm': '0 0 20px -6px rgba(255, 107, 0, 0.4)',
        card: '0 10px 40px -12px rgba(0,0,0,0.6)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        shimmer: 'shimmer 1.8s linear infinite',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        fadeUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        shimmer: { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
      },
    },
  },
  plugins: [],
}
