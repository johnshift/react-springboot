package dev.johnshift.backend.credential;

import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class CredentialServiceImpl implements CredentialService {

	private final CredentialRepository credentialRepository;

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

	@Override
	public Optional<CredentialDTO> getCredentialByPrincipal(String principal) {

		log.debug("Retrieve credential using principal=\"" + principal + "\" ");

		Optional<Credential> credential = credentialRepository.findOneByUsername(principal);

		if (!credential.isEmpty()) {
			log.debug("Found (by username) credential = " + credential.get().toString());
			return Optional.of(CredentialDTO.of(credential.get()));
		}

		credential = credentialRepository.findOneByEmail(principal);

		if (!credential.isEmpty()) {
			log.debug("Found (by email) credential = " + credential.get().toString());
			return Optional.of(CredentialDTO.of(credential.get()));
		}

		return Optional.empty();
	}

}
