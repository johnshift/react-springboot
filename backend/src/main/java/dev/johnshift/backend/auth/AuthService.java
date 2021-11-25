package dev.johnshift.backend.auth;

import java.util.List;

public interface AuthService {

	/**
	 * Session age = 1 hour. 
	 * <p>
	 * 1000ms x 60sec x 60min x 1hr
	 */
	public static final long SESSION_AGE = 1000L * 60L * 60L;

	/**
	 * Creates a new session in db.
	 * @param isAuthenticated
	 * @return
	 */
	AuthSessionDTO createSession(boolean isAuthenticated);

	/**
	 * Retrieves csrf-token associated with session-id. Returns <code>null</code> if not found.
	 * @param sessionId
	 * @return
	 */
	public AuthCsrfDTO getCsrfToken(String sessionId);

	/**
	 * All sessions one hour ago are considered expired.
	 * <p>
	 * {@link #SESSION_AGE} is available through {@link AuthService}.
	 * @return
	 */
	public List<AuthSessionEntity> getExpiredSessions();

	/**
	 * Deletes a session entity
	 * @param session
	 */
	public void deleteSession(AuthSessionEntity session);
}
