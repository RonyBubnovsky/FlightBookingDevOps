const mongoose = require('mongoose');
const Flight = require('./models/Flight'); // Adjust this path if necessary

async function seedDatabase() {
  try {
    await mongoose.connect('mongodb://localhost:27017/flights', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');

    const sampleFlights = [
      { name: 'Flight A', departure: 'New York', destination: 'Los Angeles', price: 300 },
      { name: 'Flight B', departure: 'Chicago', destination: 'Miami', price: 150 },
      { name: 'Flight C', departure: 'Dallas', destination: 'San Francisco', price: 220 },
      { name: 'Flight D', departure: 'Atlanta', destination: 'Seattle', price: 180 },
      { name: 'Flight E', departure: 'Boston', destination: 'Orlando', price: 170 },
      { name: 'Flight F', departure: 'Houston', destination: 'Las Vegas', price: 250 },
      { name: 'Flight G', departure: 'Denver', destination: 'Phoenix', price: 200 },
      { name: 'Flight H', departure: 'Detroit', destination: 'Philadelphia', price: 160 },
      { name: 'Flight I', departure: 'Minneapolis', destination: 'Washington D.C.', price: 210 },
      { name: 'Flight J', departure: 'San Diego', destination: 'Portland', price: 230 },
    ];

    // Use `insertMany` with { ordered: false } to continue on duplicates
    await Flight.insertMany(sampleFlights, { ordered: false });
    console.log('Sample flights inserted successfully!');
  } catch (error) {
    // Check for specific error type or message if possible
    console.error('Error inserting sample flights:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed.');
  }
}

seedDatabase();
