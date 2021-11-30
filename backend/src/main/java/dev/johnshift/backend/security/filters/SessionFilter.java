package dev.johnshift.backend.security.filters;

import java.io.IOException;
import java.util.Objects;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.web.filter.OncePerRequestFilter;
import dev.johnshift.backend.session.SessionDTO;
import dev.johnshift.backend.session.SessionService;
import lombok.RequiredArgsConstructor;

import static org.springframework.web.util.WebUtils.getCookie;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_MAX_AGE;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_HTTP_ONLY;
import static dev.johnshift.backend.session.SessionConstants.SESSION_CSRF_HEADER_KEY;

/** Checks if an active session is present in the request. If it matches with session in db, updates
 * time stamp;
 * <p>
 * Creates anonymous session if no-session or invalid non-existing sessions.
 * <p>
 * Adds session-id to response cookies for http clients.
 * <p>
 * Public session-id and csrf-token are both added to request attribute for next filters. */
@RequiredArgsConstructor
public class SessionFilter extends OncePerRequestFilter {

	private final SessionService sessionService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {

		System.out.println("\n\n\n================= SESSION FILTER =================\n");

		Cookie sessionCookie = getCookie(request, SESSION_COOKIE_NAME);

		// active session present in cookie
		if (sessionCookie != null) {
			System.out.println("active session cookie = " + sessionCookie.getValue());
			String sessionId = sessionCookie.getValue();

			// retrieve session in db
			SessionDTO session = sessionService.getSessionBySessionId(sessionId);
			System.out.println("db-session from cookie: " + session.toString());

			// continue if session cookie matches in db
			if (session != null) {

				// if public session and method = GET, include csrf-token into request attributes
				boolean isGetRequest = Objects.equals(request.getMethod(), HttpMethod.GET.name());
				if (session.getAuthorities().isEmpty() && isGetRequest) {
					System.out.println("Using public session -> Adding csrf-token into request attribute.");
					request.setAttribute(SESSION_CSRF_HEADER_KEY, session.getCsrfToken());
				}

				// proceed to run security filters
				filterChain.doFilter(request, response);

				// AFter doing the filter chains,
				// return immediately to prevent execution of code below.
				// This will prevent creation of public session.
				return;
			}
		}

		// create public session if no-session or invalid non-existing sessions
		SessionDTO newSession = sessionService.createPublicSession();
		System.out.println("created public session = " + newSession.getSessionId());

		// add public session to response cookie
		Cookie pubCookie = new Cookie(SESSION_COOKIE_NAME, newSession.getSessionId());
		pubCookie.setMaxAge(SESSION_COOKIE_MAX_AGE);
		pubCookie.setHttpOnly(SESSION_COOKIE_HTTP_ONLY);
		response.addCookie(pubCookie);

		// add public session to request attribute for next filters
		request.setAttribute(SESSION_COOKIE_NAME, newSession.getSessionId());
		request.setAttribute(SESSION_CSRF_HEADER_KEY, newSession.getCsrfToken());

		// run next filters
		filterChain.doFilter(request, response);
	}
}
