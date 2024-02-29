import { createSlice } from "@reduxjs/toolkit";
import anecdotesService from "../services/anecdotes";
import { showAndHideNotification } from "./notificationReducer";

const anecdotesSlice = createSlice({
    name: "anecdotes",
    initialState: [],
    reducers: {
        appendAnecdote(state, action) {
            const anecdote = action.payload;
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

export const { appendAnecdote, voteAnecdote, setAnecdotes } =
    anecdotesSlice.actions;

export const initializeAnecdotes = () => {
    return async (dispatch) => {
        try {
            const anecdotes = await anecdotesService.getAllAnecdotes();
            dispatch(setAnecdotes(anecdotes));
        } catch (e) {
            dispatch(showAndHideNotification(e.message));
        }
    };
};

export default anecdotesSlice.reducer;
