import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    show: false,
    timeoutId: -1,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification(state, action) {
            return { ...state, message: action.payload, show: true };
        },
        hideNotification() {
            return initialState;
        },
        setTimeoutId(state, action) {
            return { ...state, timeoutId: action.payload };
        },
    },
});

const { showNotification, hideNotification, setTimeoutId } =
    notificationSlice.actions;

export const showAndHideNotification = (message, time = 3) => {
    return (dispatch, getState) => {
        const { notification } = getState();
        clearTimeout(notification.timeoutId);

        dispatch(showNotification(message));
        const newTimeoutId = setTimeout(() => {
            dispatch(hideNotification());
            dispatch(setTimeoutId(-1));
        }, time * 1000);

        dispatch(setTimeoutId(newTimeoutId));
    };
};

export default notificationSlice.reducer;
