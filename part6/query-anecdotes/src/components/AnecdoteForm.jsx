import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    hideNotificationAction,
    showNotificationAction,
    useNotificationDispatch,
} from "../NotificationContextProvider";

const AnecdoteForm = () => {
    const dispatchNotification = useNotificationDispatch();
    const queryClient = useQueryClient();

    const newAnecdoteMutation = useMutation({
        mutationFn: async (newAnecdote) => {
            const res = await axios.post(
                "http://localhost:3001/anecdotes",
                newAnecdote
            );
            return res.data;
        },
        onSuccess: (newAnecdote) => {
            const anecdotes = queryClient.getQueryData(["anecdotes"]);
            queryClient.setQueryData(
                ["anecdotes"],
                anecdotes.concat(newAnecdote)
            );
            dispatchNotification(
                showNotificationAction(
                    `anecdote '${newAnecdote.content}' created`
                )
            );
            setTimeout(() => {
                dispatchNotification(hideNotificationAction());
            }, 5000);
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = "";
        newAnecdoteMutation.mutate({ content, votes: 0 });
    };

    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
