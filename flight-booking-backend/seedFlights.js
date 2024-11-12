const Flight = require('./models/Flight'); // Import the Flight model

const seedFlights = async () => {
  try {
    const sampleFlights = [
      { name: 'American Airlines AA100', departure: 'New York', destination: 'London', price: 500 },
      { name: 'Delta Airlines DL24', departure: 'Los Angeles', destination: 'Paris', price: 600 },
      { name: 'United Airlines UA88', departure: 'Chicago', destination: 'Tokyo', price: 700 },
      { name: 'Emirates EK212', departure: 'Houston', destination: 'Dubai', price: 800 },
      { name: 'Lufthansa LH401', departure: 'San Francisco', destination: 'Berlin', price: 550 },
      { name: 'Iberia IB34', departure: 'Miami', destination: 'Barcelona', price: 650 },
      { name: 'Alitalia AZ222', departure: 'Seattle', destination: 'Rome', price: 750 },
      { name: 'Air France AF450', departure: 'Dallas', destination: 'Madrid', price: 850 },
      { name: 'KLM KL621', departure: 'Boston', destination: 'Amsterdam', price: 450 },
      { name: 'British Airways BA25', departure: 'Washington DC', destination: 'London', price: 500 },
    ];

    for (const flight of sampleFlights) {
      const [newFlight, created] = await Flight.findOrCreate({
        where: { name: flight.name },
        defaults: flight,
      });

      if (created) {
        console.log(`Flight ${flight.name} created.`);
      } else {
        console.log(`Flight ${flight.name} already exists.`);
      }
    }

    console.log('Seeding completed!');
  } catch (error) {
    console.error('Error seeding flights:', error);
  }
};

module.exports = seedFlights;
