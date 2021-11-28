CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT NOT NULL
);

CREATE TABLE user_veils (
	user_id INTEGER NOT NULL,
	veil_id INTEGER NOT NULL,
	PRIMARY KEY(user_id, veil_id)
);

CREATE TABLE credentials (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL,
	password TEXT NOT NULL,
	email TEXT NOT NULL,
	user_id INTEGER NOT NULL,
	veil_id INTEGER NOT NULL,
	FOREIGN KEY (user_id, veil_id) REFERENCES user_veils (user_id, veil_id)
		ON DELETE CASCADE
);