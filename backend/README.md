## Best Practices
- Always provide a `Service interface` for better summary of methods.  
Only annotate `@Service` into `ServiceImpl` for spring to inject your implementations. 
- You are only required to provide `@Autowired` if you have multiple constructors.  
`@Autowired` is automatically added if a bean has only one constructor. 
- Only `ServiceImpl` should throw exceptions.  
All exceptions should be catched by `ExceptionHandlers`

## User workflows
- Sessions
	- [x] If no session found in request, a public session is automatically created.
	- [x] Active session-ids are added into cookies with http-only and 1hr max-age.
	- [x] Public sessions don't have any roles and authorities. Principal is also empty.
- CSRF
	- [x] Public sessions inherently passes csrf-filter (csrf-token is added via request attribute).
	- [x] Active sessions are required to explicitly add csrf-token into request headers.
	- [x] All mismatched csrf-tokens are unauthorized.
	- [x] `GET /csrf-token` -> returns csrf-token from current session.
- Login
	- [ ] Unverified Account:
		1. 	Show info of email verification pending.
		2.	Show resend verification option.
	- [x] Verified Account: 
		1. 	Promotes pub-session into active-session.  
		2.	All roles and permissions are retrieved and added as authorities into current session.
		3.	Adds csrf-token into response headers to be used by clients on subsequent requests.
- Register
	- [x] Input fields: username, email, password, name, veil
	- [x] Register request Validation -> handle exception
	- [x] After Validated: 
		-	Save name to `users` then retrieve id as `user_id`
		- Save veil to `users` then retrieve id as `veil_id`
		-	Save `user_id` and `veil_id` into `user_veils`
		- Save `username`, `email`, `password`, `user_veil`, `is_verified = false` into `credentials`
		- Save `token` and `credential_id` into `register_verification`
		- Send email verification link
	- [x] after Verified Link: 
		- Set `is_verified = true` in `credentials`
		- Delete entry in `register_verification`