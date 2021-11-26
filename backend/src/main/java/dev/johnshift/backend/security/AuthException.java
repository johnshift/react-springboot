package dev.johnshift.backend.security;

import org.springframework.http.HttpStatus;

public class AuthException extends RuntimeException {

	public static final String UNAUTHORIZED_REQUEST = "Unauthorized Request";

	private final HttpStatus status;

	public AuthException(String msg) {
		super(msg);
		this.status = HttpStatus.UNAUTHORIZED;
	}

	public AuthException(String msg, HttpStatus status) {
		super(msg);
		this.status = status;
	}

	public static AuthException unauthorized() {
		return new AuthException(UNAUTHORIZED_REQUEST, HttpStatus.UNAUTHORIZED);
	}

	public static AuthException unauthorized(String msg) {
		return new AuthException(msg, HttpStatus.UNAUTHORIZED);
	}

	public HttpStatus getStatus() {
		return status;
	}
}
