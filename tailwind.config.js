/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0066FF',
          dark: '#001F3F',
          light: '#E6F0FF',
        },
      },
      borderRadius: {
        lg: '12px',
        md: '8px',
      },
    },
  },
  plugins: [],
}
