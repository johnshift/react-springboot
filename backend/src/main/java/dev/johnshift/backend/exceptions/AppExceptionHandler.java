package dev.johnshift.backend.exceptions;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import dev.johnshift.backend.security.AuthException;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {

	public static final String VALIDATION_EXCEPTION = "ValidationException";

	/** Validation Exceptions */
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(
		MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

		ExceptionDTO dto = new ExceptionDTO(
			VALIDATION_EXCEPTION,
			ex.getAllErrors().get(0).getDefaultMessage());

		return buildResponseEntity(dto, HttpStatus.BAD_REQUEST);
	}

	/** SQL Exceptions
	 * 
	 * @param ex
	 * @return */
	@ExceptionHandler(value = ConstraintViolationException.class)
	public ResponseEntity<Object> handleDataIntegrityException(ConstraintViolationException ex) {

		ExceptionDTO dto = new ExceptionDTO(
			"ConstraintViolationException",
			getSqlErrorMessage(ex));

		return buildResponseEntity(dto, HttpStatus.BAD_REQUEST);
	}


	/** Security Exceptions
	 * 
	 * @param ex
	 * @param request
	 * @return */
	@ExceptionHandler(value = AuthException.class)
	public ResponseEntity<Object> handleAuthException(AuthException ex, WebRequest request) {

		ExceptionDTO dto = new ExceptionDTO(
			ex.getClass().getSimpleName(),
			ex.getMessage());

		return buildResponseEntity(dto, ex.getStatus());

	}

	private ResponseEntity<Object> buildResponseEntity(ExceptionDTO resp, HttpStatus status) {
		return new ResponseEntity<>(resp, status);
	}

	private String getSqlErrorMessage(ConstraintViolationException ex) {

		String sqlState = ex.getSQLState();
		log.debug("sqlState = " + sqlState);
		String constraintName = ex.getConstraintName();
		log.debug("constraintName = " + constraintName);
		String columnName = getSqlColumnFromConstraintName(constraintName);
		log.debug("columnName = " + columnName);

		if ("23505".equals(sqlState)) {
			return columnName + " already exists.";
		}

		return "DB ERROR. Please contact admin.";

	}

	private String getSqlColumnFromConstraintName(String constraintName) {

		// table_name, column_name, type_constraint
		String[] strs = constraintName.split("_", 3);

		return StringUtils.capitalize(strs[1]);
	}
}
