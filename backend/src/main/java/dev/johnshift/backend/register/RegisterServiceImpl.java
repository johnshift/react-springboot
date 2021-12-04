package dev.johnshift.backend.register;

import javax.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import dev.johnshift.backend.credential.Credential;
import dev.johnshift.backend.credential.CredentialRepository;
import dev.johnshift.backend.user.User;
import dev.johnshift.backend.user.UserRepository;
import dev.johnshift.backend.user.UserVeil;
import dev.johnshift.backend.user.UserVeilId;
import dev.johnshift.backend.user.UserVeilRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegisterServiceImpl implements RegisterService {

	private final PasswordEncoder passwordEncoder;
	private final CredentialRepository credentialRepository;
	private final UserRepository userRepository;
	private final UserVeilRepository userVeilRepository;


	@Override
	@Transactional
	public void register(RegisterDTO dto) {

		// save user
		User user = new User(dto.getName());
		log.debug("user = " + user.toString());
		User savedUser = userRepository.save(user);
		log.debug("savedUser = " + savedUser.toString());

		// save veil
		User veil = new User(dto.getVeil());
		log.debug("veil = " + veil.toString());
		User savedVeil = userRepository.save(veil);
		log.debug("savedVeil = " + savedVeil.toString());

		// save user_eil
		UserVeilId uvId = new UserVeilId(
			savedUser.getId(),
			savedVeil.getId());
		log.debug("uvId = " + uvId.toString());
		UserVeil uv = new UserVeil(uvId);
		log.debug("uv = " + uv.toString());
		UserVeil savedUv = userVeilRepository.save(uv);
		log.debug("savedUv = " + savedUv);

		String password = dto.getPassword();
		String encodedPassword = passwordEncoder.encode(password);
		log.debug("raw password = " + password);
		log.debug("encoded password = " + encodedPassword);

		Credential newCredential = new Credential();
		newCredential.setUsername(dto.getUsername());
		newCredential.setEmail(dto.getEmail());
		newCredential.setPassword(encodedPassword);
		newCredential.setUserVeil(savedUv);
		newCredential.setVerified(false);
		log.debug("new credential = " + newCredential.toString());

		Credential savedCredential = credentialRepository.save(newCredential);
		log.debug("saved credential = " + savedCredential.toString());


	}

}
