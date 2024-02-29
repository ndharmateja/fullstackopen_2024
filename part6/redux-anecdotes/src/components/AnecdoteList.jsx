import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const sortedAnecdotes = useSelector(({ anecdotes, filter }) =>
        anecdotes
            .filter((a) =>
                a.content.toLowerCase().includes(filter.toLowerCase())
            )
            .sort((a1, a2) => -(a1.votes - a2.votes))
    );
    const dispatch = useDispatch();

    return (
        <div>
            {sortedAnecdotes.map(({ id, content, votes }) => (
                <div key={id}>
                    <div>{content}</div>
                    <div>
                        has {votes}
                        <button
                            onClick={() => dispatch(voteAnecdote(id, content))}
                        >
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AnecdoteList;
