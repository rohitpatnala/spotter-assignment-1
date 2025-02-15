import axios from "axios";

const API_KEY = "67b0386b35msh7b76b9a843bbd33p140ddejsn67270331b5f7";
const BASE_URL = "https://sky-scrapper.p.rapidapi.com/api/v1";

// Axios instance with authentication headers
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
  },
});

// Search Flights API
export const searchFlights = async ({ originSkyId, destinationSkyId, originEntityId, destinationEntityId, date }) => {
  try {
    const response = await apiClient.get("/flights/searchFlights", {
      params: { originSkyId, destinationSkyId, originEntityId, destinationEntityId, date },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
};

// Search Airport API (Autocomplete)
export const searchAirport = async (query) => {
  try {
    const response = await apiClient.get("/flights/searchAirport", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching airports:", error);
    throw error;
  }
};
