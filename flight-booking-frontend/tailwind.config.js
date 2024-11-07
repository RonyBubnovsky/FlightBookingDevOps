// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#2C3E50',
        accent: '#3498DB',
      },
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
