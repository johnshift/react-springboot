CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	UNIQUE(id, name)
);

CREATE TABLE user_veils (
	user_id INTEGER NOT NULL,
	veil_id INTEGER NOT NULL,
	PRIMARY KEY(user_id, veil_id)
);

CREATE TABLE credentials (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	user_id INTEGER NOT NULL,
	veil_id INTEGER NOT NULL,
	UNIQUE(username),
	FOREIGN KEY (user_id, veil_id) REFERENCES user_veils (user_id, veil_id)
		ON DELETE CASCADE
);