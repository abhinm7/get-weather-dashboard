import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const fetchWeatherByCity = createAsyncThunk(
    'weather/fetchByCity',
    async (cityName, { rejectWithValue }) => {
        try {
            const response = await axios.get(BASE_URL, {
                params: {
                    q: cityName,
                    appid: API_KEY,
                    units: 'metric'
                }
            })
            return response.data;
        } catch (e) {
            return rejectWithValue(e.response.data);
        }
    }
);

const initialState = {
  data: {}, 
  status: 'idle',
  error: null,
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data[action.payload.name.toLowerCase()] = action.payload;
        console.log(action.payload);
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default weatherSlice.reducer;