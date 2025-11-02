import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity } from "../../features/weatherSlice";
import styles from "./WeatherCard.module.css";
import { removeCity } from "../../features/favoritesSlice";

const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

export default function WeatherCard({ cityName }) {
  const dispatch = useDispatch();
  const detailUrl = `/city/${cityName.toLowerCase()}`;

  const currentUnit = useSelector((state) => state.settings.unit);

  const weatherData = useSelector(
    (state) => state.weather.data[cityName.toLowerCase()]
  );

  const weatherStatus = useSelector((state) => state.weather.status);
  const error = useSelector((state) => state.weather.error);

  useEffect(() => {
    if (!weatherData) {
      dispatch(fetchWeatherByCity(cityName));
    }
  }, [dispatch, cityName, weatherData]);

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeCity(cityName));
  };

  const getIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const renderContent = () => {
    if (weatherData) {
      const tempCelsius = weatherData.main.temp;
      const displayTemp =
        currentUnit === "celsius"
          ? tempCelsius
          : celsiusToFahrenheit(tempCelsius);
      const unitSymbol = currentUnit === "celsius" ? "°C" : "°F";

      return (
        <>
          <button onClick={handleRemove} className={styles.removeButton}>
            &times;
          </button>

          <h3>{weatherData.name}</h3>
          <img
            src={getIconUrl(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
          />

          <p className={styles.temp}>
            {Math.round(displayTemp)}
            {unitSymbol}
          </p>

          <p className={styles.description}>
            {weatherData.weather[0].description}
          </p>
        </>
      );
    }

    if (weatherStatus === "loading") {
      return (
        <>
          <h3>{cityName}</h3>
          <p>Loading...</p>
        </>
      );
    }

    if (weatherStatus === "failed") {
      return (
        <>
          <h3>{cityName}</h3>
          <p className={styles.error}>Failed to load</p>
          <p className={styles.errorSmall}>{error?.message || "Error"}</p>
        </>
      );
    }

    return (
      <>
        <h3>{cityName}</h3>
        <p>Waiting to fetch...</p>
      </>
    );
  };

  return (
    <div className={`${styles.card} ${styles.cardRelative}`}>
      {weatherData ? (
        <Link to={detailUrl} className={styles.linkWrapper}>
          {renderContent()}
        </Link>
      ) : (
        <div className={styles.linkWrapper}>{renderContent()}</div>
      )}
    </div>
  );
}
