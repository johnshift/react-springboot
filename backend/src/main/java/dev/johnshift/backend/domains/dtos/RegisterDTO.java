package dev.johnshift.backend.domains.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RegisterDTO {

	// @Size(min = MIN_USERNAME_LENGTH, message = UserException.USERNAME_TOO_SHORT)
	// @Size(max = MAX_USERNAME_LENGTH, message = UserException.USERNAME_TOO_LONG)
	// @Pattern(regexp = NEAT_URI_REGEXP, message = UserException.USERNAME_INVALID_FORMAT)
	private String username;


	// @NotEmpty(message = UserException.EMAIL_REQUIRED)
	// @Email(message = UserException.EMAIL_INVALID)
	private String email;

	// @NotEmpty(message = UserException.PASSWORD_REQUIRED)
	// @Size(min = MIN_PASSWORD_LENGTH, message = UserException.PASSWORD_TOO_SHORT)
	// @Size(max = MAX_PASSWORD_LENGTH, message = UserException.PASSWORD_TOO_LONG)
	private String password;

	// @NotEmpty(message = UserException.NAME_REQUIRED)
	// @Size(min = MIN_NAME_LENGTH, message = UserException.NAME_TOO_SHORT)
	// @Size(max = MAX_NAME_LENGTH, message = UserException.NAME_TOO_LONG)
	// @Pattern(regexp = NAMES_REGEXP, message = UserException.NAME_INVALID)
	private String name;

	// @NotEmpty(message = UserException.VEIL_REQUIRED)
	// @Size(min = MIN_VEIL_LENGTH, message = UserException.VEIL_TOO_SHORT)
	// @Size(max = MAX_VEIL_LENGTH, message = UserException.VEIL_TOO_LONG)
	// @Pattern(regexp = NEAT_URI_REGEXP, message = UserException.VEIL_INVALID_FORMAT)
	private String veil;

	private String description;

	private String veilDescription;
}
