drop table if exists verification cascade;
create table verification (
	token uuid primary key,
	user_id serial not null,
	foreign key (user_id) references users (id)
		on delete cascade
);

insert into verification (token, user_id) 
values (
	'e4eefa02-354b-4706-9430-6693031087cf',
	(select id from users where username = 'demo')
)