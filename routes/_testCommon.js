"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Pet = require("../models/pet");
const { createToken } = require("../helpers/tokens");

const { BCRYPT_WORK_FACTOR } = require("../config");

const testPetIds = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  // await db.query("DELETE FROM pets");

  /************************************** POST /auth/token */

  describe("POST /auth/token", function () {
    test("works", async function () {
      const resp = await request(app).post("/auth/token").send({
        username: "u1",
        password: "password1",
      });
      expect(resp.body).toEqual({
        token: expect.any(String),
      });
    });

    test("unauth with non-existent user", async function () {
      const resp = await request(app).post("/auth/token").send({
        username: "no-such-user",
        password: "password1",
      });
      expect(resp.statusCode).toEqual(401);
    });

    test("unauth with wrong password", async function () {
      const resp = await request(app).post("/auth/token").send({
        username: "u1",
        password: "nope",
      });
      expect(resp.statusCode).toEqual(401);
    });

    test("bad request with missing data", async function () {
      const resp = await request(app).post("/auth/token").send({
        username: "u1",
      });
      expect(resp.statusCode).toEqual(400);
    });

    test("bad request with invalid data", async function () {
      const resp = await request(app).post("/auth/token").send({
        username: 42,
        password: "above-is-a-number",
      });
      expect(resp.statusCode).toEqual(400);
    });
  });

  /************************************** POST /auth/register */

  await User.register({
    username: "u1",
    firstName: "U1F",
    lastName: "U1L",
    email: "user1@user.com",
    password: "password1",
  });
  await User.register({
    username: "u2",
    firstName: "U2F",
    lastName: "U2L",
    email: "user2@user.com",
    password: "password2",
  });
  await User.register({
    username: "u3",
    firstName: "U3F",
    lastName: "U3L",
    email: "user3@user.com",
    password: "password3",
  });

  // await User.favoritePet("u1", 11);
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

const u1Token = createToken({ username: "u1" });
const u2Token = createToken({ username: "u2" });

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPetIds,
  u1Token,
  u2Token,
};
