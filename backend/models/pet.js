"use strict";

const db = require("../db");
const { NotFoundError } = require("../expressError");

/** Related functions for companies. */

class Pet {
  /** Find all pets (optional filter on searchFilters).
   *
   * searchFilters (all optional):
   * - name
   * - color
   * - age
   *
   * Returns [{ id, name, species, age, gender, color, description, photos }, ...]
   * */

  static async findAll(searchQuery) {
    let query = `SELECT pet_id,
                        name,
                        species,
                        color,
                        age,
                        gender,
                        description, 
                        photos,
                        id AS organization_id
                 FROM pets`;
    let whereExpressions = [];
    let queryValues = [];

    const { name } = searchQuery;

    // For each possible search term, add to whereExpressions and
    // queryValues so we can generate the right SQL

    if (name !== undefined) {
      queryValues.push(`%${name}%`);
      whereExpressions.push(`name ILIKE $${queryValues.length}`);
      queryValues.push(`%${name}%`);
      whereExpressions.push(`color ILIKE $${queryValues.length}`);
      queryValues.push(`%${name}%`);
      whereExpressions.push(`age ILIKE $${queryValues.length}`);
    }

    if (whereExpressions.length > 0) {
      query += " WHERE " + whereExpressions.join(" OR ");
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
              photos, 
              id AS organization_id
        FROM pets
        WHERE pet_id = $1`,
      [pet_id]
    );

    const pet = petRes.rows[0];

    if (!pet) throw new NotFoundError(`No pet: ${pet_id}`);

    return pet;
  }

  static async getOrganization(organization_id) {
    const orgRes = await db.query(
      `SELECT id,
            name,
            address,
            email,
            phone
         FROM organizations
         WHERE id = $1`,
      [organization_id]
    );

    const org = orgRes.rows[0];

    if (!org) throw new NotFoundError(`No organization: ${org_id}`);

    return org;
  }
}

module.exports = Pet;
