import axios from "axios";

const baseUrl = "http://localhost:3001";

const getAllAnecdotes = async () => {
    const response = await axios.get(`${baseUrl}/anecdotes`);
    return response.data;
};

export default { getAllAnecdotes };
