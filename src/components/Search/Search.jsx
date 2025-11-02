import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addCity } from "../../features/favoritesSlice";
import { useDebounce } from "../../hooks/useDebounce";
import styles from "./Search.module.css";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct";

export default function Search() {
  
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      setIsLoading(true);
      setResults([]);

      const fetchCities = async () => {
        try {
          const response = await axios.get(GEO_API_URL, {
            params: {
              q: debouncedQuery,
              limit: 5,
              appid: API_KEY,
            },
          });
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching city data", error);
        }
        setIsLoading(false);
      };

      fetchCities();
    } else {
      setResults([]);
    }
  }, [debouncedQuery]);

  const handleResultClick = (city) => {
    dispatch(addCity(city.name));
    setQuery("");
    setResults([]);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {(results.length > 0 || isLoading) && (
        <ul className={styles.resultsList}>
          {isLoading && <li className={styles.loadingItem}>Loading...</li>}
          {results.map((city, index) => (
            <li
              key={`${city.lat}-${city.lon}-${index}`}
              className={styles.resultItem}
              onClick={() => handleResultClick(city)}
            >
              {city.name}, {city.state ? `${city.state},` : ""} {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
