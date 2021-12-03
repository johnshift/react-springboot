package dev.johnshift.backend.auth;

import java.util.Optional;
import org.springframework.stereotype.Service;
import dev.johnshift.backend.credential.Credential;
import dev.johnshift.backend.credential.CredentialRepository;
import dev.johnshift.backend.security.AuthException;
import dev.johnshift.backend.user.User;
import dev.johnshift.backend.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final CredentialRepository credentialRepository;
	private final UserRepository userRepository;

	/** Only approve if user retrieved using principal matches user.name and user.id */
	public void authPostCreate(String principal, String owner, int userId) throws AuthException {

		log.debug("principal=\"" + principal + "\", owner=\"" + owner + "\", user_id=" + userId);

		Optional<Credential> credential = credentialRepository.findOneByUsername(principal);
		if (credential.isEmpty()) {
			log.debug("No credential found using username as principal");
			credential = credentialRepository.findOneByEmail(principal);
			if (credential.isEmpty()) {
				log.debug("No credential found using email as principal");
				throw AuthException.forbidden();
			}
		}
		log.debug("Found credential = " + credential.toString());

		int credUserId = credential.get().getUserVeil().getId().getUserId();
		int credVeilId = credential.get().getUserVeil().getId().getVeilId();
		log.debug("credUserId = " + credUserId + ", credVeilId = " + credVeilId);

		Optional<User> user = userRepository.findById(userId);
		if (user.isEmpty()) {
			log.debug("No user matched payload userId = " + userId);
			throw AuthException.forbidden();
		}
		String name = user.get().getName();
		log.debug("Found userId match -> name = " + name);

		// match owner with name, userId with id
		boolean matchedName = owner.equals(name);
		boolean matchedId = userId == user.get().getId();
		log.debug("matchedName = " + matchedName + ", matchedId = " + matchedId);

		if (!matchedName || !matchedId) {
			throw AuthException.forbidden();
		}
	}
}
