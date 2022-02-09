package dev.johnshift.backend.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import dev.johnshift.backend.domains.dtos.RegisterDTO;
import dev.johnshift.backend.domains.dtos.UserDTO;
import dev.johnshift.backend.domains.entities.User;
import dev.johnshift.backend.domains.entities.Verification;
import dev.johnshift.backend.domains.models.AppUserDetails;
import dev.johnshift.backend.exceptions.UserException;
import dev.johnshift.backend.repositories.UserRepository;
import dev.johnshift.backend.repositories.VerificationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
	private final PasswordEncoder passwordEncoder;
	private final UserRepository userRepository;
	private final VerificationRepository verificationRepository;

	@Override
	public UserDetails loadUserByUsername(String principal) throws UsernameNotFoundException {

		log.debug("principal = {}", principal);

		User user = userRepository.findByUsername(principal)
			.orElseGet(() -> userRepository.findByEmail(principal).orElse(null));

		if (user == null) {
			throw new UsernameNotFoundException(
				String.format("No user found using '%s'", principal));
		}

		log.debug("user = {}", user);

		UserDetails userDetails = new AppUserDetails(
			principal,
			(user.getPassword()));
		log.debug("userDetails = {}", userDetails);

		return userDetails;
	}

	@Override
	public UserDTO findByUsername(String username) {

		log.debug("username = {}", username);
		User user = userRepository.findByUsername(username)
			.orElseThrow(UserException::notFound);
		log.debug("found user by username= {}", user);

		return UserDTO.of(user);
	}

	@Override
	public UserDTO findByEmail(String email) {

		log.debug("email = {}", email);
		User user = userRepository.findByEmail(
			email)
			.orElseThrow(UserException::notFound);
		log.debug("found user by email = {}", user);

		return UserDTO.of(user);
	}

	@Override
	public UserDTO findByVeil(String veil) {
		log.debug("veil = {}", veil);

		User user = userRepository.findByVeil(veil)
			.orElseThrow(UserException::notFound);
		log.debug("found user by veil = {}", user);

		return UserDTO.of(user);
	}

	@Override
	public UserDTO register(RegisterDTO dto) {

		User newUser = new User();
		newUser.setUsername(dto.getUsername());
		newUser.setEmail(dto.getEmail());
		newUser.setPassword(passwordEncoder.encode(dto.getPassword()));
		newUser.setName(dto.getName());
		newUser.setVeil(dto.getVeil());
		newUser.setDescription(dto.getDescription());
		newUser.setVeilDescription(dto.getVeilDescription());

		User user = userRepository.save(newUser);

		return UserDTO.of(user);
	}

	@Override
	public List<UserDTO> getAllUsers() {

		List<User> allUsers = userRepository.findAll();
		List<UserDTO> dtos = new ArrayList<>();
		for (User user : allUsers) {

			UserDTO dto = new UserDTO();
			dto.setId(user.getId());
			dto.setUsername(user.getUsername());
			dto.setEmail(user.getEmail());
			dto.setPassword(user.getPassword());
			dto.setName(user.getName());
			dto.setVeil(user.getVeil());
			dto.setDescription(user.getDescription());
			dto.setVerified(user.isVerified());

			dtos.add(dto);

		}

		return dtos;
	}

	@Override
	public void saveVerification(UUID token, int userId) {

		Verification verification = new Verification();
		verification.setToken(token);
		verification.setUserId(userId);

		verificationRepository.save(verification);

	}

	@Override
	public void confirmVerification(String token) {

		// find match for token
		log.debug("finding token match");
		Verification verification = verificationRepository.findById(UUID.fromString(token))
			.orElseThrow(UserException::invalidVerification);

		// find match for id
		log.debug("finding user_id match");
		User user = userRepository.findById(verification.getUserId())
			.orElseThrow(UserException::invalidVerification);

		// update is_verified to true
		user.setVerified(true);
		userRepository.save(user);

		// delete entry in verification
		verificationRepository.delete(verification);

	}
}
