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
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import dev.johnshift.backend.security.AuthException;
import dev.johnshift.backend.security.LoginReqDTO;
import dev.johnshift.backend.session.SessionCsrfDTO;
import dev.johnshift.backend.session.SessionDTO;
import dev.johnshift.backend.session.SessionService;
import static org.springframework.web.util.WebUtils.getCookie;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;

public class UserPassAuthFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	private final SessionService sessionService;

	public UserPassAuthFilter(AuthenticationManager authenticationManager, SessionService sessionService) {
		this.authenticationManager = authenticationManager;
		this.sessionService = sessionService;

		this.setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/api/v1/login", "POST"));
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
		throws AuthenticationException {

		System.out.println("\n\n\n================= USER-PASS FILTER: attemptAuthentication =================\n");

		try {
			LoginReqDTO loginReq = new ObjectMapper()
				.readValue(request.getInputStream(), LoginReqDTO.class);

			System.err.println("login-request principal = " + loginReq.getPrincipal());
			System.err.println("login-request password = " + loginReq.getPassword());

			Authentication authByUsername = new UsernamePasswordAuthenticationToken(
				loginReq.getPrincipal(),
				loginReq.getPassword());


			return authenticationManager.authenticate(authByUsername);

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

		System.out.println("----> successful authentication <----");

		User principal = (User) authResult.getPrincipal();
		System.out.println("auth'd principal = " + principal.getUsername());

		String prevSessionId = null;

		// retrieve session-id from request
		Cookie pubSessionCookie = getCookie(request, SESSION_COOKIE_NAME);
		if (pubSessionCookie != null) {
			prevSessionId = pubSessionCookie.getValue();
			System.out.println("already-existing pub session cookie = " + prevSessionId);

		} else {
			prevSessionId = (String) request.getAttribute(SESSION_COOKIE_NAME);
			System.out.println("already-existing pub session attribute = " + prevSessionId);
			request.setAttribute(SESSION_COOKIE_NAME, null);
		}

		// promote public session into active sesion and write response
		if (prevSessionId != null) {
			SessionDTO session = sessionService.promotePublicSession(prevSessionId, principal.getUsername());
			System.out.println("PROMOTED session-id = " + session.getSessionId());

			SessionCsrfDTO dto = new SessionCsrfDTO(session.getCsrfToken());
			String payload = new ObjectMapper().writeValueAsString(dto);

			response.setStatus(HttpStatus.OK.value());
			response.setContentType("application/json");
			response.getWriter().write(payload);
		}

	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException failed) throws IOException, ServletException {

		System.out.println("----> UNsuccessful authentication <----");
		System.out.println("err = " + failed.getMessage());
		throw AuthException.unauthorized("Incorrect username/email or password");
	}

}
