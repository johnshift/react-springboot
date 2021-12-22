package dev.johnshift.backend.services;

import dev.johnshift.backend.domains.dtos.RegisterDTO;
import dev.johnshift.backend.domains.dtos.UserDTO;

public interface UserService {

	UserDTO findByUsername(String username);

	UserDTO register(RegisterDTO dto);
}
