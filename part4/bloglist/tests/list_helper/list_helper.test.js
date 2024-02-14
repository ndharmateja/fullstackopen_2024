const listHelper = require("../../utils/list_helper");
const { listWithOneBlog, multipleBlogs } = require("./data");

describe("test dummy function", () => {
    const blogs = [];
    test("dummy should return 1", () =>
        expect(listHelper.dummy(blogs)).toBe(1));
});

describe("total likes", () => {
    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    test("when list has only multple blogs, equals the likes of that", () =>
        expect(listHelper.totalLikes(multipleBlogs)).toBe(36));

    test("when list has only zero blogs, equals the likes of that", () =>
        expect(listHelper.totalLikes([])).toBe(0));
});

describe("favorite blog", () => {
    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.favoriteBlog(listWithOneBlog);
        expect(result).toEqual(listWithOneBlog[0]);
    });

    test("when list has only multple blogs, equals the likes of that", () =>
        expect(listHelper.favoriteBlog(multipleBlogs)).toBe(multipleBlogs[2]));

    test("when list has only zero blogs, equals the likes of that", () =>
        expect(listHelper.favoriteBlog([])).toBe(undefined));
});

describe("most blogs", () => {
    test("when list has only one blog, equals the most blogs of that", () => {
        const result = listHelper.mostBlogs(listWithOneBlog);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            blogs: 1,
        });
    });

    test("when list has only multiple blogs, equals the most blogs of that", () => {
        const result = listHelper.mostBlogs(multipleBlogs);
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3,
        });
    });

    test("when list has only zero blogs, equals the most blogs of that", () => {
        const result = listHelper.mostBlogs([]);
        expect(result).toBe(undefined);
    });
});

describe("most likes", () => {
    test("when list has only one blog, equals the most likes of that", () => {
        const result = listHelper.mostLikes(listWithOneBlog);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 5,
        });
    });

    test("when list has only multiple likes, equals the most likes of that", () => {
        const result = listHelper.mostLikes(multipleBlogs);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17,
        });
    });

    test("when list has only zero likes, equals the most likes of that", () => {
        const result = listHelper.mostLikes([]);
        expect(result).toBe(undefined);
    });
});
