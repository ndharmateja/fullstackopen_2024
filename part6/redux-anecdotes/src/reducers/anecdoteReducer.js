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
        setAnecdotes(_state, action) {
            return action.payload;
        },
        updateAnecdote(state, action) {
            const { id } = action.payload;
            return state.map((a) =>
                a.id !== id ? a : { ...a, ...action.payload }
            );
        },
    },
});

const { appendAnecdote, setAnecdotes, updateAnecdote } = anecdotesSlice.actions;

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

export const createAnecdote = (content) => {
    return async (dispatch) => {
        const createdAnecdote = await anecdotesService.createAnecdote(content);
        dispatch(appendAnecdote(createdAnecdote));
        dispatch(showAndHideNotification(`you created '${content}'`, 3));
    };
};

export const voteAnecdote = (id, content) => {
    return async (dispatch, getState) => {
        // get the curr votes of the anecdote object
        const anecdoteToUpdate = getState().anecdotes.find((a) => a.id === id);

        // return if not a valid id
        if (!anecdoteToUpdate) return;

        // call the service and update
        const updatedAnecdote = await anecdotesService.updateAnecdote(id, {
            votes: anecdoteToUpdate.votes + 1,
        });

        // update the state with the returned data
        dispatch(updateAnecdote(updatedAnecdote));
        dispatch(showAndHideNotification(`you voted '${content}'`, 3));
    };
};

export default anecdotesSlice.reducer;
