/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#CC1415',
        secondary: '#007339',
        basic_black: '#14181A',
        bg_black: '#1B2022',
        basic_gray: '#CCCCCC',
        basic_white: '#F6F6F6',
        disable_white: '#f6f6f65e',
      },
      fontFamily: {
        // yeseva: "'Yeseva One', 'Noto Serif TC', serif",
        anybody: "'Anybody','Noto Sans TC', cursive",
      },
      screens: {
        xs: '380px',
      },
    },
  },
  plugins: [],
};
