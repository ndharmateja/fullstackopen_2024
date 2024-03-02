import { useQuery } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";

const App = () => {
    const handleVote = (anecdote) => {
        console.log("vote");
    };

    const result = useQuery({
        queryKey: ["anecdotes"],
        queryFn: async () => {
            const res = await axios.get("http://localhost:3001/anecdotes");
            return res.data;
        },
        retry: 1,
        refetchOnWindowFocus: false,
    });

    if (result.isError)
        return (
            <div>anecdote service not available due to problems in server</div>
        );

    if (result.isLoading) return <div>loading...</div>;

    const anecdotes = result.data;
    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map((anecdote) => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>
                            vote
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default App;
