
const { Sequelize } = require('sequelize');

// Create a new Sequelize instance to connect to a local PostgreSQL database
const sequelize = new Sequelize('flightbooking', 'myuser', 'mysecurepassword', {
  host: 'localhost', // Database host (localhost for local Postgres)
  dialect: 'postgres', // Using PostgreSQL as the database dialect
  port: 5432, // Default PostgreSQL port
  logging: false, // Disable logging
  define: {
    timestamps: false, // Disable automatic timestamps
  },
});

// Test the connection to ensure it's working
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection to the PostgreSQL database successful');
  } catch (error) {
    console.error('Unable to connect to the PostgreSQL database:', error);
  }
}

// Run the connection test
testConnection();

module.exports = { sequelize, Sequelize };
