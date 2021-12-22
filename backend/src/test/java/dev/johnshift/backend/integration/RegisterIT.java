package dev.johnshift.backend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.cors.CorsConfigurationSource;
import dev.johnshift.backend.domains.dtos.RegisterDTO;
import dev.johnshift.backend.exceptions.UserException;
import dev.johnshift.backend.repositories.UserRepository;
import dev.johnshift.backend.services.UserService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Sql({"/db/integration.sql"})
public class RegisterIT {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	CorsConfigurationSource corsConfigurationSource;

	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	DaoAuthenticationProvider daoAuthenticationProvider;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@Autowired
	WebTestClient webTestClient;

	private final String API_URI = "/api/v1/register";

	private final String validUsername = "demo";
	private final String validEmail = "demo@example.com";
	private final String validPassword = "demo123";
	private final String validName = "Demo User";
	private final String validVeil = "anonymous1";

	// required username
	@Test
	void usernameRequired_badRequest() {

		RegisterDTO dto = new RegisterDTO();

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.USERNAME_REQUIRED);

	}

	// required email
	@Test
	void emailRequired_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.EMAIL_REQUIRED);
	}

	// required password
	@Test
	void passwordRequired_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.PASSWORD_REQUIRED);
	}

	// required name
	@Test
	void nameRequired_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.NAME_REQUIRED);
	}

	// required veil
	@Test
	void veilRequired_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);
		dto.setName(validName);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.VEIL_REQUIRED);
	}

	// short username
	@Test
	void shortUsername_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername("asd");
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);
		dto.setName(validName);
		dto.setVeil(validVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.USERNAME_TOO_SHORT);
	}

	// long username
	@Test
	void longUsername_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername("asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx");
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);
		dto.setName(validName);
		dto.setVeil(validVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.USERNAME_TOO_LONG);
	}

	// invalid email
	@Test
	void invalidEmail_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail("a@x.i");
		dto.setPassword(validPassword);
		dto.setName(validName);
		dto.setVeil(validVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.EMAIL_INVALID);
	}

	// short password
	@Test
	void shortPassword_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword("12345");
		dto.setName(validName);
		dto.setVeil(validVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.PASSWORD_TOO_SHORT);
	}

	// long password
	@Test
	void longPassword_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword("asdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfx");
		dto.setName(validName);
		dto.setVeil(validVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.PASSWORD_TOO_LONG);
	}

	// short name
	@Test
	void shortName_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);
		dto.setName("f u");
		dto.setVeil(validVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.NAME_TOO_SHORT);
	}

	// long name
	@Test
	void longName_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);
		dto.setName("asdfasdfasdfasdfasdfasdfasdfasdfasdfx");
		dto.setVeil(validVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.NAME_TOO_LONG);
	}

	// invalid name
	@Test
	void invalidName_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);
		dto.setName("1sdf");
		dto.setVeil(validVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.NAME_INVALID);
	}

	// short veil
	@Test
	void shortVeil_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);
		dto.setName(validName);
		dto.setVeil("abc");

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.VEIL_TOO_SHORT);
	}

	// long veil
	@Test
	void longVeil_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(validUsername);
		dto.setEmail(validEmail);
		dto.setPassword(validPassword);
		dto.setName(validName);
		dto.setVeil("asdfasdfasdfasdfasdfasdfasdfasdfasdfx");

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(UserException.VEIL_TOO_LONG);
	}

	// non-unique username
	// non-unique email
	// non-unique veil
}
