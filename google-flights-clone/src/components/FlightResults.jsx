const FlightResults = ({ flights }) => {
  if (!flights.length === 0) {
    return <p className="text-center text-gray-500 mt-4">No flights found.</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      {flights.map((flight, index) => (
        <div key={index} className="p-4 border rounded shadow-md result">
          <p className="font-bold">{flight.airline}</p>
          <p>
            {flight.departureTime} → {flight.arrivalTime}
          </p>
          <span>
            <p>{flight.duration}</p>
            <p className="text-green-500 font-bold price">{flight.price}</p>
          </span>
        </div>
      ))}
    </div>
  );
};

export default FlightResults;
