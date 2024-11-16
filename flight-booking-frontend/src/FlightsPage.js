import React, { useState, useEffect, useCallback } from 'react'; 
import axios from 'axios'; 
import Swal from 'sweetalert2'; 

// Set the base URL for the API
const url = 'http://localhost:3001/';

// The main component for displaying flights
const FlightsPage = () => {
  // State hooks for storing flights and search query
  const [flights, setFlights] = useState([]);
  const [searchQuery, setSearchQuery] = useState({ 
    name: '', 
    departure: '', 
    destination: '', 
    minPrice: '', 
    maxPrice: ''
  });

  // Fetch flights from the server with the current search query
  const fetchFlights = useCallback(() => {
    const { name, departure, destination, minPrice, maxPrice } = searchQuery;

    // Convert price inputs to numbers (if provided)
    const min = minPrice ? parseFloat(minPrice) : undefined;
    const max = maxPrice ? parseFloat(maxPrice) : undefined;

    // Make GET request to fetch filtered flights based on search query
    axios.get(`${url}api/flights`, { 
      params: { name, departure, destination, minPrice: min, maxPrice: max } 
    })
      .then(response => {
        // Set the fetched flights in the state
        setFlights(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching flights!", error);
      });
  }, [searchQuery]);

  // Effect hook to fetch flights whenever the searchQuery changes
  useEffect(() => {
    fetchFlights();
  }, [fetchFlights]);

  // Handle changes in the input fields (for the search query)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchQuery(prev => ({ ...prev, [name]: value }));
  };

  // Handle form submission to trigger search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchFlights();
  };

  // Handle booking a flight by making a POST request to the server
  const handleBookFlight = (flight) => {
    axios.post(`${url}api/bookings`, {
      bookedName: flight.name,
      bookedDeparture: flight.departure,
      bookedDestination: flight.destination,
      bookedPrice: flight.price,
    })
    .then(() => {
      // Update the state by removing the booked flight from the list
      setFlights(flights.filter(f => f.id !== flight.id));

      // Show a success message using Swal (SweetAlert)
      Swal.fire({
        title: 'Success!',
        text: 'Flight booked successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        timer: 1500,
        timerProgressBar: true,
      });
    })
    .catch(error => {
      console.error("Error booking flight", error);
      
      // Show an error message using Swal
      Swal.fire({
        title: 'Error!',
        text: 'There was an error booking the flight. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
        timer: 1500,
        timerProgressBar: true,
      });
    });
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-transparent">
      {/* Enhanced Search Flights Headline */}
      <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 animate-pulse text-center py-4">
        ✈️ Explore & Book Your Dream Flight ✈️
      </h1>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 mb-8 space-y-6 transform transition-all hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Search Flights</h2>
        
        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Flight Name Input */}
          <input
            type="text"
            name="name"
            value={searchQuery.name}
            onChange={handleInputChange}
            placeholder="Flight Name"
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
          />
          
          {/* Departure City Input */}
          <input
            type="text"
            name="departure"
            value={searchQuery.departure}
            onChange={handleInputChange}
            placeholder="Departure City"
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
          />
          
          {/* Destination City Input */}
          <input
            type="text"
            name="destination"
            value={searchQuery.destination}
            onChange={handleInputChange}
            placeholder="Destination City"
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Price Range Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Min Price Input */}
          <input
            type="number"
            name="minPrice"
            value={searchQuery.minPrice}
            onChange={handleInputChange}
            placeholder="Min Price"
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
          />
          
          {/* Max Price Input */}
          <input
            type="number"
            name="maxPrice"
            value={searchQuery.maxPrice}
            onChange={handleInputChange}
            placeholder="Max Price"
            className="border rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300 ease-in-out"
          />
        </div>

        {/* Search Button */}
        <button type="submit" className="w-full bg-teal-500 text-white p-3 rounded-md hover:bg-teal-600 transition duration-300">
          Search
        </button>
      </form>

      {/* Flights List */}
      <ul className="w-full max-w-3xl space-y-6">
        {/* Loop through all flights and display them */}
        {flights.map(flight => (
          <li key={flight._id} className="bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                {/* Flight Name */}
                <h3 className="text-2xl font-semibold text-gray-800">{flight.name}</h3>
                
                {/* Departure and Destination */}
                <p className="text-lg text-gray-600">{flight.departure} to {flight.destination}</p>
                
                {/* Flight Price */}
                <div className="mt-2 bg-teal-100 text-teal-700 font-semibold px-3 py-1 rounded-md inline-block">
                  ${flight.price}
                </div>
              </div>
              {/* Book Button */}
              <button 
                onClick={() => handleBookFlight(flight)} 
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 transform hover:scale-105"
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
