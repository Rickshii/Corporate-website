/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#10b981',
        'primary-light': '#34d399',
        'primary-dark': '#059669',
        secondary: '#0f1f4d',
        'secondary-light': '#1e3a8a',
        'secondary-mid': '#162040',
        accent: '#34d399',
        'accent-gold': '#f59e0b',
        'bg-light': '#f0fdf9',
        navy: {
          50: '#eef2ff',
          100: '#e0e7ff',
          900: '#0f1f4d',
          950: '#080f26',
        },
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        glass: {
          white: 'rgba(255,255,255,0.08)',
          border: 'rgba(255,255,255,0.15)',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'emerald-shimmer': 'linear-gradient(135deg, #10b981 0%, #059669 50%, #0f1f4d 100%)',
        'navy-emerald': 'linear-gradient(135deg, #0f1f4d 0%, #162040 50%, #10b981 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(16,185,129,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(16,185,129,0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'width-expand': {
          '0%': { width: '0' },
          '100%': { width: '3.5rem' },
        },
        'blob-drift': {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(20px, -20px) scale(1.05)' },
          '66%': { transform: 'translate(-15px, 15px) scale(0.97)' },
        },
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.5s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
        'fade-up': 'fade-up 0.7s ease-out forwards',
        'width-expand': 'width-expand 0.6s ease-out forwards',
        'blob-drift': 'blob-drift 8s ease-in-out infinite',
      },
      boxShadow: {
        'emerald-sm': '0 4px 14px rgba(16,185,129,0.25)',
        'emerald-md': '0 8px 28px rgba(16,185,129,0.35)',
        'emerald-lg': '0 16px 48px rgba(16,185,129,0.4)',
        'navy-sm': '0 4px 14px rgba(15,31,77,0.25)',
        'navy-md': '0 8px 28px rgba(15,31,77,0.35)',
        'card': '0 10px 40px -10px rgba(15,31,77,0.12)',
        'card-hover': '0 20px 60px -10px rgba(15,31,77,0.22)',
        'glass': '0 8px 32px rgba(15,31,77,0.18), inset 0 1px 0 rgba(255,255,255,0.15)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
