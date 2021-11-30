package dev.johnshift.backend.credential;

import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

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

		Credential credential = credentialRepository.findOneByUsername(principal)
			.orElse(null);

		if (credential != null) {
			return credential.getPassword();
		}

		credential = credentialRepository.findOneByEmail(principal).orElse(null);

		if (credential != null) {
			return credential.getPassword();
		}

		return null;
	}

}
