package dev.johnshift.backend.auth;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

import static org.springframework.web.util.WebUtils.getCookie;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class AuthController {

	public static final String CSRF_HEADER_KEY = "x-veils-csrf-token";
	public static final String SESSION_COOKIE_NAME = "X-VEILS-SESSION";
	public static final String SESSION_COOKIE_NAME_PUBLIC = "X-VEILS-SESSION-PUB";

	private final AuthService authService;

	@GetMapping("/expired-sessions")
	public List<AuthSessionEntity> getExpiredSessions() {

		return authService.getExpiredSessions();
	}

	@GetMapping("/public")
	public String getPublic() {
		return "Welcome to public page";
	}

	@GetMapping("/protected")
	public String getIndex() {
		return "Welcome to protected page";
	}

	/**
	 * Checks if theres an active/public session cookie then checks if the session
	 * exists in db.
	 * <p>
	 * If session exists in db, returns associated csrf-token. Otherwise create
	 * new public session.
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@GetMapping("/csrf-token")
	public AuthCsrfDTO getCsrfToken(HttpServletRequest request, HttpServletResponse response) {

		// check active session cookie, match csrf-token in db, return if match
		Cookie sessionCookie = getCookie(request, SESSION_COOKIE_NAME);
		if (sessionCookie != null) {
			String sessionId = sessionCookie.getValue();
			AuthSessionDTO session = authService.getSessionBySessionId(sessionId);
			if (session != null) {
				return new AuthCsrfDTO(session.getCsrfToken());
			}
		}

		// check public session cookie, match csrf-token in db, return if match
		Cookie sessionCookiePub = getCookie(request, SESSION_COOKIE_NAME_PUBLIC);
		if (sessionCookiePub != null) {
			String sessionId = sessionCookiePub.getValue();
			AuthSessionDTO session = authService.getSessionBySessionId(sessionId);
			if (session != null) {
				return new AuthCsrfDTO(session.getCsrfToken());
			}
		}

		// if no active session, create pub session
		AuthSessionDTO sessionDTO = authService.createSession();

		// add session-id to cookies
		Cookie pubCookie = new Cookie(SESSION_COOKIE_NAME_PUBLIC, sessionDTO.getSessionId());
		pubCookie.setMaxAge(60 * 60);
		pubCookie.setHttpOnly(true);
		response.addCookie(pubCookie);

		return AuthCsrfDTO.of(sessionDTO);
	}

}
