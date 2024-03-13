import axios from "axios";
const blogsUrl = "/api/blogs";
const loginUrl = "/api/login";

let token = null;

const setToken = (t) => (token = `Bearer ${t}`);

const login = async (username, password) => {
    const { data } = await axios.post(loginUrl, { username, password });
    return data;
};

const getAll = async () => {
    const { data } = await axios.get(blogsUrl);
    return data;
};

const createBlog = async (title, author, url) => {
    const config = { headers: { Authorization: token } };
    const { data: newBlog } = await axios.post(
        blogsUrl,
        { title, author, url },
        config
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

const deleteBlog = async (blogId) => {
    const config = { headers: { Authorization: token } };
    await axios.delete(`${blogsUrl}/${blogId}`, config);
};

export default { setToken, login, getAll, createBlog, updateBlog, deleteBlog };
