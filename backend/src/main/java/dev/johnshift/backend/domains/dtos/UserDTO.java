package dev.johnshift.backend.domains.dtos;

import dev.johnshift.backend.domains.entities.User;
import lombok.Data;

@Data
public class UserDTO {

	private int id;
	private String username;
	private String email;
	private String password;
	private String name;
	private String veil;
	private String description;
	private boolean isVerified;

	public static UserDTO of(User user) {

		UserDTO dto = new UserDTO();
		dto.setId(user.getId());
		dto.setUsername(user.getUsername());
		dto.setEmail(user.getEmail());
		dto.setPassword(user.getPassword());
		dto.setName(user.getName());
		dto.setVeil(user.getVeil());
		dto.setDescription(user.getDescription());
		dto.setVerified(user.isVerified());

		return dto;
	}

}
