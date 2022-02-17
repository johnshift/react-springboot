drop table if exists post_votes cascade;
create table post_votes (
	id serial primary key,
	user_id bigint not null,
	post_id bigint not null,
	vote smallint not null default 0,
	foreign key (user_id) references users (id)
		on delete cascade,
	foreign key (post_id) references posts (id)
		on delete cascade
);

INSERT INTO post_votes (user_id, post_id, vote) 
VALUES 
	(100000, 1, -1), 
	(100000, 2, 1);


-- drop table if exists comment_votes cascade;
-- create table comment_votes (
-- 	id serial primary key,
-- 	user_id bigint not null,
-- 	comment_id bigint not null,
-- 	foreign key (user_id) references users (id)
-- 		on delete cascade,
-- 	foreign key (comment_id) references comments (id)
-- 		on delete cascade
-- );