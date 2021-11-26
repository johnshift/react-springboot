package dev.johnshift.backend.security.filters;

import java.io.IOException;
import java.util.Objects;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.filter.OncePerRequestFilter;
import dev.johnshift.backend.security.AuthException;
import dev.johnshift.backend.session.SessionService;
import lombok.RequiredArgsConstructor;

import static org.springframework.web.util.WebUtils.getCookie;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;
import static dev.johnshift.backend.session.SessionConstants.SESSION_CSRF_HEADER_KEY;

/** AuthFilter is invoked once per request only.
 * <p>
 * Notes:
 * <ul>
 * <li>Anonymous clients are provided with public session w/ valid csrf-token automatically issued
 * by {@link SessionFilter}</li>
 * <li>Clients can request the csrf-token if needed in client state. Upon request, the handler
 * returns the csrf-token linked with the session as string payload</li>
 * <li>Session cookie should have <code>http-only</code> attribute to be unreadable by client JS. It
 * should also have <code>same-site STRICT</code> attribute to be unreadable to other websites.</li>
 * <li>Todo -> User sessions should be deleted on logout</li>
 * <li>Todo -> Anonymous sessions should be deleted once user successfully logged in.</li>
 * <li>Todo -> refresh session expiration if received any request from loggedin user</li>
 * <li>Todo -> <code>same-site</code> cookies is still unsupported in springboot</li>
 * </ul>
 */
@RequiredArgsConstructor
public class CsrfFilter extends OncePerRequestFilter {

	private final SessionService sessionService;

	/** Retrieves csrf-token either from header or request attribute.
	 * <p>
	 * Returns <code>null</code> if none found.
	 * 
	 * @param request
	 * @return */
	private String getReqCsrfToken(HttpServletRequest request) {

		String csrfHeader = request.getHeader(SESSION_CSRF_HEADER_KEY);
		if (csrfHeader != null) {
			return csrfHeader;
		}

		String csrfAttr = (String) request.getAttribute(SESSION_CSRF_HEADER_KEY);
		if (csrfAttr != null) {
			return csrfAttr;
		}

		throw AuthException.unauthorized("CSRF Header not found");
	}

	/** Retrieves session-id either from session cookie or request attribute.
	 * <p>
	 * Returns <code>null</code> if none found.
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

		throw AuthException.unauthorized("No active session found");
	}

	/** Checks csrf-token in header or request attribute and matches to session in db.
	 * <ol>
	 * <li>Checks for csrf-token header and request attribute. Unauthorized if both null.</li>
	 * <li>If CSRF token in header is present, it ignores public issued session-id and only match
	 * csrf-token with active sessions in db.</li>
	 * <li>For active sesisons, checks if session cookie is present. Unauthorized if null.</li>
	 * <li>For public sesisons, checks if session request attribute is present. Unauthorized if
	 * null.</li>
	 * <li>Unauthorized if csrf-token does not match token inside session from db.</li>
	 * </ol>
	 * <p>
	 * Note: Cookie names are case-sensitive */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
		throws ServletException, IOException {

		String reqCsrfToken = getReqCsrfToken(request);
		String sessionId = getReqSessionId(request);
		String csrfToken = sessionService.getCsrfToken(sessionId);

		if (!Objects.equals(reqCsrfToken, csrfToken)) {
			throw AuthException.unauthorized("CSRF token mismatch");
		}

		chain.doFilter(request, response);
	}

	// @Override
	// protected boolean shouldNotFilter(HttpServletRequest request) {

	// Map<String, String> allowedRequests = new HashMap<>();
	// allowedRequests.put("/csrf-token", HttpMethod.GET.name());

	// String path = request.getRequestURI();
	// String method = request.getMethod();

	// boolean shouldSkip = false;
	// String mappedMethod = allowedRequests.get(path);

	// if (mappedMethod != null && mappedMethod.equals(method)) {
	// shouldSkip = true;
	// }

	// return shouldSkip;
	// }
}
