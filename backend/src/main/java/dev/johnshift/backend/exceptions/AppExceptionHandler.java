package dev.johnshift.backend.exceptions;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import dev.johnshift.backend.domains.dtos.ExceptionDTO;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {

	private ResponseEntity<Object> buildResponseEntity(ExceptionDTO resp, HttpStatus status) {
		return new ResponseEntity<>(resp, status);
	}

	@ExceptionHandler(value = UserException.class)
	public ResponseEntity<Object> handleUserException(UserException ex, WebRequest req) {
		ExceptionDTO dto = new ExceptionDTO(
			ex.getClass().getSimpleName(),
			ex.getMessage());

		return buildResponseEntity(dto, ex.getStatus());

	}
}
