package dev.johnshift.backend.security;

import java.util.HashSet;
import java.util.Set;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import dev.johnshift.backend.credential.CredentialService;
import lombok.RequiredArgsConstructor;

import dev.johnshift.backend.constants.Roles;


/** Implements {@link UserDetailsService} to enable spring security authentication */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService {
	// public class UserServiceImpl {

	private final CredentialService credentialService;


	/** Implement method used by {@link UserDetailsService}. */
	// @Override
	public UserDetails loadUserByUsername(String principal) throws UsernameNotFoundException {

		// find user by using username
		String password = credentialService.getPasswordByPrincipalOrNull(principal);

		// if using username/email both not found, return exception
		if (password == null) {
			throw new UsernameNotFoundException(principal + " does not exist");
		}

		// create simple authority and attach role user (mostly read authorities)
		Set<GrantedAuthority> authorities = new HashSet<>();
		authorities.addAll(Roles.USER.getGrantedAuthorities());

		// attach write authorities (user-feature id-specific authorities e.g. posts, reactions authorities)

		return new User(principal, password, authorities);
	}

}
