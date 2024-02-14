const supertest = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const Blog = require("../../models/Blog");
const { multipleBlogs } = require("./helper");

const api = supertest(app);

beforeEach(async () => {
    // Delete all database blogs
    await Blog.deleteMany({});

    // Add all blogs
    const blogObjects = multipleBlogs.map((b) => new Blog(b));
    const promises = blogObjects.map((b) => b.save());
    await Promise.all(promises);
});

test("blogs are returned as json", async () => {
    await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
});

test("number of blogs returned", async () => {
    const { body: blogs } = await api.get("/api/blogs");
    expect(blogs).toHaveLength(multipleBlogs.length);
});

afterAll(async () => {
    await mongoose.connection.close();
});
