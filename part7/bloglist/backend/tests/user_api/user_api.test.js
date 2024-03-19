const supertest = require("supertest");
const app = require("../../app");
const User = require("../../models/User");
const { initialUsers, usersInDb } = require("./helper");
const bcrypt = require("bcrypt");

const api = supertest(app);
const CONTENT_TYPE = "Content-Type";
const APPLICATION_JSON = /application\/json/;

beforeEach(async () => {
    // Delete the existing users
    await User.deleteMany({});

    // Create promises to create users
    const createUserPromises = initialUsers
        .map((user) => new User(user))
        .map((user) => user.save());

    // Execute all promises
    await Promise.all(createUserPromises);
});

test("test create user", async () => {
    const newUser = {
        username: "dharma",
        password: "Test@123",
        name: "Dharma Teja",
    };
    const response = await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect(CONTENT_TYPE, APPLICATION_JSON);

    const savedUser = response.body;
    expect(savedUser.password).toBeUndefined();
    expect(savedUser.name).toBe(newUser.name);
    expect(savedUser.username).toBe(newUser.username);

    const dbUsers = await usersInDb();
    expect(dbUsers.length).toBe(initialUsers.length + 1);
    expect(dbUsers.map((user) => user.username)).toContain(newUser.username);
});

test("test invalid user creations", async () => {
    let newUser = {
        username: "username",
        name: "name",
    };
    let response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toBeDefined();

    newUser = {
        password: "password",
        name: "name",
    };
    response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toBeDefined();

    newUser = {
        name: "name",
    };
    response = await api.post("/api/users").send(newUser).expect(400);
    expect(response.body.error).toBeDefined();

    const dbUsers = await usersInDb();
    expect(dbUsers.length).toBe(initialUsers.length);
});

describe("user creation", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("sekret", 10);
        const user = new User({ name: "Root", username: "root", passwordHash });

        await user.save();
    });

    test("fails if username is too short", async () => {
        const newUser = {
            username: "mo",
            pasword: "sekred",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });

    test("fails if password is too short", async () => {
        const newUser = {
            username: "kalle",
            pasword: "p",
        };

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });

    test("creation fails with proper statuscode and message if username already taken", async () => {
        const newUser = {
            username: "root",
            name: "Superuser",
            password: "salainen",
        };

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
            .expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain("username must be unique");
    });
});
