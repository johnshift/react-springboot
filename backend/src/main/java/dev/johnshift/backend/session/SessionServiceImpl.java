package dev.johnshift.backend.session;

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
	public SessionDTO createSession(boolean isAuthenticated) {

		SessionEntity newSession = new SessionEntity();
		newSession.setCsrfToken(UUID.randomUUID().toString());
		newSession.setSessionId(UUID.randomUUID().toString());
		newSession.setTimestamp(new Date());
		newSession.setAuthenticated(isAuthenticated);

		SessionEntity session = sessionRepository.save(newSession);

		return SessionDTO.of(session);
	}

	@Override
	public SessionDTO getSessionBySessionId(String sessionId) {

		SessionEntity session = sessionRepository.findOneBySessionId(sessionId)
			.orElseThrow(SessionException::notFound);

		return SessionDTO.of(session);
	}

	@Override
	public String getCsrfToken(String sessionId) {

		return sessionRepository.getCsrfToken(sessionId)
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
		return sessionRepository.findByTimestampLessThan(oneHourAgo);
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
}
