CREATE TABLE sessions (
	session_id uuid PRIMARY KEY, 
	session_csrf_token uuid NOT NULL, 
	session_recent_ts TIMESTAMP NOT NULL, 
	session_roles TEXT[] NOT NULL
);