import React from 'react';
import styles from './Header.module.css'
import Search from '../Search/Search';

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Get Weather</h1>
    </header>
  );
}