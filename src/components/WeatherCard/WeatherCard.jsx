import React from 'react';
import { Link } from 'react-router-dom';
import styles from './WeatherCard.module.css'; 

export default function WeatherCard({ cityName }) {
  const detailUrl = `/city/${cityName}`;

  return (
    <Link to={detailUrl} className={styles.card}>
      <h3>{cityName}</h3>
      <p>Loading weather...</p>
    </Link>
  );
}