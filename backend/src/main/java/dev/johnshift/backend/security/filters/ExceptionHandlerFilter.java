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

			System.out.println("\n\n\n================= Exception Handler Filter CATCH =================\n");

			// print exception message for debug
			System.out.println("Authentication Error: \t" + e.getMessage() + "\n\n");
			// e.printStackTrace();
			// System.out.println("\n");

			// only return ambiguous error for security
			Utils.writeUnauthorizedResponse(response, "UNAUTHORIZED");
		}
	}
}
