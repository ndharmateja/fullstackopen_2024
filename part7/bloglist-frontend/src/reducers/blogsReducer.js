import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { showAndHideNotification } from "./notificationReducer";

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
        removeBlog(state, action) {
            return state.filter((b) => b.id !== action.payload);
        },
    },
});

const { setBlogs, increaseLikes, removeBlog } = blogsSlice.actions;

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

export const deleteBlog = (blogId) => {
    return async (dispatch, getState) => {
        // find blog
        const { blogs } = getState();
        const { title, author } = blogs.find((b) => b.id === blogId);

        // remove blog locally
        dispatch(removeBlog(blogId));

        // remove from backend
        await blogsService.deleteBlog(blogId);

        // show notification
        const message = `blog "${title}" by "${author}" deleted`;
        dispatch(showAndHideNotification(message));
    };
};

export default blogsSlice.reducer;
