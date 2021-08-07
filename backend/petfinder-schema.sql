CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE pets (
  id SERIAL PRIMARY KEY,
  pet_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  age INTEGER,
  gender INTEGER NOT NULL,
  color TEXT,
  description TEXT NOT NULL,
  photos TEXT,
);

CREATE TABLE favorites (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  pet_id INTEGER
    REFERENCES pets ON DELETE CASCADE,
  PRIMARY KEY (username, pet_id)
);
