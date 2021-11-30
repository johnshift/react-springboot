package dev.johnshift.backend.session;

import java.util.List;
import java.util.UUID;

public interface SessionService {
	/** Session age = 1 hour.
	 * <p>
	 * 1000ms x 60sec x 60min x 1hr */
	static final long SESSION_AGE = 1000L * 60L * 60L;

	// /** Creates a new session with default role "USER".
	// *
	// * @param isAuthenticated
	// * @return */
	// SessionDTO createSession();

	/** Creates a session with no roles.
	 * 
	 * @return {@link SessionDTO} */
	SessionDTO createPublicSession();

	/** Promotes session into an active session with default "USER" role.
	 * 
	 * @param sessionId
	 * @param principal
	 * @return */
	SessionDTO promotePublicSession(String sessionId, String principal);

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

	/** All sessions one hour ago are considered expired.
	 * <p>
	 * {@link #SESSION_AGE} is available through {@link AuthService}.
	 * 
	 * @return */
	List<Session> getExpiredSessions();

	/** Deletes a session entity
	 * 
	 * @param sessionId */
	void deleteSession(UUID sessionId);
}
