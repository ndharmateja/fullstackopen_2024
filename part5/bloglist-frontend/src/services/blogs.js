import axios from "axios";
const blogsUrl = "/api/blogs";
const loginUrl = "/api/login";

const login = (username, password) => {
    const request = axios.post(loginUrl, { username, password });
    return request.then((response) => response.data);
};

const getAll = () => {
    const request = axios.get(blogsUrl);
    return request.then((response) => response.data);
};

export default { login, getAll };
