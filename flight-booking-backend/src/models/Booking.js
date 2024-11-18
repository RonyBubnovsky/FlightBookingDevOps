const { DataTypes } = require('sequelize');
const { sequelize, Sequelize } = require('../config/db'); // Import the Sequelize instance

// Define the Booking model
const Booking = sequelize.define('Booking', {
  bookedName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookedDeparture: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookedDestination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookedPrice: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'bookings',
  timestamps: false,     
});

module.exports = Booking;
