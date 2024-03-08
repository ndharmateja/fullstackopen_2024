import { useParams } from "react-router-dom";

const Anecdote = ({ anecdotes }) => {
    const { id } = useParams();
    const anecdote = anecdotes.find((a) => a.id.toString() === id);

    if (!anecdote) return <h2>Anecdote not found</h2>;

    const { author, content, info, votes } = anecdote;
    return (
        <div>
            <h2>
                {content} by {author}
            </h2>
            <p>has {votes} votes</p>
            <p>
                for more info see <a href={info}>{info}</a>
            </p>
        </div>
    );
};

export default Anecdote;
