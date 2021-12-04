package dev.johnshift.backend.register;

public interface RegisterService {

	/** Main method to register a user
	 * 
	 * @param username
	 * @param email
	 * @param password
	 * @param userVeil */
	void register(RegisterDTO dto);
}
