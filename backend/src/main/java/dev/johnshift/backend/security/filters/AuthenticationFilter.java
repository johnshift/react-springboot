package dev.johnshift.backend.security.filters;

import java.io.IOException;
import java.util.Set;
import java.util.stream.Collectors;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import dev.johnshift.backend.credential.CredentialService;
import dev.johnshift.backend.session.SessionDTO;
import dev.johnshift.backend.session.SessionService;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
public class AuthenticationFilter extends OncePerRequestFilter {

	private final CredentialService credentialService;
	private final SessionService sessionService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
		FilterChain filterChain)
		throws ServletException, IOException {

		System.out.println("\n\n\n================= AUTHENTICATION FILTER =================\n");

		// all authenticated requests has ROLE_USER and is present in cookie header
		// if no cookie do nothing.
		Cookie sessionCookie = getCookie(request, SESSION_COOKIE_NAME);
		if (sessionCookie == null) {
			System.out.println("no cookie in session -> meaning no authorizations -> next filter");
			filterChain.doFilter(request, response);
			return;
		}

		String sessionId = sessionCookie.getValue();
		System.out.println("session cookie session-id = " + sessionId);
		SessionDTO sessionDTO = sessionService.getSessionBySessionId(sessionId);
		System.out.println("sessionDTO from db = " + sessionDTO.toString());

		String password = credentialService.getPasswordByPrincipalOrNull(sessionDTO.getPrincipal());
		System.out.println("password retrieved using principal = " + password);

		// throw exception if no password
		if (password == null) {
			// throw AuthException.unauthorized("Incorrect password for principal " +
			// sessionDTO.getPrincipal());
			filterChain.doFilter(request, response);
			return;
		}

		Set<GrantedAuthority> authorities = sessionDTO.getAuthorities().stream()
			.map(a -> new SimpleGrantedAuthority(a))
			.collect(Collectors.toSet());
		System.out.println("authorities = " + authorities.toString());

		Authentication authentication = new UsernamePasswordAuthenticationToken(
			sessionDTO.getPrincipal(),
			password,
			authorities);

		System.out.println("user-pass auth token isAuthenticated = " + authentication.isAuthenticated());

		SecurityContextHolder.getContext().setAuthentication(authentication);
		filterChain.doFilter(request, response);

	}

}
