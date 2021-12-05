package dev.johnshift.backend.register;

import java.util.UUID;

public interface RegisterService {

	/** Main method to register a user
	 * 
	 * @param username
	 * @param email
	 * @param password
	 * @param userVeil
	 * @return id of created credential */
	int register(RegisterDTO dto);

	/** Called after successful register validation.\
	 * <p>
	 * Creates new entry in <code>register_verification</code> table with token and credential-id.
	 * 
	 * @param token
	 * @param credentialId */
	void saveVerificationToken(UUID token, int credentialId);

	/** Called after user confirms account registration.
	 * <p>
	 * Sets <code>is_verified</code> column to true for matching <code>credential_id</code>
	 * <p>
	 * Deletes entry in <code>register_verfication</code> column.
	 * 
	 * @param token
	 * @param credentialId */
	void confirmVerificationToken(String token);
}
