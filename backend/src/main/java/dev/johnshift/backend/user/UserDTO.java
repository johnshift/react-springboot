package dev.johnshift.backend.user;

import lombok.Data;

@Data
public class UserDTO {

	private final int id;
	private final String name;
	private final String description;

	public static UserDTO of(User user) {
		return new UserDTO(user.getId(), user.getName(), user.getDescription());
	}
}
