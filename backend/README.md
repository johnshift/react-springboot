## Best Practices
- Always provide a `Service interface` for better summary of methods.  
Only annotate `@Service` into `ServiceImpl` for spring to inject your implementations. 
- You are only required to provide `@Autowired` if you have multiple constructors.  
`@Autowired` is automatically added if a bean has only one constructor. 
- Only `ServiceImpl` should throw exceptions.  
All exceptions should be catched by `ExceptionHandlers`

## User workflows
- Sessions
	- If no session found in request, a public session is automatically created.
	- Active session-ids are added into cookies with http-only and 1hr max-age.
	- Public sessions don't have any roles and authorities. Principal is also empty.
- CSRF
	- Public sessions inherently passes csrf-filter (csrf-token is added via request attribute).
	- Active sessions are required to explicitly add csrf-token into request headers.
	- All mismatched csrf-tokens are unauthorized.
	- `GET /csrf-token` -> returns csrf-token from current session.
- Login
	- On successful login, promotes pub-session into active-session.  
	All roles and permissions are retrieved and added as authorities into current session.
	- Adds csrf-token into response headers to be used by clients on subsequent requests.

## TODO
- ( ? ? ? ) `uuid-ossp` postgres extension:
	- Run `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` psql command in github CI/CD postgres instance;
	- Enable `"uuid-ossp"` extension in heroku postgres.
	- Note you might need to alter the db_user into SUPERUSER.