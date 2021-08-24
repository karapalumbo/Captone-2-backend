const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testPetIds = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM pets");
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM organizations");
  await db.query("DELETE FROM favorites");

  await db.query(
    `INSERT INTO organizations(id,
                              org_id,
                              name,
                              address,
                              email,
                              phone)
     VALUES (1, 'O1', 'ON1', 'OA1', 'OE1', 'OP1'),
            (2, 'O2', 'ON2', 'OA2', 'OE2', 'OP2')
    RETURNING org_id`
  );

  const pet = await db.query(`
    INSERT INTO pets (pet_id, name, species, age, description, gender, color, photos, id)
    VALUES (11, 'P1', 'S1', 'A1', 'D1', 'G1', 'C1', 'http://p1.img', 1),
           (12, 'P2', 'S2', 'A2', 'D2', 'G2', 'C2', 'http://p2.img', 2),
           (13, 'P3', 'S3', 'A3', 'D3', 'G2', 'C2', 'http://p3.img', 2)
    RETURNING pet_id`);

  const user = await db.query(
    `INSERT INTO users (username,
                        password,
                        first_name,
                        last_name,
                        email)
      VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
             ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
      RETURNING username, email`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );

  await db.query(
    `INSERT INTO favorites(username, pet_id)
      VALUES ('u1', 11)
      RETURNING username, pet_id`
  );
}

async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}

module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testPetIds,
};
