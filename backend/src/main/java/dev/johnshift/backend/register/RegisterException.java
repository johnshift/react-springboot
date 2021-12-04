package dev.johnshift.backend.register;

public class RegisterException extends RuntimeException {
	public static final String USERNAME_REQUIRED = "Username is required";
	public static final String USERNAME_TOO_SHORT = "Username is too short";
	public static final String USERNAME_TOO_LONG = "Username is too long";
	public static final String USERNAME_INVALID_CHARS = "Username contains invalid character(s)";

	public static final String EMAIL_REQUIRED = "Email address is required";
	public static final String EMAIL_INVALID = "Invalid email address";
	public static final String EMAIL_TOO_SHORT = "Email address is too long";
	public static final String EMAIL_TOO_LONG = "Email address is too long";

	public static final String PASSWORD_REQUIRED = "Password is required";
	public static final String PASSWORD_TOO_SHORT = "Password is too short";
	public static final String PASSWORD_TOO_LONG = "Password is too long";

	public static final String NAME_REQUIRED = "Name is required";
	public static final String NAME_INVALID = "Name contains invalid character(s)";
	public static final String NAME_TOO_SHORT = "Name is too short";
	public static final String NAME_TOO_LONG = "Name is too long";

	public static final String VEIL_REQUIRED = "Veil is required";
	public static final String VEIL_INVALID = "Vil name contains invalid character(s)";
	public static final String VEIL_TOO_SHORT = "Veil name is too short";
	public static final String VEIL_TOO_LONG = "Veil name is too long";

}
