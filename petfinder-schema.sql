CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL, 
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
);

CREATE TABLE organizations (
  id SERIAL PRIMARY KEY,
  org_id TEXT NOT NULL, 
  name TEXT, 
  address TEXT, 
  email TEXT, 
  phone TEXT
);

CREATE TABLE pets (
  pet_id INTEGER NOT NULL PRIMARY KEY,
  name TEXT NOT NULL,
  species TEXT NOT NULL,
  age TEXT NOT NULL,
  gender TEXT NOT NULL,
  color TEXT,
  description TEXT,
  photos TEXT,
  id INTEGER
    REFERENCES organizations ON DELETE CASCADE
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  pet_id INTEGER
    REFERENCES pets ON DELETE CASCADE
);


