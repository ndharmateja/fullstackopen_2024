/* eslint-disable react-refresh/only-export-components */
import { useContext, createContext, useReducer } from "react";

const SHOW = "SHOW";
const HIDE = "HIDE";

const notificationReducer = (state, action) => {
    switch (action.type) {
        case SHOW: {
            return { message: action.payload, show: true };
        }
        case HIDE: {
            return { ...state, show: false };
        }
        default:
            return state;
    }
};

const NotificationContext = createContext();

export const useNotification = () => {
    const { notification } = useContext(NotificationContext);
    return notification;
};
export const useNotificationDispatch = () => {
    const { notificationDispatch } = useContext(NotificationContext);
    return notificationDispatch;
};

// action creators
export const showNotificationAction = (message) => {
    return { type: SHOW, payload: message };
};

export const hideNotificationAction = () => {
    return { type: HIDE };
};

const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        { message: "", show: false }
    );

    return (
        <NotificationContext.Provider
            value={{ notification, notificationDispatch }}
        >
            {props.children}
        </NotificationContext.Provider>
    );
};

export default NotificationContextProvider;
