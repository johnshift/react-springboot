package dev.johnshift.backend.auth;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import dev.johnshift.backend.exceptions.ExceptionDTO;
import lombok.RequiredArgsConstructor;


import static org.springframework.web.util.WebUtils.getCookie;
import static dev.johnshift.backend.auth.AuthController.CSRF_HEADER_KEY;
import static dev.johnshift.backend.auth.AuthController.SESSION_COOKIE_NAME;
import static dev.johnshift.backend.auth.AuthController.SESSION_COOKIE_NAME_PUBLIC;

/**
 * AuthFilter is invoked once per request only.
 * <p>
 * Notes:
 * <ul>
 * <li>Anonymous clients should already have <code>X-XSRF-TOKEN</code> header in
 * their request or else they will be rejected by xsrf verification.</li>
 * <li>Clients can request anonymous <code>X-XSRF-TOKEN</code> if none is found
 * in client state. Upon request, a new anonymous <code>X-SESSION</code> will be
 * created linked with a new <code>X-XSRF-TOKEN</code> which will also be sent
 * in response headers.</li>
 * <li><code>X-SESSION</code> cookie should have <code>http-only</code>
 * attribute to be unreadable by client JS. It should also have
 * <code>same-site STRICT</code> attribute to be unreadable to other
 * websites.</li>
 * <li>Anonymous sessions should be deleted once user successfully logged
 * in.</li>
 * <li>User sessions should be deleted on logout</li>
 * <li>Todo: refresh session expiration if received any request from loggedin
 * user
 * <li>Todo: <code>same-site</code> cookies is still unsupported in
 * springboot</li>
 * </ul>
 */
@RequiredArgsConstructor
public class AuthCsrfFilter extends OncePerRequestFilter {

	private final AuthService authService;

	private void writeUnauthorizedResponse(HttpServletResponse response, String msg) throws IOException {

		ExceptionDTO resp = new ExceptionDTO("AuthException", msg);
		String jsonPayload = new ObjectMapper().writeValueAsString(resp);

		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType("application/json");

		PrintWriter writer = response.getWriter();
		writer.write(jsonPayload);
		writer.flush();
	}

	/**
	 * Steps:
	 * <ol>
	 * <li>Checks for csrf-token header. Unauthorized if null.</li>
	 * <li>Checks either public or user session is present. Unauthorized if both null.</li>
	 * <li>Unauthorized if csrf-token does not match token inside session from db.</li>
	 * </ol>
	 * <p>
	 * Note: Cookie names are case-sensitive
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
		throws ServletException, IOException {

		// if no x-csrf-token header -> unauthorized
		String csrfHeader = request.getHeader(CSRF_HEADER_KEY);
		if (csrfHeader == null) {
			writeUnauthorizedResponse(response, "Invalid CSRF token");
			return;
		}

		// public session
		Cookie pubSessionCookie = getCookie(request, SESSION_COOKIE_NAME_PUBLIC);
		if (pubSessionCookie != null) {
			String sessionId = pubSessionCookie.getValue();
			AuthSessionDTO pubSession = authService.getSessionBySessionId(sessionId);
			if (pubSession == null) {
				writeUnauthorizedResponse(response, "PUBLIC SESSION NOT FOUND IN DB");
				return;
			}
			if (!csrfHeader.equals(pubSession.getCsrfToken())) {
				writeUnauthorizedResponse(response, "PUBLIC CSRF TOKEN MISMATCH");
				return;
			}
			chain.doFilter(request, response);
		}

		// authenticated session
		Cookie userSessionCookie = getCookie(request, SESSION_COOKIE_NAME);
		if (userSessionCookie != null) {
			String sessionId = userSessionCookie.getValue();
			AuthSessionDTO pubSession = authService.getSessionBySessionId(sessionId);
			if (pubSession == null) {
				writeUnauthorizedResponse(response, "USER SESSION NOT FOUND IN DB");
				return;
			}
			if (!csrfHeader.equals(pubSession.getCsrfToken())) {
				writeUnauthorizedResponse(response, "PUBLIC CSRF TOKEN MISMATCH");
				return;
			}
			chain.doFilter(request, response);
		}

		// if code reached here, means no public and user session -> unauthorized
		writeUnauthorizedResponse(response, "No session found");
	}

	/**
	 * Do not run AuthFilter on the following requests:
	 * <ul>
	 * <li>GET /csrf-token</li>
	 * </ul>
	 */
	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {

		Multimap<String, String> allowedRequests = ArrayListMultimap.create();
		allowedRequests.put("/csrf-token", HttpMethod.GET.name());
		allowedRequests.put("/expired-sessions", HttpMethod.GET.name());

		return allowedRequests.containsEntry(request.getRequestURI(), request.getMethod());
	}
}
