import React from "react";
import Togglable from "../Togglable";
import CreateBlogForm from "./CreateBlogForm";
import BlogsList from "./BlogsList";

const Blogs = () => {
    return (
        <div>
            <Togglable buttonLabel="new blog">
                <CreateBlogForm />
            </Togglable>
            <BlogsList />
        </div>
    );
};

export default Blogs;
