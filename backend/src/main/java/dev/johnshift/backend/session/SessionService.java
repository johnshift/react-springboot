package dev.johnshift.backend.session;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

public interface SessionService {
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
	SessionDTO createSession(boolean isAuthenticated);

	/**
	 * Retrieves the whole session entity using session-id.
	 * @param sessionId
	 * @return
	 */
	SessionDTO getSessionBySessionId(String sessionId);

	/**
	 * Retrieves csrf-token associated with session-id.
	 * @param sessionId
	 * @return
	 */
	public String getCsrfToken(String sessionId);

	/**
	 * Retrieves csrf-token associated with session cookie.
	 * @param request
	 * @return
	 */
	public String getCsrfTokenFromHttpRequest(HttpServletRequest request);

	/**
	 * All sessions one hour ago are considered expired.
	 * <p>
	 * {@link #SESSION_AGE} is available through {@link AuthService}.
	 * @return
	 */
	public List<SessionEntity> getExpiredSessions();

	/**
	 * Deletes a session entity
	 * @param session
	 */
	public void deleteSession(SessionEntity session);
}
