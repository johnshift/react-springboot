CREATE TABLE sessions (
	id uuid PRIMARY KEY, 
	csrf_token uuid NOT NULL, 
	principal TEXT NOT NULL,
	recent_ts TIMESTAMP NOT NULL, 
	authorities TEXT[] NOT NULL
);