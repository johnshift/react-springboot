package dev.johnshift.backend.credential;

import java.util.Optional;

public interface CredentialService {

	// /** This is mainly used for implementing {@link UserDetails}.
	// * <p>
	// * Note that {@link UserDetails} only needs a principal (username/email) and credential
	// (password).
	// * Retrieves using username, returns null instead of throwing exception.
	// *
	// * @param username
	// * @return */
	// String getPasswordByUsernameOrNull(String username);

	// /** This is mainly used for implementing {@link UserDetails}.
	// * <p>
	// * Note that {@link UserDetails} only needs a principal (username/email) and credential
	// (password).
	// * Retrieves using email, returns null instead of throwing exception.
	// *
	// * @param email
	// * @return */
	// String getPasswordByEmailOrNull(String email);

	/** This is used when retrieving password using either username or email.
	 * 
	 * @param principal
	 * @return */
	String getPasswordByPrincipalOrNull(String principal);

	/** Retrieves a credential using only principal
	 * 
	 * @param principal
	 * @return {@link CredentialDTO} */
	Optional<CredentialDTO> getCredentialByPrincipal(String principal);

}
