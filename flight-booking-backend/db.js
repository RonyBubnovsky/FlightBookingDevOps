// Import dotenv to load environment variables
require('dotenv').config();
const { Sequelize } = require('sequelize');

// Use the DATABASE_URL environment variable (which you will set in the .env file)
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL is required
      rejectUnauthorized: false, // Disable certificate verification for remote connections
    },
  },
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
