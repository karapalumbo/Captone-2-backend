"use strict";

process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");

const { NotFoundError } = require("../expressError");
const db = require("../db.js");
const Pet = require("./pet.js");
const {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPetIds,
} = require("./_testCommon");

beforeAll(commonBeforeAll);
beforeEach(commonBeforeEach);
afterEach(commonAfterEach);
afterAll(commonAfterAll);

/************************************** findAll */

// pet_id, name, species, age, description, gender, color, photos, id;

describe("findAll", function () {
  test("works: no filter", async function () {
    let resp = await Pet.findAll({});

    expect(resp).toEqual([
      {
        pet_id: 11,
        name: "P1",
        species: "S1",
        age: "A1",
        description: "D1",
        gender: "G1",
        color: "C1",
        photos: "http://p1.img",
        organization_id: 1,
      },
      {
        pet_id: 12,
        name: "P2",
        species: "S2",
        age: "A2",
        description: "D2",
        gender: "G2",
        color: "C2",
        photos: "http://p2.img",
        organization_id: 2,
      },
      {
        pet_id: 13,
        name: "P3",
        species: "S3",
        age: "A3",
        description: "D3",
        gender: "G2",
        color: "C2",
        photos: "http://p3.img",
        organization_id: 2,
      },
    ]);
  });

  test("works: search by name", async function () {
    let pets = await Pet.findAll({ name: "P1" });
    expect(pets).toEqual([
      {
        pet_id: 11,
        name: "P1",
        species: "S1",
        age: "A1",
        description: "D1",
        gender: "G1",
        color: "C1",
        photos: "http://p1.img",
        organization_id: 1,
      },
    ]);
  });

  test("works: search by age", async function () {
    let pets = await Pet.findAll({ name: "A2" });
    expect(pets).toEqual([
      {
        pet_id: 12,
        name: "P2",
        species: "S2",
        age: "A2",
        description: "D2",
        gender: "G2",
        color: "C2",
        photos: "http://p2.img",
        organization_id: 2,
      },
    ]);
  });

  test("works: search by color", async function () {
    let pets = await Pet.findAll({ name: "C2" });
    expect(pets).toEqual([
      {
        pet_id: 12,
        name: "P2",
        species: "S2",
        age: "A2",
        description: "D2",
        gender: "G2",
        color: "C2",
        photos: "http://p2.img",
        organization_id: 2,
      },
      {
        pet_id: 13,
        name: "P3",
        species: "S3",
        age: "A3",
        description: "D3",
        gender: "G2",
        color: "C2",
        photos: "http://p3.img",
        organization_id: 2,
      },
    ]);
  });
});

/************************************** get pet by id */

describe("get", function () {
  test("works", async function () {
    let pet = await Pet.get(11);
    expect(pet).toEqual({
      pet_id: 11,
      name: "P1",
      species: "S1",
      age: "A1",
      description: "D1",
      gender: "G1",
      color: "C1",
      photos: "http://p1.img",
      organization_id: 1,
    });
  });

  test("not found if no such pet", async function () {
    try {
      await Pet.get(0);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});

/************************************** get organization by id */

describe("get", function () {
  test("works", async function () {
    let org = await Pet.getOrganization("01");
    expect(org).toEqual({
      id: 1,
      org_id: "O1",
      name: "ON1",
      address: "OA1",
      email: "OE1",
      phone: "OP1",
    });
  });

  test("not found if no such org", async function () {
    try {
      await Pet.getOrganization(99);
      fail();
    } catch (err) {
      expect(err instanceof NotFoundError).toBeTruthy();
    }
  });
});
