import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./notificationReducer";
import blogsReducer from "./blogsReducer";
import visibilityReducer from "./visibilityReducer";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        visible: visibilityReducer,
        user: userReducer,
        users: usersReducer,
    },
});

export default store;
