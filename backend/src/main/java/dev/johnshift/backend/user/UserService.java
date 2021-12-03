package dev.johnshift.backend.user;

import java.util.Optional;

public interface UserService {

	Optional<UserDTO> getUserById(int id);

}
