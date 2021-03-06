package dev.johnshift.backend.filters;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import dev.johnshift.backend.domains.dtos.AfterLoginDTO;
import dev.johnshift.backend.domains.dtos.ExceptionDTO;
import dev.johnshift.backend.domains.dtos.JwtLoginDTO;
import dev.johnshift.backend.domains.dtos.UserDTO;
import dev.johnshift.backend.domains.models.AppUserDetails;
import dev.johnshift.backend.services.UserService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import static dev.johnshift.backend.constants.SecurityConstants.JWT_SECURE_KEY;

public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {

	private final AuthenticationManager authenticationManager;
	private final UserService userService;

	public JwtLoginFilter(AuthenticationManager authenticationManager, UserService userService) {
		this.authenticationManager = authenticationManager;
		this.userService = userService;

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

		String username = ((AppUserDetails) authResult.getPrincipal()).getUsername();
		UserDTO user = userService.findByUsername(username);

		AfterLoginDTO resp = new AfterLoginDTO();
		resp.setId(user.getId());
		resp.setName(user.getName());
		resp.setDescription(user.getDescription());
		resp.setUsername(user.getUsername());
		resp.setVerified(user.isVerified());

		String jsonPayload = new ObjectMapper().writeValueAsString(resp);

		response.setStatus(HttpStatus.OK.value());
		response.setContentType("application/json");
		response.getWriter().write(jsonPayload);
	}

	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException failed) throws IOException, ServletException {

		ExceptionDTO resp = new ExceptionDTO("AuthenticationException", "Incorrect username/email or password");
		String jsonPayload = new ObjectMapper().writeValueAsString(resp);

		response.setStatus(HttpStatus.BAD_REQUEST.value());
		response.setContentType("application/json");

		PrintWriter writer = response.getWriter();
		writer.write(jsonPayload);
		writer.flush();
	}



}
