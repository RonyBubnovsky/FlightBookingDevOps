import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import FlightsPage from './FlightsPage';
import MyBookingsPage from './MyBookingsPage';
import { FaPlane, FaHome, FaBook } from 'react-icons/fa';
import backgroundImage from './background.jpg';
import './App.css'; // Importing the CSS file for styles

// Component for the animated plane flying across the screen
const AnimatedPlane = () => {
  return <FaPlane className="animate-flight" />;
};

// Main App component
const App = () => {
  return (
    <Router>
      <MainContent />
    </Router>
  );
};

// Component for main content of the app, contains the navigation and the plane animation logic
const MainContent = () => {
  const location = useLocation(); // Get the current location from the router

  return (
    <div className="App min-h-screen flex flex-col">
      {/* ✨ Navigation Bar with gradient background and icons */}
      <nav className="bg-gradient-to-r from-blue-600 to-purple-700 p-4 z-10 shadow-xl">
        <ul className="flex justify-center space-x-10">
          {/* 🏠 Home Link */}
          <li>
            <Link
              to="/"
              className="flex items-center text-white text-lg font-semibold px-5 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
            >
              <FaHome className="mr-2" />
              Home
            </Link>
          </li>

          {/* ✈️ Available Flights Link */}
          <li>
            <Link
              to="/flights"
              className="flex items-center text-white text-lg font-semibold px-5 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
            >
              <FaPlane className="mr-2" />
              Available Flights
            </Link>
          </li>

          {/* 📖 My Bookings Link */}
          <li>
            <Link
              to="/my-bookings"
              className="flex items-center text-white text-lg font-semibold px-5 py-2 rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 shadow-lg"
            >
              <FaBook className="mr-2" />
              My Bookings
            </Link>
          </li>
        </ul>
      </nav>

      {/* 🌅 Main Content Section with a fixed background image */}
      <div
        className="flex-1 bg-cover bg-center bg-fixed relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        {/* Only show the animated plane on the Home page */}
        {location.pathname === '/' && <AnimatedPlane />}

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

                  {/* 🌍 Fun animated emoji */}
                  <div className="mt-8">
                    <span className="text-8xl text-indigo-500 animate-bounce">🌍</span>
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
  );
};

export default App;
