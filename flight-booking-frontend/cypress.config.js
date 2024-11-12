const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    headless: true, // Run Cypress in headless mode
    video: false, // Disable video recording
    retries: 4, // Set a reasonable retry limit
    defaultCommandTimeout: 10000, // Adjust timeout as needed
    waitForAnimations: false, // Disable waiting for animations to speed up tests
    responseTimeout: 60000, // Adjust timeout as needed
    setupNodeEvents(on, config) {
      // Implement node event listeners here
    },
  },
})