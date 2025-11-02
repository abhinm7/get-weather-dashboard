import React from 'react';
import { useSelector } from 'react-redux';
import WeatherCard from '../WeatherCard/WeatherCard';
import styles from './Dashboard.module.css';
import SettingsToggle from '../SettingsToggle/SettingsToggle';
import Search from '../Search/Search';

export default function Dashboard() {
  const favoriteCities = useSelector((state) => state.favorites.cities);

  return (
    <div className={styles.dashboard}>
      <h2>Get Weather Details</h2>
      <Search/>
      <SettingsToggle/>
      <div className={styles.cardContainer}>
        {favoriteCities.map((city) => (
          <WeatherCard key={city} cityName={city} />
        ))}
      </div>
    </div>
  );
}