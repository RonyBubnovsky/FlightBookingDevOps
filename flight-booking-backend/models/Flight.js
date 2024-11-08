const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  name: { type: String, unique: true },  
  departure: String,
  destination: String,
  price: Number,
});

const Flight = mongoose.model('Flight', flightSchema);

module.exports = Flight;
