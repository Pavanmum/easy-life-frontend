import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ServiceCard from '../components/ServiceCard';

const LandingPage = () => {
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    axios.get(`${import.meta.env.VITE_API_URL}/api/services`)
      .then(res => setServices(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('user');
    navigate('/login');
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Error logging out:", err);
      alert("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Available Services</h1>

        <div className="flex items-center space-x-4">
          <Link to="/booking">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              My Bookings
            </button>
          </Link>

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {user && (
        <div className="mb-4 p-4 border rounded bg-gray-100 shadow-sm">
          <p className="text-gray-700">
            <span className="font-semibold">Logged in as:</span> {user.name} ({user.email})
          </p>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="text-center text-blue-600 text-lg font-medium">
          Loading services...
        </div>
      ) : (
        <div className="space-y-4">
          {services.length > 0 ? (
            services.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <p className="text-gray-500">No services available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
