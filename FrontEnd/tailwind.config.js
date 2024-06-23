/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        orange: '#FB5430',
        blue: '#0583F2',
        whiteblue: '#EDF6FF'
      },
      keyframes: {
        slideInRight: {
          '0%': {
            transform: 'translateX(-40%)',
            opacity: '0'
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1'
          }
        }
      },
      animation: {
        slideInRight: 'slideInRight 1.5s ease-in-out infinite'
      }
    },
    plugins: []
  }
}
