package dev.johnshift.backend.security;

import java.io.IOException;
import org.springframework.security.access.AccessDeniedException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
		AccessDeniedException accessDeniedException)
		throws IOException, ServletException {

		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			log.debug("principal = " + auth.getPrincipal() + " has been denied to access " + request.getRequestURI());
		}

		log.debug("Exception:" + accessDeniedException.getMessage());
		// accessDeniedException.printStackTrace();

		Utils.writeForbiddenResponse(response, "ACCESS DENIED");
	}
}
