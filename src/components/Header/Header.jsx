import React from 'react';
import styles from './Header.module.css'
import Search from '../search/Search';

export default function Header() {
  return (
    <header className={styles.header}>
      <Search/>
      <h1>Weather Analytics Dashboard</h1>
    </header>
  );
}