import { useState } from "react";
import Input from "./Input";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogsReducer";

const CreateBlogForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(createBlog(title, author, url));
        setTitle("");
        setAuthor("");
        setUrl("");
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <Input label="title" value={title} setValue={setTitle} />
                <Input label="author" value={author} setValue={setAuthor} />
                <Input label="url" value={url} setValue={setUrl} />
                <button>create</button>
            </form>
        </div>
    );
};

export default CreateBlogForm;
