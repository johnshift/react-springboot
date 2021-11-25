package dev.johnshift.backend.session;

import org.springframework.http.HttpStatus;

public class SessionException extends RuntimeException {
	
	public static final String REQUEST_CSRF_NOT_FOUND = "Request csrf-token not found";
	public static final String REQUEST_SESSION_NOT_FOUND = "Request session not found";
	public static final String SESSION_NOT_FOUND = "Session not found";
	public static final String SESSION_CSRF_NOT_FOUND = "Session csrf-token not found";

	private final HttpStatus status;

	public SessionException(String msg) {
		super(msg);

		// default to bad request
		this.status = HttpStatus.BAD_REQUEST;
	}

	public SessionException(String msg, HttpStatus status) {
		super(msg);
		this.status = status;
	}
	

	public HttpStatus getStatus() {
		return status;
	}

	public static SessionException notFound() {
		return new SessionException(SESSION_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	public static SessionException csrfNotFound() {
		return new SessionException(SESSION_CSRF_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	public static SessionException reqCsrfNotFound() {
		return new SessionException(REQUEST_CSRF_NOT_FOUND, HttpStatus.NOT_FOUND);
	}

	public static SessionException reqSessionNotFound() {
		return new SessionException(REQUEST_SESSION_NOT_FOUND, HttpStatus.NOT_FOUND);
	}


}
