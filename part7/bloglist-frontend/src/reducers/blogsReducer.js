import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";

const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(_state, action) {
            return action.payload;
        },
        increaseLikes(state, action) {
            const id = action.payload;
            return state.map((b) =>
                b.id === id ? { ...b, likes: b.likes + 1 } : b
            );
        },
    },
});

const { setBlogs, increaseLikes } = blogsSlice.actions;

export const initializeBlogs = () => {
    return async (dispatch) => {
        const blogs = await blogsService.getAll();

        dispatch(setBlogs(blogs));
    };
};

export const likeBlog = (id) => {
    return async (dispatch, getState) => {
        // Update likes locally
        dispatch(increaseLikes(id));

        // Find appropriate blog
        const { blogs } = getState();
        const blog = blogs.find((b) => b.id === id);

        // Create payload
        const blogCopy = {
            ...blog,
            user: blog.user.id,
        };
        delete blogCopy.id;

        // Update like in backend
        await blogsService.updateBlog(id, blogCopy);
    };
};

export default blogsSlice.reducer;
