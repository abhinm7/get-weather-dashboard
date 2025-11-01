import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    unit: 'celsius'
}

export const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleUnit: (state) => {
            state.unit = state.unit === 'celsius' ? 'fahrenheit' : 'celsius'
        }
    }
})

export const { toggleUnit } = settingSlice.actions;
export default settingSlice.reducer;