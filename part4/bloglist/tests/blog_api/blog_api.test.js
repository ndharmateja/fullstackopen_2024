const supertest = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const Blog = require("../../models/Blog");
const { multipleBlogs, singleBlog, allBlogsInDb } = require("./helper");

const api = supertest(app);

beforeEach(async () => {
    // Delete all database blogs
    await Blog.deleteMany({});

    // Add all blogs
    const blogObjects = multipleBlogs.map((b) => new Blog(b));
    const promises = blogObjects.map((b) => b.save());
    await Promise.all(promises);
});

describe("test GET /api/blogs", () => {
    test("check if blogs are returned as json", async () => {
        await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    });

    test("check number of blogs returned", async () => {
        const { body: blogs } = await api.get("/api/blogs");
        expect(blogs).toHaveLength(multipleBlogs.length);
    });

    test("check if id is defined in blogs", async () => {
        const { body: blogs } = await api.get("/api/blogs");
        for (const blog of blogs) {
            expect(blog.id).toBeDefined();
        }
    });
});

describe("test POST /api/blogs", () => {
    test("check if new post is added", async () => {
        const { body: newBlog } = await api
            .post("/api/blogs")
            .send(singleBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(newBlog.title).toBe(singleBlog.title);
        expect(newBlog.suthor).toBe(singleBlog.suthor);
        expect(newBlog.url).toBe(singleBlog.url);
        expect(newBlog.likes).toBe(singleBlog.likes);
        expect(newBlog.id).toBeDefined();

        const blogsInDb = await allBlogsInDb();

        expect(blogsInDb).toHaveLength(multipleBlogs.length + 1);
        expect(
            blogsInDb.map(({ author, title, url, likes }) => {
                return {
                    author,
                    title,
                    url,
                    likes,
                };
            })
        ).toContainEqual(singleBlog);
    });

    test("check missing likes", async () => {
        const singleBlogWithoutLikes = { ...singleBlog };
        delete singleBlogWithoutLikes.likes;

        const { body: newBlog } = await api
            .post("/api/blogs")
            .send(singleBlogWithoutLikes)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(newBlog.likes).toBeDefined();
        expect(newBlog.likes).toBe(0);
    });

    test("check missing title / url", async () => {
        const singleBlogWithoutTitle = { ...singleBlog };
        delete singleBlogWithoutTitle.title;
        await api.post("/api/blogs").send(singleBlogWithoutTitle).expect(400);
        let blogsInDb = await allBlogsInDb();
        expect(blogsInDb).toHaveLength(multipleBlogs.length);

        const singleBlogWithoutUrl = { ...singleBlog };
        delete singleBlogWithoutUrl.url;
        await api.post("/api/blogs").send(singleBlogWithoutUrl).expect(400);
        blogsInDb = await allBlogsInDb();
        expect(blogsInDb).toHaveLength(multipleBlogs.length);

        const singleBlogWithoutUrlAndTitle = { ...singleBlog };
        delete singleBlogWithoutUrlAndTitle.url;
        delete singleBlogWithoutUrlAndTitle.title;
        await api
            .post("/api/blogs")
            .send(singleBlogWithoutUrlAndTitle)
            .expect(400);
        blogsInDb = await allBlogsInDb();
        expect(blogsInDb).toHaveLength(multipleBlogs.length);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
