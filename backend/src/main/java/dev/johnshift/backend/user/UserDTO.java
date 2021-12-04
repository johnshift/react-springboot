package dev.johnshift.backend.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserDTO {

	private int id;
	private String name;
	private String description;

	public static UserDTO of(User user) {
		return new UserDTO(user.getId(), user.getName(), user.getDescription());
	}

	// only provide name (used on registration)
	public static UserDTO of(String name) {

		UserDTO dto = new UserDTO();
		dto.setName(name);

		return dto;
	}
}
