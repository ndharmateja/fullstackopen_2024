import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    show: false,
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

const { showNotification, hideNotification } = notificationSlice.actions;

/**
 *
 * @param {*} message notification message
 * @param {*} time in seconds
 * @returns
 */
export const showAndHideNotification = (message, time) => {
    return (dispatch) => {
        dispatch(showNotification(message));
        setTimeout(() => dispatch(hideNotification()), time * 1000);
    };
};

export default notificationSlice.reducer;
