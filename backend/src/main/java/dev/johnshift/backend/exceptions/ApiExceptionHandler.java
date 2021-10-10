package dev.johnshift.backend.exceptions;


import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@Order(Ordered.HIGHEST_PRECEDENCE)
@ControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

  public static final String INVALID_TYPE = "InvalidTypeException";
  public static final String INVALID_TYPE_MSG = "Invalid type provided";

  /*
   * Overriden Exceptions
   * e.g. JsonParse errors, path not found etc. etc.
  */

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  protected ResponseEntity<Object> handleMethodArgumentTypeMismatch(
      MethodArgumentTypeMismatchException ex, WebRequest request
  ) {

    ErrorDto dto = new ErrorDto(
      INVALID_TYPE,
      INVALID_TYPE_MSG
    );

    return buildResponseEntity(dto, HttpStatus.BAD_REQUEST);
  }


  /*
   * Handle Global App Exceptions here
   * e.g. Validations etc. etc.
  */

  private ResponseEntity<Object> buildResponseEntity(ErrorDto resp, HttpStatus status) {
    return new ResponseEntity<>(resp, status);
  }
}
