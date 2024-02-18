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

export default { login, getAll };
