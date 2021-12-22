package dev.johnshift.backend.exceptions;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import dev.johnshift.backend.domains.dtos.ExceptionDTO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class AppExceptionHandler extends ResponseEntityExceptionHandler {

	// UTILITY FUNCTIONS
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
			return columnName + " already exists";
		}

		return "DB ERROR. Please contact admin.";

	}

	private String getSqlColumnFromConstraintName(String constraintName) {

		// table_name, column_name, type_constraint
		String[] strs = constraintName.split("_", 3);
		log.debug("constraintName = {}", constraintName);
		log.debug("strs = {}", strs);

		return StringUtils.capitalize(strs[1]);
	}

	// USER EXCEPTIONS
	@ExceptionHandler(value = UserException.class)
	public ResponseEntity<Object> handleUserException(UserException ex, WebRequest req) {
		ExceptionDTO dto = new ExceptionDTO(
			ex.getClass().getSimpleName(),
			ex.getMessage());

		return buildResponseEntity(dto, ex.getStatus());

	}

	// SQL ERRORS
	@ExceptionHandler(value = ConstraintViolationException.class)
	public ResponseEntity<Object> handleDataIntegrityException(ConstraintViolationException ex) {

		ExceptionDTO dto = new ExceptionDTO(
			"ConstraintViolationException",
			getSqlErrorMessage(ex));

		return buildResponseEntity(dto, HttpStatus.BAD_REQUEST);
	}
}
