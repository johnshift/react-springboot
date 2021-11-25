package dev.johnshift.backend.session;

public final class SessionConstants {

	public static final String SESSION_CSRF_HEADER_KEY = "x-veils-csrf-token";
	public static final String SESSION_COOKIE_NAME = "X-VEILS-SESSION";
	public static final int SESSION_COOKIE_MAX_AGE = 60 * 60;
	public static final boolean SESSION_COOKIE_HTTP_ONLY = true;

	// prevent instantiation
	private SessionConstants() {}
}
