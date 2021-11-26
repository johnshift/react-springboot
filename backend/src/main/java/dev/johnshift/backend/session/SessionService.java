package dev.johnshift.backend.session;

import java.util.List;
import javax.servlet.http.HttpServletRequest;

public interface SessionService {
	/** Session age = 1 hour.
	 * <p>
	 * 1000ms x 60sec x 60min x 1hr */
	public static final long SESSION_AGE = 1000L * 60L * 60L;

	/** Creates a new session with default role "USER".
	 * 
	 * @param isAuthenticated
	 * @return */
	SessionDTO createSession();

	/** Creates a public session with no roles.
	 * 
	 * @param isAuthenticated
	 * @return */
	SessionDTO createPublicSession();

	/** Retrieves the whole session entity using session-id.
	 * <p>
	 * Should update timestamp if a session is found in db.
	 * 
	 * @param sessionId
	 * @return */
	SessionDTO getSessionBySessionId(String sessionId);

	/** Refresh recent timestamp on a session.
	 * 
	 * @param sessionId
	 * @return */
	void refreshSession(String sessionId);


	/** Retrieves csrf-token associated with session-id.
	 * <p>
	 * Should update timestamp if a session is found in db.
	 * 
	 * @param sessionId
	 * @return */
	String getCsrfToken(String sessionId);

	/** Retrieves csrf-token associated with session cookie.
	 * <p>
	 * Should update timestamp if a session is found in db.
	 * 
	 * @param request
	 * @return */
	String getCsrfTokenFromHttpRequest(HttpServletRequest request);

	/** All sessions one hour ago are considered expired.
	 * <p>
	 * {@link #SESSION_AGE} is available through {@link AuthService}.
	 * 
	 * @return */
	List<SessionEntity> getExpiredSessions();

	/** Deletes a session entity
	 * 
	 * @param session */
	public void deleteSession(SessionEntity session);
}
