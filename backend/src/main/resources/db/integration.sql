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