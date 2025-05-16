import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const userId = "68262fc5dbfaeac61369add9"; // mock user
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/bookings`,{
        withCredentials: true,
      });
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    const confirm = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirm) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/bookings?id=${bookingId}`,{
        withCredentials: true,
      });
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      alert("Booking cancelled!");
    } catch (err) {
      console.error("Cancel failed:", err);
      alert("Failed to cancel booking.");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  if (loading) {
    return <p className="text-center text-gray-600 mt-6">Loading bookings...</p>;
  }

  console.log(bookings)

  return (
    <div className="max-w-3xl mx-auto p-6">
        <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">My Bookings</h2>
         <Link to="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Home
          </button>
        </Link>
</div>
      {bookings.length === 0 ? (
        <div className="text-center text-gray-500">You have no bookings yet.</div>
      ) : (
        <ul className="space-y-4">
          {bookings.map((booking) => (
            <li
              key={booking._id}
              className="bg-white p-5 rounded-xl shadow border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {booking.service?.name || "Unnamed Service"}
                </h3>

                {booking ? (
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(booking.startTime)} -{" "}
                    {new Date(booking.endTime).toLocaleTimeString()}
                  </p>
                ) : (
                  <p className="text-sm text-red-500 mt-1">Slot info missing </p>
                )}

                <p className="text-sm text-green-600 mt-1 capitalize">
                  Status: {booking.status || "unknown"}
                </p>
              </div>

              <button
                onClick={() => handleCancel(booking._id)}
                className="ml-4 bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded transition"
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyBookings;
