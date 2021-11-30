## Best Practices
- Always provide a `Service interface` for better summary of methods.  
Only annotate `@Service` into `ServiceImpl` for spring to inject your implementations. 
- You are only required to provide `@Autowired` if you have multiple constructors.  
`@Autowired` is automatically added if a bean has only one constructor. 
- Only `ServiceImpl` should throw exceptions.  
All exceptions should be catched by `ExceptionHandlers`

## User workflows
- Sessions
	- no-session-cookie -> create pub-session w/o roles
	- w/ non-existing-session-cookie -> create pub-session w/o roles
	- w/ existing-session-cookie -> load session w/ roles
- CSRF
	- active session but no csrf-token in header -> unauthorized
	- public session but no csrf-token in request attribute -> unauthorized
	- request & db csrf-token mismatch -> unauthorized
	- `GET /csrf-token` -> use current session and returns csrf-token as payload.  
	Subsequent requests should include csrf-token into http headers.
- Login
	- successful login -> promote pub-session into active-session w/ roles -> send csrf-token as response

## TODO
- ( ? ? ? ) `uuid-ossp` postgres extension:
	- Run `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` psql command in github CI/CD postgres instance;
	- Enable `"uuid-ossp"` extension in heroku postgres.
	- Note you might need to alter the db_user into SUPERUSER.