"use strict";

/** Routes for pets. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const Pet = require("../models/pet");
const petSearchSchema = require("../schemas/petSearch.json");

const router = express.Router({ mergeParams: true });

/** GET / =>
 *   { pets: [ { pet_id, name, species, age, gender, color, description, photos }, ...] }
 *
 * Can provide search filter in query:
 * - name
 * - color
 * - age
 */

router.get("/", async function (req, res, next) {
  const q = req.query;

  try {
    const validator = jsonschema.validate(q, petSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const pets = await Pet.findAll(q);
    return res.json({ pets });
  } catch (err) {
    return next(err);
  }
});

/** GET /[petId] => { pet }
 *
 * Returns { pet_id, name, species, age, gender, color, description, photos }
 *
 */

router.get("/:pet_id", async function (req, res, next) {
  try {
    const pet = await Pet.get(req.params.pet_id);
    return res.json({ pet });
  } catch (err) {
    return next(err);
  }
});

/** GET /[organization] => { organization }
 *
 * Returns { org_id, name, address, phone, email }
 *
 */

router.get("/organization/:id", async function (req, res, next) {
  try {
    console.warn(req.params);
    const idStr = +req.params.id;
    const idNum = parseInt(idStr);
    const org = await Pet.getOrganization(idNum);
    return res.json({ org });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
