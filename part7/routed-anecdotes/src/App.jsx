import { useState } from "react";
import About from "./components/About";
import Footer from "./components/Footer";
import AnecdoteList from "./components/AnecdoteList";
import CreateNew from "./components/CreateNew";
import Menu from "./components/Menu";
import Anecdote from "./components/Anecdote";
import {
    Routes,
    Route,
    BrowserRouter as Router,
    Navigate,
} from "react-router-dom";

const App = () => {
    const [anecdotes, setAnecdotes] = useState([
        {
            content: "If it hurts, do it more often",
            author: "Jez Humble",
            info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
            votes: 0,
            id: 1,
        },
        {
            content: "Premature optimization is the root of all evil",
            author: "Donald Knuth",
            info: "http://wiki.c2.com/?PrematureOptimization",
            votes: 0,
            id: 2,
        },
    ]);

    const [notification, setNotification] = useState("");

    const addNew = (anecdote) => {
        anecdote.id = Math.round(Math.random() * 10000);
        setAnecdotes(anecdotes.concat(anecdote));
    };

    const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

    const vote = (id) => {
        const anecdote = anecdoteById(id);

        const voted = {
            ...anecdote,
            votes: anecdote.votes + 1,
        };

        setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    };

    return (
        <Router>
            <h1>Software anecdotes</h1>
            <Menu />
            {notification && <div>{notification}</div>}
            <Routes>
                <Route
                    path="/"
                    element={<AnecdoteList anecdotes={anecdotes} />}
                />
                <Route
                    path="/anecdotes"
                    element={<Navigate to="/" replace />}
                />
                <Route
                    path="/anecdotes/:id"
                    element={<Anecdote anecdotes={anecdotes} vote={vote} />}
                />
                <Route path="/about" element={<About />} />
                <Route
                    path="/create"
                    element={
                        <CreateNew
                            addNew={addNew}
                            setNotification={setNotification}
                        />
                    }
                />
            </Routes>
            <Footer />
        </Router>
    );
};

export default App;
