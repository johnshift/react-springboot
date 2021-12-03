package dev.johnshift.backend.user;

import java.util.Optional;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	UserRepository userRepository;

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

}
