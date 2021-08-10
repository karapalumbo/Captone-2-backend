CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL, 
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE pets (
  pet_id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL,
  color TEXT,
  description TEXT,
  photos TEXT
);

CREATE TABLE favorites (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  pet_id INTEGER
    REFERENCES pets ON DELETE CASCADE,
  PRIMARY KEY (username, pet_id)
);
