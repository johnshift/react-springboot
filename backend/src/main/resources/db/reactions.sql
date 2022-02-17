drop table if exists post_reactions cascade;
create table post_reactions (
	id serial primary key,
	user_id bigint not null,
	post_id bigint not null,
	reaction text not null,
	foreign key (user_id) references users (id)
		on delete cascade,
	foreign key (post_id) references posts (id)
		on delete cascade
);

INSERT INTO post_reactions (user_id, post_id, reaction) 
VALUES 
	(100000, 1, '🥰'), 
	(100000, 2, '💦');