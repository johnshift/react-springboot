package dev.johnshift.backend.security.filters;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import dev.johnshift.backend.credential.CredentialService;
import dev.johnshift.backend.session.SessionDTO;
import dev.johnshift.backend.session.SessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import static org.springframework.web.util.WebUtils.getCookie;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;

/** This filter does the following:
 * <ul>
 * <li>Get session-id from cookie. (no session-id = no auth)</li>
 * <li>Retrieve principal and password from session. (no match = no auth)</li>
 * <li>Create user-pass token using credentials</li>
 * <li>Set user-pass token as authentication for SecurityContextHolder.</li>
 * <li>Let spring-security do the rest.</li>
 * </ul>
 */
@Slf4j
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

	private final CredentialService credentialService;
	private final SessionService sessionService;
	private final AuthenticationManager authenticationManager;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain)
		throws ServletException, IOException {

		// all authenticated requests has ROLE_USER and is present in cookie header
		// if no cookie do nothing.
		Cookie sessionCookie = getCookie(request, SESSION_COOKIE_NAME);
		if (sessionCookie == null) {
			log.debug("No cookie in session -> No authorizations -> Next filter");
			filterChain.doFilter(request, response);
			return;
		}

		String sessionId = sessionCookie.getValue();
		log.debug("Session Cookie = " + sessionId);
		SessionDTO sessionDTO = sessionService.getSessionBySessionId(sessionId);
		log.debug("SessionDTO from db = " + sessionDTO.toString());

		String password = credentialService.getPasswordByPrincipalOrNull(sessionDTO.getPrincipal());
		log.debug("Password using principal = " + password);

		// throw exception if no password
		if (password == null) {
			// throw AuthException.unauthorized("Incorrect password for principal " +
			// sessionDTO.getPrincipal());
			filterChain.doFilter(request, response);
			return;
		}

		// set pre-authentication token
		Authentication authentication = new UsernamePasswordAuthenticationToken(
			sessionDTO.getPrincipal(),
			password);

		// retrieve full details of authentication after verification
		Authentication finalAuthentication = authenticationManager.authenticate(authentication);


		// set authentication into security context
		SecurityContextHolder.getContext().setAuthentication(finalAuthentication);

		filterChain.doFilter(request, response);

	}

}
