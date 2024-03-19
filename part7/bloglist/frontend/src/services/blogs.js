import axios from "axios";
const blogsUrl = "/api/blogs";

const buildConfig = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } };
};

const getAll = async () => {
    const { data } = await axios.get(blogsUrl);
    return data;
};

const createBlog = async ({ title, author, url }, token) => {
    const { data: newBlog } = await axios.post(
        blogsUrl,
        { title, author, url },
        buildConfig(token)
    );

    return newBlog;
};

const updateBlog = async (blogId, newBlog) => {
    const { data: updatedBlog } = await axios.put(
        `${blogsUrl}/${blogId}`,
        newBlog
    );
    return updatedBlog;
};

const deleteBlog = async (blogId, token) => {
    await axios.delete(`${blogsUrl}/${blogId}`, buildConfig(token));
};

const postComment = async (blogId, content) => {
    await axios.post(`${blogsUrl}/${blogId}/comments`, { content });
};

export default { getAll, createBlog, updateBlog, deleteBlog, postComment };
