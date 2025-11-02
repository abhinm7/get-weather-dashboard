import { createSlice } from "@reduxjs/toolkit";

const getInitialCities = () => {
    try {
        const serializedCities = localStorage.getItem('favoriteCities');
        if (serializedCities === null) {
            return ['Mumbai', 'Manama', 'Bengaluru'];
        }
        return JSON.parse(serializedCities);
    } catch (err) {
        console.error("Could not load favorites", err);
        return ['London', 'New York', 'Tokyo'];
    }
};

const saveCitiesToStorage = (cities) => {
    try {
        const serializedCities = JSON.stringify(cities);
        localStorage.setItem('favoriteCities', serializedCities);
    } catch (err) {
        console.error("Could not save favorites", err);
    }
};

const initialState = {
    cities: getInitialCities()
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addCity: (state, action) => {
            const city = action.payload;
            if (!state.cities.find(c => c.toLowerCase() === city.toLowerCase())) {
                state.cities.push(city);
                saveCitiesToStorage(state.cities);
            }
        },
        removeCity: (state, action) => {
            const cityToRemove = action.payload;
            state.cities = state.cities.filter(
                (city) => city.toLowerCase() !== cityToRemove.toLowerCase()
            );
            saveCitiesToStorage(state.cities);
        },
    }
});
export const { addCity, removeCity } = favoritesSlice.actions;
export default favoritesSlice.reducer;