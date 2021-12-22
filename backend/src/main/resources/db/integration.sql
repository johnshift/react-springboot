drop table if exists users;
create table users (
	id serial primary key,
	username text not null,
	email text not null,
	password text not null,
	name text not null,
	veil text not null,
	is_enabled boolean not null,
	description text,
	constraint users_username_key unique (username),
	constraint users_email_key unique (email),
	constraint users_veil_key unique (veil)
);
INSERT INTO users (id, username, email, password, name, veil, is_enabled) VALUES
	(99999, 'demo', 'demo@example.com', '$2a$10$c4JbjbzXEIwC2fVqUIDzaen2qIUGuK7L8lq2LQpvnu2kNbrMwaa1G', 'Demo User', 'anonymous1', false)