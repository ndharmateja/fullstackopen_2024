import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: "",
    show: false,
    timeoutId: -1,
    isError: false,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        showNotification(state, action) {
            const { message, isError } = action.payload;
            return { ...state, message, isError, show: true };
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

export const showAndHideNotification = (message, isError = false, time = 3) => {
    return (dispatch, getState) => {
        const { notification } = getState();
        clearTimeout(notification.timeoutId);

        dispatch(showNotification({ message, isError }));
        const newTimeoutId = setTimeout(() => {
            dispatch(hideNotification());
            dispatch(setTimeoutId(-1));
        }, time * 1000);

        dispatch(setTimeoutId(newTimeoutId));
    };
};

export default notificationSlice.reducer;
