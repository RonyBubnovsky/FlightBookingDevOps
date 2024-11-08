import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ name: '', departure: '', destination: '' });

  // Fetch flights based on the search query
  const fetchFlights = () => {
    const { name, departure, destination } = searchQuery;
    axios.get('http://localhost:3001/api/flights', { params: { name, departure, destination } })
      .then(response => {
        setFlights(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching flights!", error);
      });
  };

  // Fetch all flights initially or based on the search query
  useEffect(() => {
    fetchFlights();
  }, [searchQuery]); // Re-fetch flights when searchQuery changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    fetchFlights(); // Trigger the flight fetch with current search query
  };

  const handleBookFlight = (flight) => {
    // Send the booking information to the backend
    axios.post('http://localhost:3001/api/bookings', {
      bookedName: flight.name,
      bookedDeparture: flight.departure,
      bookedDestination: flight.destination,
      bookedPrice: flight.price,
    })
    .then(() => {
      // Remove the booked flight from the displayed list
      setFlights(flights.filter(f => f._id !== flight._id));
    })
    .catch(error => console.error("There was an error booking the flight!", error));
  };

  return (
    <div className="flex flex-col items-center">

      {/* Headline */}
      <h1 
        className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                  animate-pulse tracking-wide text-center py-4"
      >
        ✈️ Available Flights ✈️
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex flex-col items-center mb-4 space-y-2">
        <div className="flex space-x-4">
          <input
            type="text"
            name="name"
            value={searchQuery.name}
            onChange={handleInputChange}
            placeholder="Flight Name"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="departure"
            value={searchQuery.departure}
            onChange={handleInputChange}
            placeholder="Departure City"
            className="border rounded p-2"
          />
          <input
            type="text"
            name="destination"
            value={searchQuery.destination}
            onChange={handleInputChange}
            placeholder="Destination City"
            className="border rounded p-2"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Search
          </button>
        </div>
      </form>

      {/* Flights List */}
      <ul>
        {flights.map(flight => (
          <li key={flight._id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{flight.name}</h3>
                <p className="text-gray-600">{flight.departure} to {flight.destination}</p>
                <div className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md inline-block mt-2">
                  ${flight.price}
                </div>
              </div>
              <button 
                onClick={() => handleBookFlight(flight)} 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                Book Flight
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FlightsPage;
