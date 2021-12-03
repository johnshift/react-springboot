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

	// private final CredentialService credentialService;
	// private final UserService userService;

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

		Optional<User> user = userRepository.findById(credUserId);
		if (user.isEmpty()) {
			log.debug("No public user found using credId");
			user = userRepository.findById(credVeilId);

			if (user.isEmpty()) {
				log.debug("No veil user found using veilId");
				throw AuthException.forbidden();
			}
		}
		log.debug("Found user = " + user.get().toString());

		// match owner with name, userId with id
		boolean matchedName = owner.equals(user.get().getName());
		boolean matchedId = userId == user.get().getId();
		log.debug("matchedName = " + matchedName + ", matchedId = " + matchedId);

		if (!matchedName || !matchedId) {
			throw AuthException.forbidden();
		}
	}


	// public boolean hasPostCreateAccess(String principal, String owner, int userId) {

	// log.debug("principal=\"" + principal + "\", owner=\"" + owner + "\", user_id=" + userId);

	// // retrieve credential-dto using principal (username/email)
	// CredentialDTO credential = credentialService.getCredentialByPrincipal(principal).orElse(null);
	// if (credential == null) {
	// return false;
	// }

	// int credUserId = credential.getUserId();
	// int credVeilId = credential.getVeilId();
	// log.debug("credUserId = " + credUserId + ", credVeilId = " + credVeilId);
	// log.debug("Found credential = " + credential.toString());

	// // retrieve user using user_id or veil_id
	// Optional<UserDTO> user = userService.getUserById(credUserId);
	// if (user.isEmpty()) {
	// log.debug("No public user found with credId = " + credUserId);
	// user = userService.getUserById(credVeilId);

	// if (user.isEmpty()) {
	// log.debug("No veil user found with credId = " + credVeilId);
	// return false;
	// } else {
	// log.debug("Found user using credVeilId = " + credVeilId);
	// }
	// } else {
	// log.debug("Found user using credUserId = " + credUserId);
	// }

	// // match owner with name, userId with id
	// boolean matchedName = owner.equals(user.get().getName());
	// boolean matchedId = userId != user.get().getId();
	// log.debug("matchedName = " + matchedName + ", matchedId = " + matchedId);

	// return matchedName && matchedId;
	// }

}
