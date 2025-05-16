import { useState } from 'react';
import SlotList from './SlotList';

const ServiceCard = ({ service }) => {
  const [showSlots, setShowSlots] = useState(false);

  return (
    <div className="bg-white shadow p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">{service.name}</h2>
          <p className="text-sm text-gray-500">{service.description}</p>
          <p className="text-sm mt-1">Price: ${service.price}</p>
        </div>
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded"
          onClick={() => setShowSlots(!showSlots)}
        >
          {showSlots ? 'Hide Slots' : 'Show Slots'}
        </button>
      </div>

      {showSlots && <SlotList slots={service.availableSlots} serviceId={service._id} />}
    </div>
  );
};

export default ServiceCard;
