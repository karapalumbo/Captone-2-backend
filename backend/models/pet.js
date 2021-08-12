"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for companies. */

class Pet {
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
    let query = `SELECT pet_id,
                        name,
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
