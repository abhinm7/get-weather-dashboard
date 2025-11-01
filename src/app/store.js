import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../features/settingsSlice";
import favoritesReducer from "../features/favoritesSlice";

export const store = configureStore({
    reducer: {
        settings: settingsReducer,
        favorites: favoritesReducer
    }
});
