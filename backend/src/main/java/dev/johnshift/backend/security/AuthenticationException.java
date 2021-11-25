package dev.johnshift.backend.security;

import org.springframework.http.HttpStatus;

public class AuthenticationException extends RuntimeException {

	public static final String UNAUTHORIZED_REQUEST = "Unauthorized Request";

	private final HttpStatus status;

	public HttpStatus getStatus() {
		return status;
	}

	public AuthenticationException(String msg) {
		super(msg);
		this.status = HttpStatus.UNAUTHORIZED;
	}

	public AuthenticationException(String msg, HttpStatus status) {
		super(msg);
		this.status = status;
	}

	public static AuthenticationException unauthorized() {
		return new AuthenticationException(UNAUTHORIZED_REQUEST, HttpStatus.UNAUTHORIZED);
	}

}
