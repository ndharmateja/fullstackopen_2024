const VOTE_ACTION = "VOTE";
const CREATE_ANECDOTE_ACTION = "CREATE_ANECDOTE";

const anecdotesAtStart = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0,
    };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteReducer = (state = initialState, action) => {
    console.log("state now: ", state);
    console.log("action", action);

    switch (action.type) {
        case VOTE_ACTION: {
            const id = action.payload;
            const stateCopy = [...state];
            return stateCopy.map((a) =>
                a.id !== id ? a : { ...a, votes: a.votes + 1 }
            );
        }

        case CREATE_ANECDOTE_ACTION: {
            const anecdote = action.payload;
            return [...state, anecdote];
        }

        default:
            break;
    }

    return state;
};

export const voteAnecdote = (id) => {
    return {
        type: VOTE_ACTION,
        payload: id,
    };
};

export const createAnecdote = (anecdote) => {
    const anecdoteObj = asObject(anecdote);
    return {
        type: CREATE_ANECDOTE_ACTION,
        payload: anecdoteObj,
    };
};

export default anecdoteReducer;
