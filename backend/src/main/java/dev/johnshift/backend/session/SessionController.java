package dev.johnshift.backend.session;

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

		String token = sessionService.getCsrfTokenFromHttpRequest(request);
		System.out.println("controller retrieved token = " + token);

		return token;
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
