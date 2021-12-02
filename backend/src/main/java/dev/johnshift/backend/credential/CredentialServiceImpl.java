package dev.johnshift.backend.credential;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CredentialServiceImpl implements CredentialService {

	private final CredentialRepository credentialRepository;

	// @Override
	// public String getPasswordByUsernameOrNull(String username) {

	// Credential credential = credentialRepository.findOneByUsername(username)
	// .orElse(null);

	// if (credential != null) {

	// return credential.getPassword();
	// }

	// return null;
	// }

	// @Override
	// public String getPasswordByEmailOrNull(String email) {

	// Credential credential = credentialRepository.findOneByEmail(email)
	// .orElse(null);

	// if (credential != null) {

	// return credential.getPassword();
	// }

	// return null;
	// }

	@Override
	public String getPasswordByPrincipalOrNull(String principal) {

		log.debug("Retrieve password for principal = " + principal);

		Credential credential = credentialRepository.findOneByUsername(principal)
			.orElse(null);

		String password = null;
		if (credential != null) {
			password = credential.getPassword();
			log.debug("Using username as principal, password = " + password);
			return password;
		}

		credential = credentialRepository.findOneByEmail(principal).orElse(null);

		if (credential != null) {
			password = credential.getPassword();
			log.debug("Using email as principal, password = " + password);
			return password;
		}

		log.debug("Retrieved password = " + password);
		return password;
	}

}
