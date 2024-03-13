import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import blogsReducer from "./blogsReducer";
import visibilityReducer from "./visibilityReducer";
import userReducer from "./userReducer";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        visible: visibilityReducer,
        user: userReducer,
    },
});

export default store;
