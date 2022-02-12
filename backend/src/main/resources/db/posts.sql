drop table if exists posts cascade;
create table posts (
	id serial primary key,
	user_id bigint not null,
	created timestamp not null,
	body text not null,
	as_veil boolean not null,
	visibility text not null,
	foreign key (user_id) references users (id)
		on delete cascade
);

INSERT INTO posts (user_id, created, body, as_veil, visibility) VALUES 
(
	99999, CURRENT_TIMESTAMP, '^Nikka Melgar^ i love you 😍', false, 'PUBLIC'
),
(
	99999, CURRENT_TIMESTAMP, '^Nikka Melgar^ pakyu 😍', true, 'PUBLIC'
)