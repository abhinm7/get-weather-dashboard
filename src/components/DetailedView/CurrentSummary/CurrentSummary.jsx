import React from 'react';
import styles from './CurrentSummary.module.css';

export default function CurrentSummary({
  currentWeather,
  forecastData,
  currentTemp,
  unitSymbol,
}) {
  return (
    <div className={styles.currentSummary}>
      <h2>
        {forecastData.city.name}, {forecastData.city.country}
      </h2>
      <img
        src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`}
        alt={currentWeather.weather[0].description}
        className={styles.mainIcon}
      />
      <div className={styles.mainTemp}>
        {Math.round(currentTemp)}
        {unitSymbol}
      </div>
      <div className={styles.mainDescription}>
        {currentWeather.weather[0].description}
      </div>
    </div>
  );
}