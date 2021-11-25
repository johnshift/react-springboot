package dev.johnshift.backend.session;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import dev.johnshift.backend.exceptions.ExceptionDTO;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class SessionController {

	private final SessionService sessionService;

	@GetMapping("/csrf-token")
	public String getCsrfToken(HttpServletRequest request, HttpServletResponse response) {

		return sessionService.getCsrfTokenFromHttpRequest(request);
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
