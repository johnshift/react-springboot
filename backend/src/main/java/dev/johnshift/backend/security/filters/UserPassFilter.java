package dev.johnshift.backend.security.filters;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import dev.johnshift.backend.security.AuthException;
import dev.johnshift.backend.security.LoginReqDTO;
import dev.johnshift.backend.session.SessionDTO;
import dev.johnshift.backend.session.SessionService;
import lombok.extern.slf4j.Slf4j;
import static org.springframework.web.util.WebUtils.getCookie;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;
import static dev.johnshift.backend.session.SessionConstants.SESSION_CSRF_HEADER_KEY;

/** This filter intercepts login request at <code>/api/v1/login</code>.
 * <p>
 * Upon reaching this filter, there should be a public session already. After successfully providing
 * correct username and password, the public session is promoted into an active session.
 * <p>
 * The <code>csrf-token</code> associated with the session is sent in response headers. Clients are
 * responsible for adding csrf-token into headers on subsequent requests. */
@Slf4j
public class UserPassFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	private final SessionService sessionService;

	public UserPassFilter(AuthenticationManager authenticationManager, SessionService sessionService) {
		this.authenticationManager = authenticationManager;
		this.sessionService = sessionService;

		this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/v1/login", "POST"));
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
		throws AuthenticationException {

		try {
			LoginReqDTO loginReq = new ObjectMapper()
				.readValue(request.getInputStream(), LoginReqDTO.class);

			log.debug("Login request principal = " + loginReq.getPrincipal());
			log.debug("Login request password = " + loginReq.getPassword());

			Authentication authByUsername = new UsernamePasswordAuthenticationToken(
				loginReq.getPrincipal(),
				loginReq.getPassword());
			log.debug("Login request authByUsername token = " + authByUsername.toString());


			Authentication finalAuthentication = authenticationManager.authenticate(authByUsername);
			if (finalAuthentication != null) {
				log.debug("finalAuthentication = " + finalAuthentication.toString());
			}

			return finalAuthentication;

		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	/** On successful authentication, promotes existing pub-session into active-session
	 * <p>
	 * Deletes entry for both cookies and request attributes and also in DB. */
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authResult) throws IOException, ServletException {

		log.debug("Successful authentication");

		String principal = (String) authResult.getPrincipal();
		log.debug("Authenticated principal = " + principal);

		String prevSessionId = null;

		// retrieve session-id from request
		Cookie pubSessionCookie = getCookie(request, SESSION_COOKIE_NAME);
		if (pubSessionCookie != null) {
			prevSessionId = pubSessionCookie.getValue();
			log.debug("Already-existing pub session cookie = " + prevSessionId);
		} else {
			prevSessionId = (String) request.getAttribute(SESSION_COOKIE_NAME);
			log.debug("Already-existing pub session attribute = " + prevSessionId);
			request.setAttribute(SESSION_COOKIE_NAME, null);
		}

		// promote public session into active sesion and write response
		if (prevSessionId != null) {
			SessionDTO session = sessionService.promotePublicSession(prevSessionId, principal);
			log.debug("PROMOTED session-id = " + session.getSessionId());

			response.setStatus(HttpStatus.OK.value());
			response.setHeader(SESSION_CSRF_HEADER_KEY, session.getCsrfToken());

			// set authentication into security context
			SecurityContextHolder.getContext().setAuthentication(authResult);
		}

	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException failed) throws IOException, ServletException {

		log.debug("Unsuccessful authentication");
		log.debug("err = " + failed.getMessage());
		throw AuthException.unauthorized("Incorrect username/email or password");
	}

}
