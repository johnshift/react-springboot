package dev.johnshift.backend.security;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import dev.johnshift.backend.constants.Roles;
import dev.johnshift.backend.credential.CredentialService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class AuthenticationManagerImpl implements AuthenticationManager {

	private final PasswordEncoder passwordEncoder;
	private final CredentialService credentialService;
	// private final SessionService sessionService;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {

		log.debug("AuthenticationManagerImpl authenticate called");

		if (!(authentication.getPrincipal() instanceof String)) {
			throw new AuthException("Principal is not an instance of string");
		}
		String principal = (String) authentication.getPrincipal();
		log.debug("Authenticate principal = " + principal);

		if (!(authentication.getCredentials() instanceof String)) {
			throw new AuthException("Password is not an instance of string");
		}
		String password = (String) authentication.getCredentials();
		log.debug("Authenticate password = " + password);

		// retrieve db-pass
		String dbPassword = credentialService.getPasswordByPrincipalOrNull(principal);

		// match encrypted password
		boolean passwordMatched = false;
		try {
			boolean shouldUpgradeEncoding = passwordEncoder.upgradeEncoding(password);

			// if password is already encrypted, simply compare if passwords are equal
			if (!shouldUpgradeEncoding) {
				passwordMatched = Objects.equals(password, dbPassword);
			}
		} catch (Exception e) {

			// if password is raw, use passwordEncoder.matches
			passwordMatched = passwordEncoder.matches(password, dbPassword);
		}

		if (!passwordMatched) {
			log.debug("password = " + password);
			log.debug("dbPassword = " + dbPassword);
			String encryptedPassword = passwordEncoder.encode(password);
			log.debug("encrypted password = " + encryptedPassword);
			String encryptedDbPassword = passwordEncoder.encode(dbPassword);
			log.debug("encrypted dbPassword = " + encryptedDbPassword);
			throw new AuthException("Incorrect username/email or password");
		}

		// grant default user authorities
		Set<GrantedAuthority> authorities = new HashSet<>();
		authorities.addAll(Roles.USER.getGrantedAuthorities());

		// todo: grant write authorities e.g. post_<id>:write

		return new UsernamePasswordAuthenticationToken(principal, password, authorities);
	}
}
