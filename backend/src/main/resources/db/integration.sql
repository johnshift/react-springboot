DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT,
	UNIQUE(id, name)
);
INSERT INTO users (name, description) VALUES
	('ben affleck', 'actor of batman'),
	('B-A-T-M-A-N', 'likes black');

DROP TABLE IF EXISTS user_veils CASCADE;
CREATE TABLE user_veils (
	user_id INTEGER NOT NULL,
	veil_id INTEGER NOT NULL,
	PRIMARY KEY(user_id, veil_id)
);
INSERT INTO user_veils (user_id, veil_id) VALUES (
	(SELECT id FROM users where name = 'ben affleck'), 
	(SELECT id FROM users where name = 'B-A-T-M-A-N')	
);

DROP TABLE IF EXISTS credentials CASCADE;
CREATE TABLE credentials (
	id SERIAL PRIMARY KEY,
	username TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	user_id INTEGER NOT NULL,
	veil_id INTEGER NOT NULL,
	is_verified BOOLEAN NOT NULL,
	UNIQUE(username),
	FOREIGN KEY (user_id, veil_id) REFERENCES user_veils (user_id, veil_id)
		ON DELETE CASCADE
);
INSERT INTO credentials (username, password, email, user_id, veil_id, is_verified) VALUES
	('batman', '$2a$10$v18wFJddnl9tGLu37kQcG.EYvp4scbebr9HDWxEjhqXVDVRvIbFre', 'batman@gmail.com', 
		(SELECT id FROM users where name = 'ben affleck'), 
		(SELECT id FROM users where name = 'B-A-T-M-A-N'),
		true
	);

DROP TABLE IF EXISTS sessions CASCADE;
CREATE TABLE sessions (
	id uuid PRIMARY KEY, 
	csrf_token uuid NOT NULL, 
	principal TEXT NOT NULL,
	recent_ts TIMESTAMP NOT NULL, 
	authorities TEXT[] NOT NULL
);
INSERT INTO sessions (id, csrf_token, principal, recent_ts, authorities) VALUES
	('8da7279e-75e9-4b6b-9949-b0c7edda455b', '202a96cd-dc51-447e-a88a-80d315561df1', '', current_timestamp, '{}'),
	('a2ab50d6-21fc-44b2-90d7-74d76924aeda', 'a63f4ff3-9dd0-4bbd-b90c-d4b107e74057', 'batman', current_timestamp, '{"ROLE_USER", "posts:read", "reactions:read"}');

DROP TABLE IF EXISTS posts CASCADE;
CREATE TABLE posts (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL,
	owner TEXT NOT NULL,
	created TIMESTAMP NOT NULL,
	body TEXT NOT NULL,
	votes INTEGER NOT NULL,
	FOREIGN KEY (user_id, owner) REFERENCES users (id, name)
		ON DELETE CASCADE
);
INSERT INTO posts (user_id, owner, created, body, votes) VALUES
	((SELECT id FROM users where name = 'ben affleck'), 'ben affleck', current_timestamp, 'This is first public post of ben.', 0),
	((SELECT id FROM users where name = 'B-A-T-M-A-N'), 'B-A-T-M-A-N', current_timestamp, 'This is first veil post of batman.', 0);