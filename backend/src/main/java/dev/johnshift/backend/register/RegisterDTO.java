package dev.johnshift.backend.register;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import javax.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RegisterDTO {

	private static final int MIN_USERNAME_LENGTH = 4;
	private static final int MAX_USERNAME_LENGTH = 64;

	private static final int MIN_EMAIL_LENGTH = 3;
	private static final int MAX_EMAIL_LENGTH = 64;

	private static final int MIN_PASSWORD_LENGTH = 6;
	private static final int MAX_PASSWORD_LENGTH = 64; // Bcrypt hard limit = 72

	private static final int MIN_NAME_LENGTH = 4;
	private static final int MAX_NAME_LENGTH = 36;

	private static final int MIN_VEIL_LENGTH = 4;
	private static final int MAX_VEIL_LENGTH = 36;

	// allow only letters,numbers and "-" for neat path uri
	private static final String NEAT_URI_REGEXP = "^[a-zA-Z0-9-]+$";

	// reasonable regexp for names
	private static final String NAMES_REGEXP = "^[a-zA-Z .'-]+$";

	// OWASP email regexp
	private static final String EMAIL_REGEXP =
		"^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";


	@NotEmpty(message = RegisterException.USERNAME_REQUIRED)
	@Size(min = MIN_USERNAME_LENGTH, message = RegisterException.USERNAME_TOO_SHORT)
	@Size(max = MAX_USERNAME_LENGTH, message = RegisterException.USERNAME_TOO_LONG)
	@Pattern(regexp = NEAT_URI_REGEXP, message = RegisterException.USERNAME_INVALID_CHARS)
	private String username;

	@NotEmpty(message = RegisterException.EMAIL_REQUIRED)
	@Size(min = MIN_EMAIL_LENGTH, message = RegisterException.EMAIL_TOO_SHORT)
	@Size(max = MAX_EMAIL_LENGTH, message = RegisterException.EMAIL_TOO_LONG)
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
	@Pattern(regexp = NEAT_URI_REGEXP, message = RegisterException.VEIL_INVALID) // veils are used in profile links
	private String veil;
}
