import React from 'react';
import styles from './DetailedView.module.css'
 
import { useParams, Link } from 'react-router-dom';

export default function DetailedView() {
  
  const { cityName } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <Link to="/">&larr; Back to Dashboard</Link>
      <h2>Detailed View for {cityName}</h2>
      <p>Forecasts and charts will go here...</p>
    </div>
  );
}