import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './DetailedView.module.css';

export default function DetailedView() {
  const { cityName } = useParams();

  return (
    <div className={styles.detailedView}>
      <Link to="/" className={styles.backLink}>
        &larr; Back to Dashboard
      </Link>
      <h2>Detailed View for {cityName}</h2>
      <p>Forecasts and charts will go here...</p>
    </div>
  );
}