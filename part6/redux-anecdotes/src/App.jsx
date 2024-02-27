import { useSelector, useDispatch } from "react-redux";
import { createAnecdote, voteAnecdote } from "./reducers/anecdoteReducer";

const App = () => {
    const sortedAnecdotes = useSelector((state) =>
        state.sort((a1, a2) => -(a1.votes - a2.votes))
    );
    const dispatch = useDispatch();

    const vote = (id) => dispatch(voteAnecdote(id));
    const handleSubmit = (e) => {
        e.preventDefault();
        const anecdote = e.target.anecdote.value;
        console.log(anecdote);
        e.target.anecdote.value = "";
        dispatch(createAnecdote(anecdote));
    };

    return (
        <div>
            <h2>Anecdotes</h2>
            {sortedAnecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input name="anecdote" />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default App;
