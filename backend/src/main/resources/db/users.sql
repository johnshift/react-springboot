drop table if exists users cascade;
create table users (
	id serial primary key,
	username text not null unique,
	email text not null unique,
	password text not null,
	name text not null,
	veil text not null unique,
	is_verified boolean not null,
	description text not null,
	veil_description text not null
);

INSERT INTO users 
	(id, username, email, password, name, veil, is_verified, description, veil_description) 
VALUES (
	99999, 'demo', 'demo@example.com', 
	'$2a$10$c4JbjbzXEIwC2fVqUIDzaen2qIUGuK7L8lq2LQpvnu2kNbrMwaa1G', 
	'Demo User', 'anonymous1', false, 
	'Profile Description ...', 'Veil Description ...'
);