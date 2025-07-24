/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {


  extend: {
  colors: {
    primary: {
      50: '#eef2ff',
        100: '#e0e7ff',
          200: '#c7d2fe',
            300: '#a5b4fc',
              400: '#818cf8',
                500: '#6366f1',
                  600: '#4f46e5',
                    700: '#4338ca',
                      800: '#3730a3',
                        900: '#312e81',
        },
    secondary: {
      50: '#f0fdfa',
        100: '#ccfbf1',
          200: '#99f6e4',
            300: '#5eead4',
              400: '#2dd4bf',
                500: '#14b8a6',
                  600: '#0d9488',
                    700: '#0f766e',
                      800: '#115e59',
                        900: '#134e4a',
        },
    accent: {
      50: '#fff7ed',
        100: '#ffedd5',
          200: '#fed7aa',
            300: '#fdba74',
              400: '#fb923c',
                500: '#f97316',
                  600: '#ea580c',
                    700: '#c2410c',
                      800: '#9a3412',
                        900: '#7c2d12',
        }
  },
  animation: {
    'float': 'float 6s ease-in-out infinite',
      'pulse-slow': 'pulse 3s ease-in-out infinite',
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
};
