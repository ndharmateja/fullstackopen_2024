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

    console.log(newBlog);
    return newBlog;
};

export default { setToken, login, getAll, createBlog };
