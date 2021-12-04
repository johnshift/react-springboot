package dev.johnshift.backend.user;

import java.util.Optional;

public interface UserService {

	/** Retrieve a user using id
	 * 
	 * @param id
	 * @return an Optional {@link UserDTO} */
	Optional<UserDTO> getUserById(int id);

	/** Creates a user and returns {@link UserDTO} with complete fields.
	 * 
	 * @param dto
	 * @return {@link UserDTO} */
	UserDTO createUser(UserDTO dto);

	UserVeilDTO createUserVeil(UserVeilDTO dto);

}
