package dev.johnshift.backend.exceptions;

import org.springframework.http.HttpStatus;

public class UserException extends RuntimeException {

	private final HttpStatus status;

	public HttpStatus getStatus() {
		return status;
	}

	public UserException(String msg, HttpStatus status) {
		super(msg);
		this.status = status;
	}

	public static final UserException notFound() {
		return new UserException("User not found", HttpStatus.NOT_FOUND);
	}

}
