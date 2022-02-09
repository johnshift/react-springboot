package dev.johnshift.backend.services;

import java.util.List;
import java.util.UUID;
import dev.johnshift.backend.domains.dtos.RegisterDTO;
import dev.johnshift.backend.domains.dtos.UserDTO;

public interface UserService {

	UserDTO findByUsername(String username);

	UserDTO findByEmail(String email);

	UserDTO findByVeil(String veil);

	UserDTO register(RegisterDTO dto);

	List<UserDTO> getAllUsers();

	void saveVerification(UUID token, int userId);

	void confirmVerification(String token);
}
