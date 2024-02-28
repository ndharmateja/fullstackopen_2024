import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const sortedAnecdotes = useSelector((state) =>
        state.anecdotes.sort((a1, a2) => -(a1.votes - a2.votes))
    );
    const dispatch = useDispatch();

    const vote = (id) => dispatch(voteAnecdote(id));

    return (
        <div>
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
