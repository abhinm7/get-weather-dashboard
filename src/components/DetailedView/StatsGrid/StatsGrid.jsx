import React from 'react';
import styles from './StatsGrid.module.css';

// Helper to format time
const formatTime = (timestamp) => {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export default function StatsGrid({
  currentWeather,
  forecastData,
  feelsLikeTemp,
  currentUnit,
  unitSymbol,
}) {
  return (
    <div className={styles.statsGrid}>
      <div className={styles.statBox}>
        <h4>Feels Like</h4>
        <p>
          {Math.round(feelsLikeTemp)}
          {unitSymbol}
        </p>
      </div>
      <div className={styles.statBox}>
        <h4>Humidity</h4>
        <p>{currentWeather.main.humidity}%</p>
      </div>
      <div className={styles.statBox}>
        <h4>Wind Speed</h4>
        {currentUnit === 'celsius' ? (
          <p>{currentWeather.wind.speed.toFixed(1)} m/s</p>
        ) : (
          <p>{(currentWeather.wind.speed * 2.237).toFixed(1)} mph</p>
        )}
      </div>
      <div className={styles.statBox}>
        <h4>Sunrise</h4>
        <p>{formatTime(forecastData.city.sunrise)}</p>
      </div>
      <div className={styles.statBox}>
        <h4>Sunset</h4>
        <p>{formatTime(forecastData.city.sunset)}</p>
      </div>
      <div className={styles.statBox}>
        <h4>Pressure</h4>
        <p>{currentWeather.main.pressure} hPa</p>
      </div>
    </div>
  );
}