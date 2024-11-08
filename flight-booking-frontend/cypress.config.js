const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    screenshotOnRunFailure: false,
    video: false,
    retries: 4,
    defaultCommandTimeout: 15_000,
    waitForAnimations: true,
    responseTimeout: 120_000,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})