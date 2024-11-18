// Exporting the PostCSS configuration so it can process CSS in the project
module.exports = {
  plugins: {
    // Adds support for Tailwind CSS, which helps create designs
    tailwindcss: {},
    // Automatically adds browser-specific prefixes to ensure the CSS works in all browsers
    autoprefixer: {},
  },
}
