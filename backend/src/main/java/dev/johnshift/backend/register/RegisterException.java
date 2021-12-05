package dev.johnshift.backend.register;

import org.springframework.http.HttpStatus;

public class RegisterException extends RuntimeException {
	public static final String USERNAME_REQUIRED = "Username is required";
	public static final String USERNAME_TOO_SHORT = "Username is too short";
	public static final String USERNAME_TOO_LONG = "Username is too long";
	public static final String USERNAME_INVALID_FORMAT = "Invalid Username format";

	public static final String EMAIL_REQUIRED = "Email address is required";
	public static final String EMAIL_INVALID = "Invalid email address";

	public static final String PASSWORD_REQUIRED = "Password is required";
	public static final String PASSWORD_TOO_SHORT = "Password is too short";
	public static final String PASSWORD_TOO_LONG = "Password is too long";

	public static final String NAME_REQUIRED = "Name is required";
	public static final String NAME_TOO_SHORT = "Name is too short";
	public static final String NAME_TOO_LONG = "Name is too long";
	public static final String NAME_INVALID = "Name contains invalid character(s)";

	public static final String VEIL_REQUIRED = "Veil is required";
	public static final String VEIL_TOO_SHORT = "Veil name is too short";
	public static final String VEIL_TOO_LONG = "Veil name is too long";
	public static final String VEIL_INVALID_FORMAT = "Invalid Veil name format";

	public static final String INVALID_VERIFICATION = "Invalid Verification";

	private final HttpStatus status;

	public RegisterException(String msg) {
		super(msg);
		this.status = HttpStatus.BAD_REQUEST;
	}

	public RegisterException(String msg, HttpStatus status) {
		super(msg);
		this.status = status;
	}

	public static RegisterException invalidVerification() {
		return new RegisterException(INVALID_VERIFICATION, HttpStatus.BAD_REQUEST);
	}

	public HttpStatus getStatus() {
		return status;
	}

}
