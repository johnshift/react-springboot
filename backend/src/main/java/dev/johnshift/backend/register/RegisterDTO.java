package dev.johnshift.backend.register;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import static dev.johnshift.backend.constants.ValidationConstants.MIN_USERNAME_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.MAX_USERNAME_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.NEAT_URI_REGEXP;
import static dev.johnshift.backend.constants.ValidationConstants.EMAIL_REGEXP;
import static dev.johnshift.backend.constants.ValidationConstants.MIN_PASSWORD_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.MAX_PASSWORD_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.MIN_NAME_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.MAX_NAME_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.NAMES_REGEXP;
import static dev.johnshift.backend.constants.ValidationConstants.MIN_VEIL_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.MAX_VEIL_LENGTH;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RegisterDTO {

	@NotEmpty(message = RegisterException.USERNAME_REQUIRED)
	@Size(min = MIN_USERNAME_LENGTH, message = RegisterException.USERNAME_TOO_SHORT)
	@Size(max = MAX_USERNAME_LENGTH, message = RegisterException.USERNAME_TOO_LONG)
	@Pattern(regexp = NEAT_URI_REGEXP, message = RegisterException.USERNAME_INVALID_FORMAT)
	private String username;

	@NotEmpty(message = RegisterException.EMAIL_REQUIRED)
	@Email(message = RegisterException.EMAIL_INVALID)
	@Pattern(regexp = EMAIL_REGEXP, message = RegisterException.EMAIL_INVALID)
	private String email;

	@NotEmpty(message = RegisterException.PASSWORD_REQUIRED)
	@Size(min = MIN_PASSWORD_LENGTH, message = RegisterException.PASSWORD_TOO_SHORT)
	@Size(max = MAX_PASSWORD_LENGTH, message = RegisterException.PASSWORD_TOO_LONG)
	private String password;

	@NotEmpty(message = RegisterException.NAME_REQUIRED)
	@Size(min = MIN_NAME_LENGTH, message = RegisterException.NAME_TOO_SHORT)
	@Size(max = MAX_NAME_LENGTH, message = RegisterException.NAME_TOO_LONG)
	@Pattern(regexp = NAMES_REGEXP, message = RegisterException.NAME_INVALID)
	private String name;

	@NotEmpty(message = RegisterException.VEIL_REQUIRED)
	@Size(min = MIN_VEIL_LENGTH, message = RegisterException.VEIL_TOO_SHORT)
	@Size(max = MAX_VEIL_LENGTH, message = RegisterException.VEIL_TOO_LONG)
	@Pattern(regexp = NEAT_URI_REGEXP, message = RegisterException.VEIL_INVALID_FORMAT)
	private String veil;
}
