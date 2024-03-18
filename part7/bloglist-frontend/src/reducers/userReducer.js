import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import loginService from "../services/login";
import { BLOG_APP_USER } from "../constants";
import { showAndHideNotification } from "./notificationReducer";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        setUser(_state, action) {
            return action.payload;
        },
    },
});

const { setUser } = userSlice.actions;

export const loadUser = () => {
    return (dispatch) => {
        const userString = window.localStorage.getItem(BLOG_APP_USER);
        if (userString) {
            const parsedUser = JSON.parse(userString);
            dispatch(setUser(parsedUser));
            blogsService.setToken(parsedUser.token);
        }
    };
};

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const fetchedUser = await loginService.login(username, password);

            // Store to local storage
            window.localStorage.setItem(
                BLOG_APP_USER,
                JSON.stringify(fetchedUser)
            );
            dispatch(setUser(fetchedUser));
            blogsService.setToken(fetchedUser.token);
        } catch (error) {
            dispatch(showAndHideNotification(error.response.data.error, true));

            // throw error for the child component
            throw new Error("login failed");
        }
    };
};

export const logout = () => {
    return (dispatch) => {
        window.localStorage.removeItem(BLOG_APP_USER);
        blogsService.setToken(null);
        dispatch(setUser(null));
    };
};

export default userSlice.reducer;
