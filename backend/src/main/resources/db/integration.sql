drop table if exists users;
create table users (
	id serial primary key,
	username text not null unique,
	email text not null unique,
	password text not null,
	name text not null,
	veil text not null unique,
	is_enabled boolean not null,
	description text
);
INSERT INTO users (username, email, password, name, veil, is_enabled) VALUES
	('demo', 'demo@example.com', '$2a$10$c4JbjbzXEIwC2fVqUIDzaen2qIUGuK7L8lq2LQpvnu2kNbrMwaa1G', 'Demo User', 'anonymous1', false)