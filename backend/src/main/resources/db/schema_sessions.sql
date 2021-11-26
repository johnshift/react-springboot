CREATE TABLE sessions(
	id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
	csrf_token uuid DEFAULT uuid_generate_v4(), 
	recent_ts TIMESTAMP NOT NULL, 
	roles TEXT[] NOT NULL
);