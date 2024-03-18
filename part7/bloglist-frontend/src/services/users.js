import axios from "axios";

const usersUrl = "/api/users";

const getAll = async () => {
    const response = await axios.get(usersUrl);
    return response.data;
};

export default { getAll };
