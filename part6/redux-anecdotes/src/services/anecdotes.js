import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAllAnecdotes = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const createAnecdote = async (content) => {
    const response = await axios.post(baseUrl, { content, votes: 0 });
    return response.data;
};

const updateAnecdote = async (id, body) => {
    const response = await axios.patch(`${baseUrl}/${id}`, body);
    return response.data;
};

export default { getAllAnecdotes, createAnecdote, updateAnecdote };
