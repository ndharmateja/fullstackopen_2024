import React from "react";
import Togglable from "../Togglable";
import CreateBlogForm from "./CreateBlogForm";
import BlogsList from "./BlogsList";

const Blogs = () => {
    return (
        <div>
            <h2>Blogs</h2>
            <Togglable buttonLabel="new blog">
                <CreateBlogForm />
            </Togglable>
            <br />
            <BlogsList />
        </div>
    );
};

export default Blogs;
