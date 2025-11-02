import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherByCity } from "../../features/weatherSlice";
import styles from "./WeatherCard.module.css";

export default function WeatherCard({ cityName }) {
  const dispatch = useDispatch();
  const detailUrl = `/city/${cityName.toLowerCase()}`;

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

  const getIconUrl = (iconCode) => {
    return `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const renderContent = () => {
    if (weatherData) {
      return (
        <>
          <h3>{weatherData.name}</h3>
          <img
            src={getIconUrl(weatherData.weather[0].icon)}
            alt={weatherData.weather[0].description}
          />
          <p className={styles.temp}>{Math.round(weatherData.main.temp)}°C</p>
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
    <div className={styles.card}>
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
