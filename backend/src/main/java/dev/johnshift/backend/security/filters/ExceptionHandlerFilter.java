package dev.johnshift.backend.security.filters;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ExceptionHandlerFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {

		try {

			filterChain.doFilter(request, response);
		} catch (RuntimeException e) {

			// print exception message for debug
			log.debug("Exception: \t" + e.getMessage());
			e.printStackTrace();

			// only return ambiguous error for security
			Utils.writeUnauthorizedResponse(response, "UNAUTHORIZED");
		}
	}
}
