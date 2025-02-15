import { useState, useEffect } from "react";
import { searchAirport } from "../services/api";

const SearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);

  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [originEntityId, setOriginEntityId] = useState(null);
  const [destinationEntityId, setDestinationEntityId] = useState(null);

  // Fetch airport suggestions when user types in "From" field
  useEffect(() => {
    if (from.length > 2) {
      searchAirport(from).then((airports) => {
        setFromSuggestions(airports.data || []);
      });
    } else {
      setFromSuggestions([]);
    }
  }, [from]);

  // Fetch airport suggestions when user types in "To" field
  useEffect(() => {
    if (to.length > 2) {
      searchAirport(to).then((airports) => {
        setToSuggestions(airports.data || []);
      });
    } else {
      setToSuggestions([]);
    }
  }, [to]);

  // Handle selection of airport from suggestions
  const handleSelectFrom = (airport) => {
    setFrom(airport.skyId);
    setOriginEntityId(airport.entityId);
    setFromSuggestions([]);
  };

  const handleSelectTo = (airport) => {
    setTo(airport.skyId);
    setDestinationEntityId(airport.entityId);
    setToSuggestions([]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({
      from,
      to,
      originEntityId,
      destinationEntityId,
      date,
      passengers,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {/* FROM Field with Suggestions */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <div className="absolute bg-white border mt-1 w-full shadow-md z-999 block">
            {fromSuggestions.length > 0 && (
              <ul
                key={fromSuggestions.length}
                className="bg-white border mt-1 w-full shadow-md block"
              >
                {fromSuggestions.map((airport) => (
                  <li
                    key={airport.entityId}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectFrom(airport)}
                  >
                    {airport.presentation?.title} ({airport.skyId})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* TO Field with Suggestions */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            required
            className="border p-2 rounded w-full"
          />
          <div className="absolute bg-white border mt-1 w-full shadow-md z-50 block">
            {toSuggestions.length > 0 && (
              <ul className="bg-white border mt-1 w-full shadow-md block">
                {toSuggestions.map((airport) => (
                  <li
                    key={airport.entityId}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSelectTo(airport)}
                  >
                    {airport.presentation?.title} ({airport.skyId})
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* DATE and PASSENGERS Fields */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          min="1"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
          required
          className="border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Search Flights
      </button>
    </form>
  );
};

export default SearchForm;
