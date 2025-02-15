import { useState } from "react";
import SearchForm from "./components/SearchForm";
import FlightResults from "./components/FlightResults";
import { searchFlights } from "./services/api";

import { dummyData } from "./assets/dummyData";

const App = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const extractFlights = (jsonData) => {
    return jsonData.data.itineraries.map((itinerary) => {
      const firstLeg = itinerary.legs[0]; // First leg of the journey
      const airline = firstLeg.carriers.marketing[0].name;

      // Convert ISO date to readable format
      const departureTime = new Date(firstLeg.departure).toLocaleString(
        "en-US",
        {
          // weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      );

      const arrivalTime = new Date(firstLeg.arrival).toLocaleString("en-US", {
        // weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const duration = formatDuration(firstLeg.durationInMinutes);
      const price = itinerary.price.formatted;

      return {
        airline,
        departureTime,
        arrivalTime,
        duration,
        price,
      };
    });
  };

  const handleSearch = async ({
    from,
    to,
    originEntityId,
    destinationEntityId,
    date,
    passengers,
  }) => {
    setLoading(true);
    setError("");

    try {
      const results = await searchFlights({
        originSkyId: from,
        destinationSkyId: to,
        originEntityId,
        destinationEntityId,
        date,
        passengers,
      });

      const expected_results = dummyData;

      const flights = extractFlights(expected_results);

      setFlights(flights);
    } catch (err) {
      setError("Failed to fetch flights. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center">Spotter Flights Clone</h1>
      <br />
      <SearchForm onSearch={handleSearch} />
      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      <FlightResults flights={flights} />
    </div>
  );
};

export default App;
