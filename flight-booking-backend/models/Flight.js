const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Import the Sequelize instance

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
