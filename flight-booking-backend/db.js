const { Sequelize } = require('sequelize');

// Directly using the raw connection string
const sequelize = new Sequelize('postgresql://myuser:3SR4uDFCHgu1yGPaCrkE3y1kPQEX6mpL@dpg-cspr0artq21c73915jm0-a.oregon-postgres.render.com/flightbooking_a26i', {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL is required
      rejectUnauthorized: false, // Disable certificate verification
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
