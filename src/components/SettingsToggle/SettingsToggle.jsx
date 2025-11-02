import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleUnit } from '../../features/settingsSlice'; 
import styles from './SettingsToggle.module.css';

export default function SettingsToggle() {
  const currentUnit = useSelector((state) => state.settings.unit);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleUnit());
  };

  return (
    <div className={styles.toggleContainer}>
      <span>Celsius °C</span>
      <label className={styles.switch}>
        <input 
          type="checkbox" 
          checked={currentUnit === 'fahrenheit'}
          onChange={handleToggle}
        />
        <span className={styles.slider}></span>
      </label>
      <span>Fahrenheit °F</span>
    </div>
  );
}