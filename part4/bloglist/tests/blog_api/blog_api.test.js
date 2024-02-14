const supertest = require("supertest");
const app = require("../../app");
const mongoose = require("mongoose");
const Blog = require("../../models/Blog");
const {
    initialBlogs,
    singleBlog,
    blogsInDb,
    nonExistingId,
} = require("./helper");

const api = supertest(app);

beforeEach(async () => {
    // Delete all database blogs
    await Blog.deleteMany({});

    // Add all blogs
    const blogObjects = initialBlogs.map((b) => new Blog(b));
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
        expect(blogs).toHaveLength(initialBlogs.length);
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

        const currBlogsInDb = await blogsInDb();

        expect(currBlogsInDb).toHaveLength(initialBlogs.length + 1);
        expect(
            currBlogsInDb.map(({ author, title, url, likes }) => {
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
        let currBlogsInDb = await blogsInDb();
        expect(currBlogsInDb).toHaveLength(initialBlogs.length);

        const singleBlogWithoutUrl = { ...singleBlog };
        delete singleBlogWithoutUrl.url;
        await api.post("/api/blogs").send(singleBlogWithoutUrl).expect(400);
        currBlogsInDb = await blogsInDb();
        expect(currBlogsInDb).toHaveLength(initialBlogs.length);

        const singleBlogWithoutUrlAndTitle = { ...singleBlog };
        delete singleBlogWithoutUrlAndTitle.url;
        delete singleBlogWithoutUrlAndTitle.title;
        await api
            .post("/api/blogs")
            .send(singleBlogWithoutUrlAndTitle)
            .expect(400);
        currBlogsInDb = await blogsInDb();
        expect(currBlogsInDb).toHaveLength(initialBlogs.length);
    });
});

describe("test GET /api/blogs/:id", () => {
    test("check get existing blog", async () => {
        const blogsBefore = await blogsInDb();
        const firstBlog = blogsBefore[0];

        const { body: blog } = await api
            .get(`/api/blogs/${firstBlog.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(blog).toEqual(firstBlog);

        const blogsAfter = await blogsInDb();
        expect(blogsAfter).toHaveLength(blogsBefore.length);
    });

    test("check non-existent id", async () => {
        const id = await nonExistingId();
        await api.get(`/api/blogs/${id}`).expect(404);
    });

    test("check invalid id", async () => {
        await api.get("/api/blogs/alsdkhg").expect(400);
    });
});

describe("test PUT /api/blogs/:id", () => {
    test("check update blog", async () => {
        const blogs = await blogsInDb();
        const blogToUpdate = blogs[0];
        const likes = 12345;
        const url = "new_url";
        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({ likes, url })
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body.likes).toBe(likes);
        expect(response.body.url).toBe(url);

        const blogsAfter = await blogsInDb();
        expect(blogsAfter.length).toBe(initialBlogs.length);

        const updatedBlog = blogsAfter.find(
            (blog) => blog.id === blogToUpdate.id
        );
        expect(updatedBlog.likes).toBe(likes);
        expect(updatedBlog.url).toBe(url);
        expect(updatedBlog.title).toBe(blogToUpdate.title);
        expect(updatedBlog.author).toBe(blogToUpdate.author);
    });

    test("check invalid id", async () => {
        await api.put("/api/blogs/alsdkhg").expect(400);
    });
});

describe("test DELETE /api/blogs/:id", () => {
    test("check delete blog", async () => {
        const blogs = await blogsInDb();
        const blogIdToDelete = blogs[0].id;
        await api.delete(`/api/blogs/${blogIdToDelete}`).expect(204);

        const blogsAfter = await blogsInDb();
        expect(blogsAfter.length).toBe(initialBlogs.length - 1);
        expect(blogsAfter.map((blog) => blog.id)).not.toContain(blogIdToDelete);
    });

    test("check random id", async () => {
        await api.delete("/api/blogs/asldkhg").expect(400);
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});
