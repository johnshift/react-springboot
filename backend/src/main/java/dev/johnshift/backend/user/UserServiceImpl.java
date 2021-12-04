package dev.johnshift.backend.user;

import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final UserVeilRepository userVeilRepository;

	@Override
	public Optional<UserDTO> getUserById(int id) {

		log.debug("Retrieve user by id = " + id);
		Optional<User> user = userRepository.findById(id);
		if (user.isEmpty()) {
			log.debug("No user found with id = " + id);
			return Optional.empty();
		}

		log.debug("Found (by id) user = " + user.get().toString());

		return Optional.of(UserDTO.of(user.get()));
	}

	@Override
	public UserDTO createUser(UserDTO dto) {

		User user = userRepository.save(User.of(dto));

		return UserDTO.of(user);
	}

	@Override
	public UserVeilDTO createUserVeil(UserVeilDTO dto) {

		UserVeil uv = userVeilRepository.save(UserVeil.of(dto));

		return UserVeilDTO.of(uv);
	}

}
