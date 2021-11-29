package dev.johnshift.backend.session;

import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;

import static org.springframework.web.util.WebUtils.getCookie;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

	private final SessionRepository sessionRepository;

	@Override
	public SessionDTO createSession() {

		Session newSession = new Session();
		newSession.setId(UUID.randomUUID());
		newSession.setCsrfToken(UUID.randomUUID());
		newSession.setRecentTs(new Date());

		// todo: include other write authorities
		newSession.setAuthorities(Arrays.asList("ROLE_USER"));

		Session session = sessionRepository.save(newSession);

		return SessionDTO.of(session);
	}

	@Override
	public SessionDTO createPublicSession() {

		Session newSession = new Session();
		newSession.setId(UUID.randomUUID());
		newSession.setCsrfToken(UUID.randomUUID());
		newSession.setPrincipal("");
		newSession.setRecentTs(new Date());
		newSession.setAuthorities(Collections.emptyList());

		Session session = sessionRepository.save(newSession);
		return SessionDTO.of(session);
	}

	@Override
	public SessionDTO promotePublicSession(String sessionId, String principal) {


		Session promotedSession = new Session();
		promotedSession.setId(UUID.fromString(sessionId));
		promotedSession.setCsrfToken(UUID.randomUUID());
		promotedSession.setPrincipal(principal);
		promotedSession.setRecentTs(new Date());
		promotedSession.setAuthorities(Arrays.asList("ROLE_USER"));

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
	public String getCsrfTokenFromHttpRequest(HttpServletRequest request) {

		String reqSessionId = getReqSessionId(request);
		String csrfToken = getCsrfToken(reqSessionId);

		// update timestamp to token
		refreshSession(reqSessionId);

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


	/** Retrieves session-id either from session cookie or request attribute.
	 * <p>
	 * Throws {@link SessionException}: "Request session not found" if both null.
	 * 
	 * @param request
	 * @return */
	private String getReqSessionId(HttpServletRequest request) {
		Cookie sessionCookie = getCookie(request, SESSION_COOKIE_NAME);
		if (sessionCookie != null) {
			return sessionCookie.getValue();
		}

		String sessionId = (String) request.getAttribute(SESSION_COOKIE_NAME);
		if (sessionId != null) {
			return sessionId;
		}

		throw SessionException.reqSessionNotFound();
	}

	@Override
	public void refreshSession(String sessionId) {

		UUID id = UUID.fromString(sessionId);

		sessionRepository.refreshSession(new Date(), id);
	}
}
