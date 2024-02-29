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
            state.message = action.payload;
            state.show = true;
        },
        hideNotification() {
            return initialState;
        },
        setTimeoutId(state, action) {
            state.timeoutId = action.payload;
        },
    },
});

const { showNotification, hideNotification, setTimeoutId } =
    notificationSlice.actions;

/**
 *
 * @param {*} message notification message
 * @param {*} time in seconds
 * @returns
 */
export const showAndHideNotification = (message, time = 5) => {
    return (dispatch, getState) => {
        // clear timeout id of previous notification (if exists)
        const { notification } = getState();
        clearTimeout(notification.timeoutId);

        // show the new notification
        dispatch(showNotification(message));

        // set a timeout for hiding the notification
        const newTimeoutId = setTimeout(() => {
            dispatch(hideNotification());

            // set timeout id to -1 after hiding the notification
            dispatch(setTimeoutId(-1));
        }, time * 1000);

        // set timeout id to be the new timeout id
        dispatch(setTimeoutId(newTimeoutId));
    };
};

export default notificationSlice.reducer;
