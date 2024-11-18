// tailwind.config.js
// Exporting the Tailwind CSS configuration
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}", // Scans all HTML, JS, and JSX files in the src folder
  ],
  theme: {
    extend: {
      // Adding custom colors to the Tailwind theme
      colors: {
        primary: '#4CAF50',
        secondary: '#2C3E50',
        accent: '#3498DB',
      },
      // Adding custom fonts to the Tailwind theme
      fontFamily: {
        sans: ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
