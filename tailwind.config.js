/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#FF6133', // 주황색
        },
        mint: {
          DEFAULT: '#16DE91', // 민트색
        },
      },
    },
    fontFamily: {
      SUITE: ['SUITE Variable'],
    },
  },
  plugins: [],
}
