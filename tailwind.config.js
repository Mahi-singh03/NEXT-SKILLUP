/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './pages/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        animation: {
          slideIn: 'slideIn 0.6s ease-out forwards',
          fadeIn: 'fadeIn 0.6s ease-out forwards',
        },
        keyframes: {
          slideIn: {
            from: { opacity: 0, transform: 'translateY(20px)' },
            to: { opacity: 1, transform: 'translateY(0)' },
          },
          fadeIn: {
            from: { opacity: 0 },
            to: { opacity: 1 },
          },
        },
      },
    },
    plugins: [],
  };