const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testPetIds = [];

async function commonBeforeAll() {
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM companies");
  // noinspection SqlWithoutWhere
  await db.query("DELETE FROM users");

  await db.query(`
    INSERT INTO pets(pet_id, name, species, age, description, gender, color, photos)
    VALUES ('p1', 'P1', 'PS1', 'PA1', 'PD1', 'PG1', 'PC1', 'http://p1.img'),
           ('p2', 'P2', 'PS2', 'PA2', 'PD2', 'PG2', 'PC2', 'http://p2.img'),
           ('p3', 'P3', 'PS3', 'PA3', 'PD3', 'PG2', 'PC1', 'http://p3.img')`);

  // const resultsJobs = await db.query(`
  //   INSERT INTO jobs (title, salary, equity, company_handle)
  //   VALUES ('Job1', 100, '0.1', 'c1'),
  //          ('Job2', 200, '0.2', 'c1'),
  //          ('Job3', 300, '0', 'c1'),
  //          ('Job4', NULL, NULL, 'c1')
  //   RETURNING id`);
  // testJobIds.splice(0, 0, ...resultsJobs.rows.map(r => r.id));

  await db.query(
    `
        INSERT INTO users(username,
                          password,
                          first_name,
                          last_name,
                          email)
        VALUES ('u1', $1, 'U1F', 'U1L', 'u1@email.com'),
               ('u2', $2, 'U2F', 'U2L', 'u2@email.com')
        RETURNING username`,
    [
      await bcrypt.hash("password1", BCRYPT_WORK_FACTOR),
      await bcrypt.hash("password2", BCRYPT_WORK_FACTOR),
    ]
  );

  await db.query(
    `
        INSERT INTO favorites(username, pet_id)
        VALUES ('u1', $1)`,
    [testPetIds[0]]
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
