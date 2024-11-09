const Flight = require('./models/Flight');

const seedFlights = async () => {
  try {
    // Insert 10 sample flights into the database
    const sampleFlights = [
      { name: 'Flight A', departure: 'New York', destination: 'London', price: 500 },
      { name: 'Flight B', departure: 'Los Angeles', destination: 'Paris', price: 600 },
      { name: 'Flight C', departure: 'Chicago', destination: 'Tokyo', price: 700 },
      { name: 'Flight D', departure: 'Houston', destination: 'Dubai', price: 800 },
      { name: 'Flight E', departure: 'San Francisco', destination: 'Berlin', price: 550 },
      { name: 'Flight F', departure: 'Miami', destination: 'Barcelona', price: 650 },
      { name: 'Flight G', departure: 'Seattle', destination: 'Rome', price: 750 },
      { name: 'Flight H', departure: 'Dallas', destination: 'Madrid', price: 850 },
      { name: 'Flight I', departure: 'Boston', destination: 'Amsterdam', price: 450 },
      { name: 'Flight J', departure: 'Washington DC', destination: 'London', price: 500 },
    ];

    // Insert the sample flights into the database
    await Flight.insertMany(sampleFlights);
    console.log('Sample flights added to the database!');
  } catch (error) {
    console.error('Error seeding flights:', error);
  }
};

module.exports = seedFlights;
