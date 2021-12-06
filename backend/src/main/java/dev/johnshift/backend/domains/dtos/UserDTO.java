package dev.johnshift.backend.domains.dtos;

import dev.johnshift.backend.domains.entities.User;
import lombok.Data;
import lombok.experimental.Accessors;

@Data
@Accessors(fluent = true)
public class UserDTO {

	private int id;
	private String username;
	private String email;
	private String password;
	private String name;
	private String veil;
	private String description;
	private boolean isEnabled;

	public static UserDTO of(User user) {

		return new UserDTO()
			.id(user.id())
			.username(user.username())
			.email(user.email())
			.password(user.password())
			.name(user.name())
			.veil(user.veil())
			.description(user.description())
			.isEnabled(user.isEnabled());
	}

}
