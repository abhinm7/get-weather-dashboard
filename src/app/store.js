import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/settingsSlice";
import favoritesReducer from "../features/favoritesSlice";
import weatherReducer from "../features/weatherSlice";
import forecastReducer from '../features/forecastSlice';

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        favorites: favoritesReducer,
        weather: weatherReducer,
        forecast:forecastReducer
    }
});
