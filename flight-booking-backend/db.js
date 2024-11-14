

const { Sequelize } = require('sequelize');

// Use the DATABASE_URL environment variable (which you will set in the .env file)
const sequelize = new Sequelize('postgres://myuser:mysecurepassword@postgres:5432/flightbooking', {
  dialect: 'postgres',
  logging: false,
});

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Connected to PostgreSQL');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

connectDB();

module.exports = sequelize;
