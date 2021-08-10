"use strict";

const { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } = require("constants");
const { deserialize } = require("v8");
const { search } = require("../app");
const db = require("../db");
const { NotFoundError } = require("../expressError");
const { sqlForPartialUpdate } = require("../helpers/sql");

/** Related functions for companies. */

class Pet {
  /** Create a pet (from data), update db, return new pet data.
   *
   * data should be { name, species, age, gender, color, description, photos }
   *
   * Returns { id, name, species, age, gender, color, description, photos }
   **/

  // static async create(data) {
  //   const result = await db.query(
  //     `INSERT INTO pets (pet_id,
  //                       name,
  //                       species,
  //                       age,
  //                       gender,
  //                       color,
  //                       description,
  //                       photos)
  //          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  //          RETURNING id, pet_id, name, species, age, gender, color, description, photos`,
  //     [
  //       data.pet_id,
  //       data.name,
  //       data.species,
  //       data.age,
  //       data.gender,
  //       data.color,
  //       data.description,
  //       data.photos,
  //     ]
  //   );
  //   let pet = result.rows[0];

  //   return pet;
  // }

  /** Find all pets (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - species
   * - color
   * - age
   * - gender
   *
   * Returns [{ id, name, species, age, gender, color, description, photos }, ...]
   * */

  static async findAll(searchFilters = {}) {
    let query = `SELECT name,
                        species,
                        color,
                        age,
                        gender,
                        description, 
                        photos
                 FROM pets`;
    let whereExpressions = [];
    let queryValues = [];

    const { species, color, age, gender } = searchFilters;

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (species !== undefined) {
      queryValues.push(`%${species}%`);
      whereExpressions.push(`species ILIKE $${queryValues.length}`);
    }

    if (color !== undefined) {
      queryValues.push(`%${color}%`);
      whereExpressions.push(`color ILIKE $${queryValues.length}`);
    }

    if (age !== undefined) {
      queryValues.push(`%${age}%`);
      whereExpressions.push(`age ILIKE $${queryValues.length}`);
    }

    if (gender !== undefined) {
      queryValues.push(`%${gender}%`);
      whereExpressions.push(`gender ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" AND ");
    }

    // Finalize query and return results

    query += " ORDER BY name";
    const petsRes = await db.query(query, queryValues);
    return petsRes.rows;
  }

  /** Given a pet id, return data about pet.
   *
   * Returns { id, name, species, age, gender, color, description, photos }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(pet_id) {
    const petRes = await db.query(
      `SELECT pet_id,
              name, 
              species, 
              age, 
              gender, 
              color, 
              description, 
              photos 
        FROM pets
        WHERE pet_id = $1`,
      [pet_id]
    );

    const pet = petRes.rows[0];

    if (!pet) throw new NotFoundError(`No pet: ${pet_id}`);

    return pet;
  }
}

module.exports = Pet;
