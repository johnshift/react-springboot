## Best Practices
- Always provide a `Service interface` for better summary of methods.  
Only annotate `@Service` into `ServiceImpl` for spring to inject your implementations. 
- You are only required to provide `@Autowired` if you have multiple constructors.  
`@Autowired` is automatically added if a bean has only one constructor. 
- Only `ServiceImpl` should throw exceptions.  
All exceptions should be catched by `ExceptionHandlers`

## TODO
- Run `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";` psql command in github CI/CD postgres instance;
- Enable `"uuid-ossp"` extension in heroku postgres.
- Note you might need to alter the db_user into SUPERUSER.