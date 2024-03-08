import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew, setNotification }) => {
    const content = useField("text");
    const author = useField("text");
    const info = useField("text");

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
        });
        navigate("/");
        setNotification(`a new anecdote "${content}" has been created`);
        setTimeout(() => {
            setNotification("");
        }, 5000);
    };

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button>create</button>
            </form>
        </div>
    );
};

export default CreateNew;
