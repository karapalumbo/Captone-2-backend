"use strict";

const db = require("../db.js");
const User = require("../models/user");
const Pet = require("../models/pet");
const { createToken } = require("../helpers/tokens");

const { BCRYPT_WORK_FACTOR } = require("../config");

const testPetIds = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM pets");

  testPetIds[0] = (
    await Pet.get({
      pet_id: 55,
      name: "P1",
      species: "S1",
      age: "A1",
      gender: "G1",
      description: "D1",
      photo: "http://c1.img",
      id: 1,
    })
  ).id;

  testPetIds[1] = (
    await Pet.get({
      pet_id: 56,
      name: "P2",
      species: "P2",
      age: "A2",
      gender: "G2",
      description: "D2",
      photo: "http://c2.img",
      id: 2,
    })
  ).id;

  testPetIds[2] = (
    await Pet.get({
      pet_id: 57,
      name: "C3",
      species: "S3",
      age: "A3",
      gender: "G3",
      description: "D3",
      photo: "http://c3.img",
      id: 3,
    })
  ).id;

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

  await User.favoritePet("u1", testPetIds[1]);
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
