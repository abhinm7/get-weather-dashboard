import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const fetchForecast = createAsyncThunk(
    'forecast/fetchForecast',
    async ({ lat, lon, cityName }, { rejectWithValue }) => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    lat: lat,
                    lon: lon,
                    appid: API_KEY,
                    units: 'metric',
                },
            });
            return { data: response.data, cityName: cityName.toLowerCase() };
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const initialState = {
    data: {},
    status: 'idle',
    error: null,
};

export const forecastSlice = createSlice({
    name: 'forecast',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchForecast.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchForecast.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data[action.payload.cityName] = action.payload.data;
            })
            .addCase(fetchForecast.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default forecastSlice.reducer;