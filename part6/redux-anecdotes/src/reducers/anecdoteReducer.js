import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const anecdotesSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        createAnecdote(state, action) {
            const anecdote = asObject(action.payload);
            state.push(anecdote);
        },
        voteAnecdote(state, action) {
            const id = action.payload;
            state.forEach((a) => {
                if (a.id === id) {
                    a.votes += 1;
                }
            });
        },
        setAnecdotes(_state, action) {
            return action.payload;
        },
    },
});

export const { createAnecdote, voteAnecdote, setAnecdotes } =
    anecdotesSlice.actions;
export default anecdotesSlice.reducer;
