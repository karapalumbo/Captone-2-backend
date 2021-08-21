"use strict";

const request = require("supertest");

const db = require("../db.js");
const app = require("../app");
const User = require("../models/user");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPetIds,
  u1Token,
  u2Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** POST /users */

describe("POST /users", function () {
  test("unauth for users", async function () {
    const resp = await request(app).post("/users").send({
      username: "u-new",
      password: "password-new",
      email: "new@email.com",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).post("/users").send({
      username: "u-new",
      password: "password-new",
      email: "new@email.com",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("bad request if missing data", async function () {
    const resp = await request(app).post("/users").send({
      username: "u-new",
    });
    expect(resp.statusCode).toEqual(400);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app).post("/users").send({
      username: "u-new",
      password: "password-new",
      email: "not-an-email",
    });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /users */

describe("GET /users", function () {
  test("unauth for anon", async function () {
    const resp = await request(app).get("/users");
    expect(resp.statusCode).toEqual(401);
  });
});

/************************************** GET /users/:username */

describe("GET /users/:username", function () {
  test("works for same user", async function () {
    const resp = await request(app)
      .get(`/users/u1`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        email: "user1@user.com",
        favorites: [testPetIds[0]],
      },
    });
  });

  test("unauth for anon", async function () {
    const resp = await request(app).get(`/users/u1`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if user not found", async function () {
    const resp = await request(app)
      .get(`/users/nope`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});

/************************************** PATCH /users/:username */

describe("PATCH /users/:username", () => {
  test("works for same user", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "New",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
  });

  test("unauth if not same user", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: "New",
      })
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).patch(`/users/u1`).send({
      firstName: "New",
    });
    expect(resp.statusCode).toEqual(401);
  });

  test("not found if no such user", async function () {
    const resp = await request(app).patch(`/users/nope`).send({
      firstName: "Nope",
    });
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request if invalid data", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        firstName: 42,
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(400);
  });

  test("works: can set new password", async function () {
    const resp = await request(app)
      .patch(`/users/u1`)
      .send({
        password: "new-password",
      })
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({
      user: {
        username: "u1",
        firstName: "U1F",
        lastName: "U1L",
        email: "user1@user.com",
        isAdmin: false,
      },
    });
    const isSuccessful = await User.authenticate("u1", "new-password");
    expect(isSuccessful).toBeTruthy();
  });
});

/************************************** POST /users/:username/pets/:id */

describe("POST /users/:username/pets/:id", function () {
  test("works for same user", async function () {
    const resp = await request(app)
      .post(`/users/u1/pets/${testPetIds[1]}`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.body).toEqual({ applied: testPetIds[1] });
  });

  test("unauth for others", async function () {
    const resp = await request(app)
      .post(`/users/u1/pets/${testPetIds[1]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("unauth for anon", async function () {
    const resp = await request(app).post(`/users/u1/pets/${testPetIds[1]}`);
    expect(resp.statusCode).toEqual(401);
  });

  test("not found for no such username", async function () {
    const resp = await request(app)
      .post(`/users/nope/pets/${testPetIds[1]}`)
      .set("authorization", `Bearer ${u2Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("not found for no such pet", async function () {
    const resp = await request(app)
      .post(`/users/u1/pets/0`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });

  test("bad request invalid pet id", async function () {
    const resp = await request(app)
      .post(`/users/u1/pets/0`)
      .set("authorization", `Bearer ${u1Token}`);
    expect(resp.statusCode).toEqual(404);
  });
});
