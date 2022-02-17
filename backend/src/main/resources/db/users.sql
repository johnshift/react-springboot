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
	(id, username, veil, email, password, name,  is_verified, description, veil_description) 
VALUES 
	(
		99999, 'demo','someone',  'demo@example.com', 
		'$2a$10$c4JbjbzXEIwC2fVqUIDzaen2qIUGuK7L8lq2LQpvnu2kNbrMwaa1G', 
		'Demo User', false, 
		'Profile Description ...', 'Veil Description ...'
	),
	(
		100000, 'hanscem', 'so-very-gwapo', 'hanscem@example.com',
		'$2a$10$jApxSJxov0gNSvtB8VbZeODkZ2hg.kMmkYHzuI7nXMWa1TTuCYDvy',
		'John Ballesteros',  true,
		'Very handsome creature.', 'The name says it all.'
	),
	(
		200000, 'nikka', 'grossgusting', 'nikka@example.com',
		'$2a$10$jApxSJxov0gNSvtB8VbZeODkZ2hg.kMmkYHzuI7nXMWa1TTuCYDvy',
		'Nikka Melgar',  true,
		'Very suplada.', 'No description.'
	);