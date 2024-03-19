import { createSlice } from "@reduxjs/toolkit";
import blogsService from "../services/blogs";
import { showAndHideNotification } from "./notificationReducer";
import { toggleVisibility } from "./visibilityReducer";

const sortBlogs = (blogs) => blogs.sort((b1, b2) => -(b1.likes - b2.likes));

const blogsSlice = createSlice({
    name: "blogs",
    initialState: [],
    reducers: {
        setBlogs(_state, action) {
            const blogs = action.payload;
            sortBlogs(blogs);
            return blogs;
        },
        increaseLikes(state, action) {
            const id = action.payload;
            const blogs = state.map((b) =>
                b.id === id ? { ...b, likes: b.likes + 1 } : b
            );
            sortBlogs(blogs);
            return blogs;
        },
        removeBlog(state, action) {
            return state.filter((b) => b.id !== action.payload);
        },
        appendBlog(state, action) {
            const blogs = [...state, action.payload];
            sortBlogs(blogs);
            return blogs;
        },
        addComment(state, action) {
            const { blogId, content } = action.payload;
            return state.map((b) =>
                b.id !== blogId
                    ? b
                    : { ...b, comments: [...b.comments, { content }] }
            );
        },
    },
});

const { setBlogs, increaseLikes, removeBlog, appendBlog, addComment } =
    blogsSlice.actions;

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
        const { blogs, user } = getState();
        const { title, author } = blogs.find((b) => b.id === blogId);

        // remove blog locally
        dispatch(removeBlog(blogId));

        // remove from backend
        await blogsService.deleteBlog(blogId, user.token);

        // show notification
        const message = `blog "${title}" by "${author}" deleted`;
        dispatch(showAndHideNotification(message));
    };
};

export const createBlog = (title, author, url) => {
    return async (dispatch, getState) => {
        if (!title || !author || !url) return;

        const blogData = { title, author, url };
        const { user } = getState();
        try {
            const newBlog = await blogsService.createBlog(blogData, user.token);

            // show notification and toggle form visibility and add blog to state
            const message = `a new blog "${title}" by "${author}" added`;
            dispatch(showAndHideNotification(message));
            dispatch(toggleVisibility());
            dispatch(appendBlog(newBlog));
        } catch (error) {
            dispatch(showAndHideNotification(error.response.data.error, true));

            // throw error for the child component
            throw new Error("post creation failed");
        }
    };
};

export const postComment = (blogId, content) => {
    return async (dispatch) => {
        // Add comment locally
        dispatch(addComment({ blogId, content }));

        // Post comment to backend
        await blogsService.postComment(blogId, content);
    };
};

export default blogsSlice.reducer;
