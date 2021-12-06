package dev.johnshift.backend.filters;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import dev.johnshift.backend.domains.dtos.JwtLoginDTO;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import static dev.johnshift.backend.constants.SecurityConstants.JWT_SECURE_KEY;

public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;

	public JwtLoginFilter(AuthenticationManager authenticationManager) {
		this.authenticationManager = authenticationManager;

		this.setFilterProcessesUrl("/api/v1/login");
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
		throws AuthenticationException {

		try {

			JwtLoginDTO dto = new ObjectMapper().readValue(request.getInputStream(), JwtLoginDTO.class);

			Authentication authentication =
				new UsernamePasswordAuthenticationToken(dto.getPrincipal(), dto.getPassword());

			return authenticationManager.authenticate(authentication);

		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
		Authentication authResult) throws IOException, ServletException {

		List<String> authorities = new ArrayList<>();
		authResult.getAuthorities().stream()
			.forEach(authority -> authorities.add(authority.getAuthority()));

		String token = Jwts.builder()
			.setSubject(authResult.getName())
			.claim("authorities", authorities)
			.setIssuedAt(new Date())
			.setExpiration(java.sql.Date.valueOf(LocalDate.now().plusDays(1)))
			.signWith(Keys.hmacShaKeyFor(JWT_SECURE_KEY.getBytes()))
			.compact();

		response.addHeader("Authorization", "Bearer " + token);

		// super.successfulAuthentication(request, response, chain, authResult);
	}



}
