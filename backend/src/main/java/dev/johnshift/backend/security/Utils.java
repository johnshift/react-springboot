package dev.johnshift.backend.security;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import dev.johnshift.backend.exceptions.ExceptionDTO;

public class Utils {

	private static void writeExceptionResponse(HttpStatus status, HttpServletResponse response, String msg)
		throws IOException {

		ExceptionDTO resp = new ExceptionDTO("AuthenticationException", msg);
		String jsonPayload = new ObjectMapper().writeValueAsString(resp);

		response.setStatus(status.value());
		response.setContentType("application/json");

		PrintWriter writer = response.getWriter();
		writer.write(jsonPayload);
		writer.flush();
	}

	public static void writeUnauthorizedResponse(HttpServletResponse response, String msg) throws IOException {

		writeExceptionResponse(HttpStatus.UNAUTHORIZED, response, msg);
	}

	public static void writeForbiddenResponse(HttpServletResponse response, String msg) throws IOException {

		writeExceptionResponse(HttpStatus.FORBIDDEN, response, msg);
	}

	private Utils() {}
}
