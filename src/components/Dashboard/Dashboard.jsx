import React from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './Dashboard.module.css';

export default function Dashboard() {
  const favoriteCities = useSelector((state) => state.favorites.cities);

  return (
    <div className={styles.dashboard}>
      <h2>Your Dashboard</h2>
      
      <div className={styles.cardContainer}>
        {favoriteCities.map((city) => (
          <WeatherCard key={city} cityName={city} />
        ))}
      </div>
    </div>
  );
}