import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import axios from "axios";
import {
    hideNotificationAction,
    showNotificationAction,
    useNotificationDispatch,
} from "./NotificationContextProvider";

const App = () => {
    const queryClient = useQueryClient();
    const dispatchNotification = useNotificationDispatch();

    const updateVoteMutation = useMutation({
        mutationFn: async (anecdote) => {
            const res = await axios.put(
                `http://localhost:3001/anecdotes/${anecdote.id}`,
                anecdote
            );
            return res.data;
        },
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"]);
            queryClient.setQueryData(
                ["anecdotes"],
                anecdotes.map((a) =>
                    a.id !== updatedAnecdote.id ? a : updatedAnecdote
                )
            );
            dispatchNotification(
                showNotificationAction(
                    `anecdote '${updatedAnecdote.content}' voted`
                )
            );
            setTimeout(() => {
                dispatchNotification(hideNotificationAction());
            }, 5000);
        },
    });

    const handleVote = (anecdote) => {
        const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
        updateVoteMutation.mutate(updatedAnecdote);
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
