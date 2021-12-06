package dev.johnshift.backend.filters;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import static dev.johnshift.backend.constants.SecurityConstants.JWT_SECURE_KEY;

public class JwtVerifyFilter extends OncePerRequestFilter {

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
		throws ServletException, IOException {

		String jwtHeader = request.getHeader("Authorization");

		if (jwtHeader == null || !jwtHeader.startsWith("Bearer ")) {
			filterChain.doFilter(request, response);
			return;
		}

		String token = jwtHeader.replace("Bearer ", "");

		try {

			Claims claims = Jwts.parserBuilder()
				.setSigningKey(Keys.hmacShaKeyFor(JWT_SECURE_KEY.getBytes()))
				.build()
				.parseClaimsJws(token)
				.getBody();


			String principal = claims.getSubject();

			@SuppressWarnings("unchecked")
			List<String> authorities = (List<String>) claims.get("authorities");


			Authentication authentication = new UsernamePasswordAuthenticationToken(
				principal,
				null,
				authorities.stream()
					.map(SimpleGrantedAuthority::new)
					.collect(Collectors.toSet()));

			SecurityContextHolder.getContext().setAuthentication(authentication);

		} catch (JwtException e) {
			throw new RuntimeException(String.format("Token %s cannot be trusted", token));
		}

		filterChain.doFilter(request, response);

	}

}
