const { Sequelize } = require('sequelize');

// Directly using the raw connection string
const sequelize = new Sequelize('postgresql://myuser:mysecurepassword@postgres:5432/flightbooking', {
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
