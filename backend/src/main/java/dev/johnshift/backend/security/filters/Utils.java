package dev.johnshift.backend.security.filters;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import dev.johnshift.backend.exceptions.ExceptionDTO;

public class Utils {

	public static void writeUnauthorizedResponse(HttpServletResponse response, String msg) throws IOException {

		ExceptionDTO resp = new ExceptionDTO("AuthenticationException", msg);
		String jsonPayload = new ObjectMapper().writeValueAsString(resp);

		response.setStatus(HttpStatus.UNAUTHORIZED.value());
		response.setContentType("application/json");

		PrintWriter writer = response.getWriter();
		writer.write(jsonPayload);
		writer.flush();
	}

	private Utils() {}
}
