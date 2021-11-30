package dev.johnshift.backend.session;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

	private final SessionRepository sessionRepository;

	@Override
	public SessionDTO createPublicSession() {

		Session newSession = newPubSession();

		Session session = sessionRepository.save(newSession);
		return SessionDTO.of(session);
	}

	@Override
	public SessionDTO promotePublicSession(String sessionId, String principal) {


		Session promotedSession = newPromotedSession(sessionId, principal);

		Session session = sessionRepository.save(promotedSession);

		return SessionDTO.of(session);
	}

	@Override
	public SessionDTO getSessionBySessionId(String sessionId) {

		UUID id = UUID.fromString(sessionId);

		// find session in db
		Session session = sessionRepository.findOneBySessionId(id)
			.orElseThrow(SessionException::notFound);

		// update timestamp to token
		refreshSession(sessionId);

		return SessionDTO.of(session);
	}

	@Override
	public String getCsrfToken(String sessionId) {

		String csrfToken = sessionRepository.getCsrfToken(UUID.fromString(sessionId))
			.orElseThrow(SessionException::csrfNotFound);

		// update timestamp to token
		refreshSession(sessionId);

		return csrfToken;
	}

	@Override
	public List<Session> getExpiredSessions() {

		Date oneHourAgo = new Date(System.currentTimeMillis() - SESSION_AGE);
		return sessionRepository.findByRecentTsLessThan(oneHourAgo);
	}

	@Override
	public void deleteSession(UUID sessionId) {
		sessionRepository.deleteById(sessionId);
	}

	@Override
	public void refreshSession(String sessionId) {

		UUID id = UUID.fromString(sessionId);

		sessionRepository.refreshSession(new Date(), id);
	}

	/** Creates a public session with empty authorities and principal.
	 * 
	 * @return {@link Session} */
	private Session newPubSession() {
		Session newSession = new Session();
		newSession.setId(UUID.randomUUID());
		newSession.setCsrfToken(UUID.randomUUID());
		newSession.setPrincipal("");
		newSession.setRecentTs(new Date());
		newSession.setAuthorities(Collections.emptyList());

		return newSession;
	}

	/** Promots a given public session by using session-id, principal and ROLE_USER
	 * 
	 * @param authorities
	 * @param principal
	 * @return {@link Session} */
	private Session newPromotedSession(String sessionId, String principal) {

		Session newSession = new Session();
		newSession.setId(UUID.fromString(sessionId));
		newSession.setCsrfToken(UUID.randomUUID());
		newSession.setPrincipal(principal);
		newSession.setRecentTs(new Date());
		newSession.setAuthorities(Arrays.asList("ROLE_USER"));

		return newSession;
	}
}
