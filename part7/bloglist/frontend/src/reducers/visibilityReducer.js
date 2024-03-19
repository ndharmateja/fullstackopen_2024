import { createSlice } from "@reduxjs/toolkit";

const visibilitySlice = createSlice({
    name: "visibility",
    initialState: false,
    reducers: {
        toggleVisibility(state) {
            return !state;
        },
    },
});

export const { toggleVisibility } = visibilitySlice.actions;

export default visibilitySlice.reducer;
