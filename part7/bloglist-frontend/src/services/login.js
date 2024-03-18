import axios from "axios";
const loginUrl = "/api/login";

const login = async (username, password) => {
    const { data } = await axios.post(loginUrl, { username, password });
    return data;
};

export default { login };
