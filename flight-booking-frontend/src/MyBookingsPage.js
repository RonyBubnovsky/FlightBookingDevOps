import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// Define the base URL for API requests
const url = 'http://localhost:3001/';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch bookings when the component is mounted
    axios.get(`${url}api/bookings`)
      .then(response => setBookings(response.data))
      .catch(error => console.error("There was an error fetching bookings!", error));
  }, []);

  const cancelBooking = (flightName) => {
    axios.delete(`${url}api/bookings/cancel/${flightName}`)
      .then(response => {
        // Show success alert that disappears after 3 seconds
        Swal.fire({
          title: 'Booking Canceled',
          text: 'Your booking has been successfully canceled.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 1500,
          timerProgressBar: true, // Show a progress bar
        });

        // Remove canceled flight from the UI
        setBookings(bookings.filter(booking => booking.bookedName !== flightName));
      })
      .catch(error => {
        console.error("There was an error canceling the booking:", error);
        // Show error alert that disappears after 3 seconds
        Swal.fire({
          title: 'Error',
          text: 'There was an error canceling your booking. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true, // Show a progress bar
        });
      });
  };

  const cancelAllBookings = () => {
    // Loop through each booking and cancel it
    const cancelPromises = bookings.map(booking =>
      axios.delete(`${url}api/bookings/cancel/${booking.bookedName}`)
    );

    // Wait for all cancellations to complete
    Promise.all(cancelPromises)
      .then(() => {
        // Show success alert for canceling all bookings
        Swal.fire({
          title: 'All Bookings Canceled',
          text: 'All your bookings have been successfully canceled.',
          icon: 'success',
          confirmButtonText: 'OK',
          timer: 1500,
          timerProgressBar: true,
        });

        // Clear all bookings from the UI
        setBookings([]);
      })
      .catch(error => {
        console.error("There was an error canceling all bookings:", error);
        // Show error alert for canceling all bookings
        Swal.fire({
          title: 'Error',
          text: 'There was an error canceling all your bookings. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
          timer: 2000,
          timerProgressBar: true,
        });
      });
  };

  return (
    <div className="flex flex-col items-center min-h-screen py-10 bg-transparent">
      {/* Enhanced Header with Icons */}
      <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-purple-500 to-pink-500 animate-pulse text-center py-4">
        <span className="inline-block text-white">📅</span> {/* Icon separate from gradient */}
        My Flights
        <span className="inline-block text-white">📅</span> {/* Icon separate from gradient */}
      </h1>

      {/* Button to Cancel All Bookings */}
      {bookings.length > 0 && (
        <button
          onClick={cancelAllBookings}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md shadow-md mb-6 transition duration-300 transform hover:scale-105"
          data-cy="cancelAllBookings_button"
        >
          Cancel All Bookings
        </button>
      )}

      {/* If there are no bookings, display a message */}
      {bookings.length === 0 ? (
        <p className="text-center text-xl text-gray-600 mb-8">You don't currently have anything booked.</p>
      ) : (
        <ul className="w-full max-w-3xl space-y-6">
          {bookings.map(booking => (
            <li key={booking._id} className="w-full bg-white shadow-xl rounded-lg p-6 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <div className="flex justify-between items-center w-full">
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800">{booking.bookedName}</h3>
                  <p className="text-lg text-gray-600">{booking.bookedDeparture} to {booking.bookedDestination}</p>
                  <div className="mt-2 bg-teal-100 text-teal-700 font-semibold px-3 py-1 rounded-md inline-block">
                    ${booking.bookedPrice}
                  </div>
                </div>
                <button
                  onClick={() => cancelBooking(booking.bookedName)}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md shadow-md transition duration-300 transform hover:scale-105"
                  data-cy="cancelflight_button"
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
