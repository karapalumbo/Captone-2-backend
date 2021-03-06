"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser } = require("../middleware/auth");
const { BadRequestError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

/** POST / { user }  => { user, token }
 *
 * Adds a new user.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, email }, token }
 *
 * Authorization required: none
 **/

router.post("/", async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});

/** GET / => { users: [ {username, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: none
 **/

router.get("/", async function (req, res, next) {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});

/** GET /[username] => { user }
 *
 * Returns { username, pets }
 *   where pets is { id, title, companyHandle, companyName, state } ******
 *
 * Authorization required: same user-as-:username
 **/

router.get("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email }
 *
 **/

router.patch("/:username", ensureCorrectUser, async function (req, res, next) {
  try {
    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map((e) => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: same-user-as-:username
 **/

// router.delete("/:username", ensureCorrectUser, async function (req, res, next) {
//   try {
//     await User.remove(req.params.username);
//     return res.json({ deleted: req.params.username });
//   } catch (err) {
//     return next(err);
//   }
// });

/** POST /[username]/pets/[id]  { state } => { favorites }
 *
 * Returns {"favorited": petId}
 *
 * Authorization required:  same-user-as-:username
 * */

router.post(
  "/:username/pets/:pet_id",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const petIdString = +req.params.pet_id;
      const petId = parseInt(petIdString);
      await User.favoritePet(req.params.username, petId);
      return res.json({ favorited: petId });
    } catch (err) {
      return next(err);
    }
  }
);

router.delete(
  "/:username/pets/delete/:pet_id",
  ensureCorrectUser,
  async function (req, res, next) {
    try {
      const petIdString = +req.params.pet_id;
      const petId = parseInt(petIdString);
      await User.unfavoritePet(petId);
    } catch (err) {
      return next(err);
    }
  }
);

module.exports = router;
