const { dummy } = require("../utils/list_helper");

describe("test dummy function", () => {
    const blogs = [];
    test("dummy should return 1", () => expect(dummy(blogs)).toBe(1));
});
