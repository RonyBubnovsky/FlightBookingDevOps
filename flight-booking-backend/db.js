const { Sequelize } = require('sequelize');

// Using the raw connection string for PostgreSQL
const sequelize = new Sequelize('postgres://myuser:mysecurepassword@postgres:5432/flightbooking', {
  dialect: 'postgres',
  logging: false, // Set to true if you want to see raw SQL queries in the console
});

// Function to test database connection
async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDB();

// Export both sequelize and Sequelize
module.exports = {
  sequelize,
  Sequelize,
};
