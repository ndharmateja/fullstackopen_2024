import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(_state, action) {
            return action.payload;
        },
    },
});

const { setBlogs } = blogsSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll();

        dispatch(setBlogs(blogs));
    };
};

export default blogsSlice.reducer;
