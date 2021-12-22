package dev.johnshift.backend.services;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import dev.johnshift.backend.domains.dtos.RegisterDTO;
import dev.johnshift.backend.domains.dtos.UserDTO;
import dev.johnshift.backend.domains.entities.User;
import dev.johnshift.backend.domains.models.AppUserDetails;
import dev.johnshift.backend.exceptions.UserException;
import dev.johnshift.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService, UserDetailsService {
	private final UserRepository userRepository;

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
			(user.password()),
			user.isEnabled());
		log.debug("userDetails = {}", userDetails);

		return userDetails;
	}

	@Override
	public UserDTO findByUsername(String username) {

		log.debug("username = {}", username);
		User user = userRepository.findByUsername(username)
			.orElseThrow(UserException::notFound);
		log.debug("user = {}", user);

		return UserDTO.of(user);
	}

	@Override
	public UserDTO register(RegisterDTO dto) {

		log.debug("USERDTO register id = {}", dto.getId());

		User newUser = new User()
			.username(dto.getUsername())
			.email(dto.getEmail())
			.password(dto.getPassword())
			.name(dto.getName())
			.veil(dto.getVeil());

		User user = userRepository.save(newUser);

		return UserDTO.of(user);
	}

}
