// Importing necessary modules and components from React, React Router, and React Icons.
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightsPage from './FlightsPage'; // Component that shows available flights
import MyBookingsPage from './MyBookingsPage'; // Component that shows user's bookings
import { FaPlane, FaHome, FaBook } from 'react-icons/fa'; // Importing icons for a modern UI
import backgroundImage from './background.jpg'; // Background image for the main layout

// Main App component
const App = () => {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        {/* 🌈 Navigation Bar with gradient background and icons */}
        <nav className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 z-10 shadow-xl">
          <ul className="flex justify-center space-x-10">
            {/* 🏠 Home Link */}
            <li>
              <Link
                to="/"
                className="flex items-center text-white text-lg font-semibold px-5 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
              >
                <FaHome className="mr-2" /> {/* Home icon */}
                Home
              </Link>
            </li>

            {/* ✈️ Available Flights Link */}
            <li>
              <Link
                to="/flights"
                className="flex items-center text-white text-lg font-semibold px-5 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
              >
                <FaPlane className="mr-2" /> {/* Plane icon */}
                Available Flights
              </Link>
            </li>

            {/* 📖 My Bookings Link */}
            <li>
              <Link
                to="/my-bookings"
                className="flex items-center text-white text-lg font-semibold px-5 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
              >
                <FaBook className="mr-2" /> {/* Book icon */}
                My Bookings
              </Link>
            </li>
          </ul>
        </nav>

        {/* 🌅 Main Content Section with a fixed background image */}
        <div
          className="flex-1 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url(${backgroundImage})`, // Setting the background image
          }}
        >
          {/* Dark overlay to improve text readability */}
          <div className="bg-black bg-opacity-60 min-h-full flex items-center justify-center">
            {/* Setting up different routes/pages using React Router */}
            <Routes>
              {/* ✈️ Route for Available Flights Page */}
              <Route path="/flights" element={<FlightsPage />} />

              {/* 📖 Route for My Bookings Page */}
              <Route path="/my-bookings" element={<MyBookingsPage />} />

              {/* 🏠 Default Route for Home Page */}
              <Route
                path="/"
                element={
                  <div className="text-center py-16 pb-24">
                    {/* 🎉 Welcome Message with gradient text and animation */}
                    <div className="inline-block text-5xl font-extrabold mb-6">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-pink-500 to-purple-600 animate-pulse tracking-wide">
                        Welcome to the Flight Booking App!
                      </span>
                    </div>

                    {/* ✈️ Fun animated emoji */}
                    <div className="mt-8">
                      <span className="text-8xl text-indigo-500 animate-bounce">✈️</span>
                    </div>

                    {/* 📝 Subtext for additional info */}
                    <p className="mt-8 text-lg text-gray-300">
                      Book your dream flights with ease and comfort ✨
                    </p>
                  </div>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

// Exporting the App component to be used in other parts of the project
export default App;
