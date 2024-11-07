// src/MyBookingsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings when the component is mounted
    axios.get('http://localhost:3001/api/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error("There was an error fetching bookings!", error));
  }, []);

  const cancelBooking = (flightName) => {
    axios.delete(`http://localhost:3001/api/bookings/cancel/${flightName}`)
      .then(response => {
        // Remove canceled flight from the UI
        setBookings(bookings.filter(booking => booking.bookedName !== flightName)); 
      })
      .catch(error => {
        console.error("There was an error canceling the booking:", error);
        alert("Error canceling the booking");
      });
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">My Bookings</h1>

      {/* If there are no bookings, display a message */}
      {bookings.length === 0 ? (
        <p className="text-center text-xl text-gray-600">You don't currently have anything booked.</p>
      ) : (
        <ul>
          {bookings.map(booking => (
            <li key={booking._id} className="bg-white p-4 rounded-lg shadow-lg mb-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{booking.bookedName}</h3>
                  <p className="text-gray-600">{booking.bookedDeparture} to {booking.bookedDestination}</p>
                  <div className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-md inline-block mt-2">
                    ${booking.bookedPrice}
                  </div>
                </div>
                <button 
                  onClick={() => cancelBooking(booking.bookedName)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Cancel Booking
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookingsPage;
