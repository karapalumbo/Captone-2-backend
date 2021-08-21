"use strict";

const request = require("supertest");

const app = require("../app");

const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPetIds,
  u1Token,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** GET /pets */

describe("GET /pets", function () {
  test("ok for anon", async function () {
    const resp = await request(app).get(`/pets`);
    expect(resp.body).toEqual({
      pets: [
        {
          pet_id: testPetIds[0],
          name: "P1",
          species: "S1",
          age: "A1",
          description: "D1",
          gender: "G1",
          color: "C1",
          id: 1,
        },
        {
          pet_id: testPetIds[1],
          name: "P2",
          species: "S2",
          age: "A2",
          description: "D2",
          gender: "G2",
          color: "C2",
          id: 2,
        },
        {
          pet_id: testPetIds[2],
          name: "P3",
          species: "S3",
          age: "A3",
          description: "D3",
          gender: "G2",
          color: "C2",
          id: 3,
        },
      ],
    });
  });

  test("works: filtering", async function () {
    const resp = await request(app).get(`/pets`).query({ color: "C2" });
    expect(resp.body).toEqual({
      pets: [
        {
          pet_id: testPetIds[1],
          name: "P2",
          species: "S2",
          age: "A2",
          description: "D2",
          gender: "G2",
          color: "C2",
          id: 2,
        },
        {
          pet_id: testPetIds[2],
          name: "P3",
          species: "S3",
          age: "A3",
          description: "D3",
          gender: "G2",
          color: "C2",
          id: 3,
        },
      ],
    });
  });

  test("bad request on invalid filter key", async function () {
    const resp = await request(app).get(`/pets`).query({ nope: "nope" });
    expect(resp.statusCode).toEqual(400);
  });
});

/************************************** GET /pets/:id */

describe("GET /pets/:id", function () {
  test("works for anon", async function () {
    const resp = await request(app).get(`/pets/${testPetIds[0]}`);
    expect(resp.body).toEqual({
      pet: {
        pet_id: testPetIds[0],
        name: "P1",
        species: "S1",
        age: "A1",
        description: "D1",
        gender: "G1",
        color: "C1",
        id: 1,
      },
    });
  });

  test("not found for no such pet", async function () {
    const resp = await request(app).get(`/pet/0`);
    expect(resp.statusCode).toEqual(404);
  });
});
