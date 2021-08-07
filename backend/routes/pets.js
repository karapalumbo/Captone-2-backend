"use strict";

/** Routes for pets. */

const jsonschema = require("jsonschema");

const express = require("express");
const { BadRequestError } = require("../expressError");
const pet = require("../models/pet");
const petSearchSchema = require("../schemas/petSearch.json");

const router = express.Router({ mergeParams: true });

/** GET / =>
 *   { pets: [ { id, name, species, age, gender, color, description, photos }, ...] }
 *
 * Can provide search filter in query:
 * - species
 * - color
 * - age
 * - gender

 * Authorization required: none
 */

router.get("/", async function (req, res, next) {
  const q = req.query;

  try {
    const validator = jsonschema.validate(q, petSearchSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const pets = await pet.findAll(q);
    return res.json({ pets });
  } catch (err) {
    return next(err);
  }
});

/** GET /[petId] => { pet }
 *
 * Returns { id, name, species, age, gender, color, description, photos }
 *
 * Authorization required: none
 */

router.get("/:id", async function (req, res, next) {
  try {
    const pet = await pet.get(req.params.id);
    return res.json({ pet });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[handle]  =>  { deleted: id }
 *
 * Authorization required: none
 */

router.delete("/:id", async function (req, res, next) {
  try {
    await pet.remove(req.params.id);
    return res.json({ deleted: +req.params.id });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
