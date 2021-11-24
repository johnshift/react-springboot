package dev.johnshift.backend.auth;

import java.util.Date;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

	/**
	 * Session age = 1 hour. 
	 * <p>
	 * 1000ms x 60sec x 60min x 1hr
	 */
	public static final long SESSION_AGE = 1000L * 60L * 60L;

	private final AuthSessionRepository sessionRepo;

	/**
	 * Creates a new session in db.
	 * @param isAuthenticated
	 * @return
	 */
	public AuthSessionDTO createSession(boolean isAuthenticated) {

		AuthSessionEntity newSession = new AuthSessionEntity();
		newSession.setCsrfToken(UUID.randomUUID().toString());
		newSession.setSessionId(UUID.randomUUID().toString());
		newSession.setTimestamp(new Date());
		newSession.setAuthenticated(isAuthenticated);

		AuthSessionEntity session = sessionRepo.save(newSession);

		return AuthSessionDTO.of(session);
	}

	/**
	 * Retrieves csrf-token associated with session-id. Returns null if not found.
	 * @param sessionId
	 * @return
	 */
	public AuthCsrfDTO getCsrfToken(String sessionId) {

		String csrfToken = sessionRepo.getCsrfToken(sessionId).orElse(null);

		return new AuthCsrfDTO(csrfToken);
	}

	/**
	 * All sessions one hour ago are considered expired
	 * @return
	 */
	public List<AuthSessionEntity> getExpiredSessions() {
		Date oneHourAgo = new Date(System.currentTimeMillis() - SESSION_AGE);
		return sessionRepo.findByTimestampLessThan(oneHourAgo);
	}

	public void deleteSession(AuthSessionEntity session) {

		sessionRepo.delete(session);
	}
}
