const { DataTypes } = require('sequelize');
const { sequelize, Sequelize } = require('../db'); // Import the Sequelize instance

// Define the Flight model
const Flight = sequelize.define('Flight', {
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  departure: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'flights',
  timestamps: false,    
});

module.exports = Flight;
