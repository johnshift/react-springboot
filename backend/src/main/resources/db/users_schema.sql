DROP TABLE IF EXISTS users;
CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  username VARCHAR(64) NOT NULL,
  password VARCHAR(64) NOT NULL
);