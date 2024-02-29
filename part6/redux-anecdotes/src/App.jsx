import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { useEffect } from "react";
import anecdotesService from "./services/anecdotes";
import { useDispatch } from "react-redux";
import { setAnecdotes } from "./reducers/anecdoteReducer";
import { showAndHideNotification } from "./reducers/notificationReducer";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        anecdotesService
            .getAllAnecdotes()
            .then((anecdotes) => dispatch(setAnecdotes(anecdotes)))
            .catch((e) => dispatch(showAndHideNotification(e.message)));
    });

    return (
        <div>
            <Notification />
            <h2>Anecdotes</h2>
            <Filter />
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
