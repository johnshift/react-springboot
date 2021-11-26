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

		SessionEntity newSession = new SessionEntity();
		newSession.setId(UUID.randomUUID());
		newSession.setCsrfToken(UUID.randomUUID());
		newSession.setRecentTs(new Date());
		newSession.setRoles(Arrays.asList("USER"));

		SessionEntity session = sessionRepository.save(newSession);

		return SessionDTO.of(session);
	}

	@Override
	public SessionDTO createPublicSession() {

		SessionEntity newSession = new SessionEntity();
		newSession.setId(UUID.randomUUID());
		newSession.setCsrfToken(UUID.randomUUID());
		newSession.setRecentTs(new Date());
		newSession.setRoles(Collections.emptyList());

		SessionEntity session = sessionRepository.save(newSession);
		return SessionDTO.of(session);
	}


	@Override
	public SessionDTO getSessionBySessionId(String sessionId) {

		UUID id = UUID.fromString(sessionId);

		SessionEntity session = sessionRepository.findOneBySessionId(id)
			.orElseThrow(SessionException::notFound);

		return SessionDTO.of(session);
	}

	@Override
	public String getCsrfToken(String sessionId) {

		return sessionRepository.getCsrfToken(UUID.fromString(sessionId))
			.orElseThrow(SessionException::csrfNotFound);
	}

	@Override
	public String getCsrfTokenFromHttpRequest(HttpServletRequest request) {

		String reqSessionId = getReqSessionId(request);

		return getCsrfToken(reqSessionId);
	}

	@Override
	public List<SessionEntity> getExpiredSessions() {

		Date oneHourAgo = new Date(System.currentTimeMillis() - SESSION_AGE);
		return sessionRepository.findByRecentTsLessThan(oneHourAgo);
	}

	@Override
	public void deleteSession(SessionEntity session) {

		sessionRepository.delete(session);
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
