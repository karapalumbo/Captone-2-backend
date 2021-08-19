"use strict";

const { NotFoundError, BadRequestError } = require("../expressError");
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

// pet_id, name, species, age, description, gender, color, photos;

describe("findAll", function () {
  test("works: no filter", async function () {
    let pets = await Pet.findAll();
    expect(pets).toEqual([
      {
        pet_id: testPetIds[0],
        name: "P1",
        species: "PS1",
        age: "PA1",
        description: "PD1",
        gender: "PG1",
        color: "PC1",
      },
      {
        pet_id: testPetIds[1],
        name: "P2",
        species: "PS2",
        age: "PA2",
        description: "PD2",
        gender: "PG2",
        color: "PC1",
      },
      {
        pet_id: testPetIds[2],
        name: "P3",
        species: "PS3",
        age: "PA3",
        description: "PD3",
        gender: "PG2",
        color: "PC3",
      },
    ]);
  });

  test("works: search by name", async function () {
    let pets = await Pet.findAll({ name: "P1" });
    expect(pets).toEqual([
      {
        pet_id: testPetIds[0],
        name: "P1",
        species: "PS1",
        age: "PA1",
        description: "PD1",
        gender: "PG1",
        color: "PC1",
      },
    ]);
  });

  test("works: search by age", async function () {
    let pets = await Job.findAll({ age: "PA2" });
    expect(pets).toEqual([
      {
        pet_id: testPetIds[1],
        name: "P2",
        species: "PS2",
        age: "PA2",
        description: "PD2",
        gender: "PG2",
        color: "PC2",
      },
    ]);
  });

  test("works: search by color", async function () {
    let pets = await Job.findAll({ color: "PC1" });
    expect(pets).toEqual([
      {
        pet_id: testPetIds[0],
        name: "P1",
        species: "PS1",
        age: "PA1",
        description: "PD1",
        gender: "PG1",
        color: "PC1",
      },
      {
        pet_id: testPetIds[1],
        name: "P2",
        species: "PS2",
        age: "PA2",
        description: "PD2",
        gender: "PG2",
        color: "PC1",
      },
    ]);
  });
});

/************************************** get */

describe("get", function () {
  test("works", async function () {
    let pet = await Pet.get(testPetIds[0]);
    expect(pet).toEqual({
      pet_id: testPetIds[0],
      name: "P1",
      species: "PS1",
      age: "PA1",
      description: "PD1",
      gender: "PG1",
      color: "PC1",
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
