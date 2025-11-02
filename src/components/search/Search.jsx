import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCity } from '../../features/favoritesSlice'; 
import styles from './Search.module.css';

export default function Search() {
  const [query, setQuery] = useState(''); 
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (query.trim()) {
      dispatch(addCity(query.trim()));
    }
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.searchInput}
        placeholder="Search for a city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={styles.searchButton}>
        Add
      </button>
    </form>
  );
}