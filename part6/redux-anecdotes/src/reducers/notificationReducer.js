import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "notification message",
    show: true,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification(_state, action) {
            return { message: action.payload, show: true };
        },
        hideNotification() {
            return initialState;
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
