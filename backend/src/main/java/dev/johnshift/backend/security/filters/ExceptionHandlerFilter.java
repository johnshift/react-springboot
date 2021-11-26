package dev.johnshift.backend.security.filters;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

public class ExceptionHandlerFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {
		try {
			filterChain.doFilter(request, response);
		} catch (RuntimeException e) {

			// we print exception message for debug
			System.out.println("\n\nAuthentication Error: \t" + e.getMessage() + "\n\t");
			e.printStackTrace();
			System.out.println("\n");

			// we return ambiguous error message
			Utils.writeUnauthorizedResponse(response, "UNAUTHORIZED");
		}
	}
}
