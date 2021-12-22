package dev.johnshift.backend.constants;

public class ValidationConstants {

	public static final int MIN_USERNAME_LENGTH = 4;
	public static final int MAX_USERNAME_LENGTH = 64;

	public static final int MIN_PASSWORD_LENGTH = 6;
	public static final int MAX_PASSWORD_LENGTH = 64; // Bcrypt hard limit = 72

	public static final int MIN_NAME_LENGTH = 4;
	public static final int MAX_NAME_LENGTH = 36;

	public static final int MIN_VEIL_LENGTH = 4;
	public static final int MAX_VEIL_LENGTH = 36;

	// allow only letters,numbers and "-" for neat path uri
	public static final String NEAT_URI_REGEXP = "^[a-zA-Z][a-zA-Z0-9-]*$";

	public static final String MUST_START_WITH_LETTERS_REGEXP = "^[a-zA-Z]*$";
	// public static final String MUST_START_WITH_LETTERS_REGEXP = "^[a-zA-Z](?:[a-zA-Z0-9-]+)*$";

	// reasonable regexp for names
	public static final String NAMES_REGEXP = "^[a-zA-Z .'-]+$";

	// OWASP email regexp
	public static final String EMAIL_REGEXP =
		"^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";

	private ValidationConstants() {}
}

