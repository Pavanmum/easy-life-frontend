import axios from "axios";
import { useNavigate } from "react-router-dom";

const SlotList = ({ slots, serviceId }) => {
  const navigate = useNavigate();
  

  const handleBooking = async (slotId) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/bookings`, {
        serviceId,
        slotId,
      },
      {
        withCredentials: true,
      }
    );
      alert("Slot booked successfully!");
      navigate("/booking");
      // Optionally refresh the data or update UI
    } catch (error) {
      console.error("Booking failed:", error);

      alert("Failed to book slot");
    }
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });

  return (
    <div className="mt-4">
      <h3 className="text-md font-semibold mb-2">Available Slots</h3>
      <ul className="space-y-2">
        {slots.filter(slot => !slot.isBooked).map(slot => (
          console.log(slot._id),
          <li
            key={slot._id}
            className="flex justify-between items-center border p-2 rounded bg-green-50"
          >
            <span>
              {formatDate(slot.startTime)} -{" "}
              {new Date(slot.endTime).toLocaleTimeString()}
            </span>
            <button
              onClick={() => handleBooking(slot._id)}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Book
            </button>
          </li>
        ))}

        {slots.filter(slot => !slot.isBooked).length === 0 && (
          <p className="text-red-500">No available slots</p>
        )}
      </ul>
    </div>
  );
};

export default SlotList;
