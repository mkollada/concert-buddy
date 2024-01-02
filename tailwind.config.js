/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        themePurple: '#9069F4',
        purple: '#9069F4',
        themeGray: '#1E2129',
        white: '#FFFFFF',
        themePurpleDark: '#542db8',
      }
    },
    
  },
  plugins: [],
}

