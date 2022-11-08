/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#EA7220',
        secondary: '#007339',
        basic_black: '#1B1C1E',
        basic_gray: '#888888',
        basic_white: '#F6F6F6',
      },
    },
  },
  plugins: [],
};
