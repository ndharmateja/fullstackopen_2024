import { useDispatch } from "react-redux";
import { appendAnecdote } from "../reducers/anecdoteReducer";
import { showAndHideNotification } from "../reducers/notificationReducer";
import anecdotesService from "../services/anecdotes";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        e.preventDefault();

        // get content and empty the value
        const content = e.target.anecdote.value;
        e.target.anecdote.value = "";
        anecdotesService.createAnecdote(content).then((createdAnecdote) => {
            dispatch(appendAnecdote(createdAnecdote));
            dispatch(showAndHideNotification(`you created '${content}'`, 3));
        });
    };

    return (
        <div>
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

export default AnecdoteForm;
