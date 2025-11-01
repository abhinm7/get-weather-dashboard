import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cities: ['London', 'New York', 'Tokyo', 'Mumbai'],
}

export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        addCity: (state, action) => {
            if (!state.cities.includes(action.payload)) {
                state.cities.push(action.payload);
            }
        },
        removeCity: (state, action) => {
            state.cities = state.cities.filter((city) => { action.payload !== city })
        }
    }
});
export const { addCity, removeCity } = favoritesSlice.actions;
export default  favoritesSlice.reducer;