const { sequelize } = require('./db'); // Ensure Sequelize instance is imported
const Flight = require('./models/Flight'); // Import the Flight model
const Booking = require('./models/Booking'); // Import the Booking model

const seedFlights = async () => {
  try {
    // Step 1: Create both the 'flights' and 'bookings' tables
    await sequelize.sync({ force: true }); // This will drop and recreate the tables

    console.log('Tables created: flights and bookings');
    
    // Step 2: Seed sample flights
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

    // Loop through the sample flights data
for (const flight of sampleFlights) {
  // Attempt to find an existing flight or create a new one
  const [newFlight, created] = await Flight.findOrCreate({
    where: { name: flight.name }, // Search for a flight with the same name
    defaults: flight, // If not found, create a new flight with this data
  });

  // Check if a new flight was created or already existed
  if (created) {
    console.log(`Flight ${flight.name} created.`); // Log that the flight was created
  } else {
    console.log(`Flight ${flight.name} already exists.`); // Log that the flight already exists
  }
}

console.log('Seeding completed!'); // Confirm the seeding process is finished
} catch (error) {
  // Log any errors that occurred during the process
  console.error('Error creating tables and seeding data:', error);
}

// Export the seedFlights function so it can be used elsewhere
module.exports = seedFlights;

