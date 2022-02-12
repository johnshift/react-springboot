package dev.johnshift.backend.exceptions;

import org.springframework.http.HttpStatus;

public class PostException extends RuntimeException {

	private final HttpStatus status;

	public PostException(String msg, HttpStatus status) {
		super(msg);
		this.status = status;
	}

	public HttpStatus getStatus() {
		return status;
	}

	public static final PostException notFound() {
		return new PostException("Post not found", HttpStatus.NOT_FOUND);
	}

	public static final PostException userNotFound() {
		return new PostException("Post owner not found", HttpStatus.NOT_FOUND);
	}

}
