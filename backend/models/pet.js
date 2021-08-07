"use strict";

const { deserialize } = require("v8");
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

  static async create(data) {
    const result = await db.query(
      `INSERT INTO pets (name,
                        species,
                             age,
                             gender,
                             color,
                             description,
                             photos)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           RETURNING id, name, species, age, gender, color, description, photos`,
      [
        data.name,
        data.species,
        data.age,
        data.gender,
        data.color,
        data.description,
        data.photos,
      ]
    );
    let pet = result.rows[0];

    return pet;
  }

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

  static async findAll({ species, color, age, gender } = {}) {
    let query = `SELECT p.pet_id,
                        p.species,
                        p.color,
                        p.age,
                        p.gender
                 FROM pets p`;
    let whereExpressions = [];
    let queryValues = [];

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    // if (species !== undefined) {
    //   queryValues.push(species);
    //   whereExpressions.push(`salary >= $${queryValues.length}`);
    // }

    // if (hasEquity === true) {
    //   whereExpressions.push(`equity > 0`);
    // }

    // if (title !== undefined) {
    //   queryValues.push(`%${title}%`);
    //   whereExpressions.push(`title ILIKE $${queryValues.length}`);
    // }

    // if (whereExpressions.length > 0) {
    //   query += " WHERE " + whereExpressions.join(" AND ");
    // }

    // Finalize query and return results

    query += " ORDER BY species";
    const petsRes = await db.query(query, queryValues);
    return petsRes.rows;
  }

  /** Given a pet id, return data about pet.
   *
   * Returns { id, name, species, age, gender, color, description, photos }
   *
   * Throws NotFoundError if not found.
   **/

  static async get(id) {
    const petRes = await db.query(
      `SELECT id,
                  name, 
                  species, 
                  age, 
                  gender, 
                  color, 
                  description, 
                  photos 
           FROM pets
           WHERE id = $1`,
      [id]
    );

    const pet = petRes.rows[0];

    if (!pet) throw new NotFoundError(`No pet: ${id}`);

    return pet;
  }
}

module.exports = Pet;
