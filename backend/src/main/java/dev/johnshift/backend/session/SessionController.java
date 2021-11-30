package dev.johnshift.backend.session;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import dev.johnshift.backend.exceptions.ExceptionDTO;
import lombok.RequiredArgsConstructor;

import static org.springframework.web.util.WebUtils.getCookie;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/session")
public class SessionController {

	private final SessionService sessionService;

	@GetMapping("/")
	public String getIndex() {
		return "This should be publicly accesible";
	}

	@GetMapping("/user-only")
	@PreAuthorize("isAuthenticated()")
	public String getUserOnly() {
		return "This should be user-only accesible";
	}

	@GetMapping("/csrf-token")
	public String getCsrfToken(HttpServletRequest request, HttpServletResponse response) {

		String reqSessionId = getReqSessionId(request);

		return sessionService.getCsrfToken(reqSessionId);
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

	// =====================================================================
	// ======================== SESSION EXCEPTIONS =========================
	// =====================================================================

	@ExceptionHandler(value = {SessionException.class})
	public ResponseEntity<ExceptionDTO> handleSessionException(WebRequest req, SessionException ex) {

		ExceptionDTO dto = new ExceptionDTO(
			SessionException.class.getSimpleName(),
			ex.getMessage());

		return new ResponseEntity<>(dto, ex.getStatus());

	}

}
