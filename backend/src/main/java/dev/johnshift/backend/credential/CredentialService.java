package dev.johnshift.backend.credential;

import java.util.Optional;

public interface CredentialService {

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
