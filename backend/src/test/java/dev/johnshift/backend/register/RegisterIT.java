package dev.johnshift.backend.register;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;
import dev.johnshift.backend.auth.AuthService;
import dev.johnshift.backend.constants.ValidationConstants;
import dev.johnshift.backend.credential.CredentialRepository;
import dev.johnshift.backend.credential.CredentialService;
import dev.johnshift.backend.session.SessionRepository;
import dev.johnshift.backend.session.SessionService;
import dev.johnshift.backend.user.UserRepository;
import dev.johnshift.backend.user.UserVeilRepository;
import dev.johnshift.backend.utils.Generator;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Sql({"/db/integration.sql"})
public class RegisterIT {

	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AccessDeniedHandler accessDeniedHandler;
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;
	@Autowired
	UserVeilRepository userVeilRepository;
	@Autowired
	CredentialRepository credentialRepository;
	@Autowired
	SessionRepository sessionRepository;

	@Autowired
	CredentialService credentialService;
	@Autowired
	SessionService sessionService;
	@Autowired
	AuthService authService;

	@Autowired
	WebTestClient webTestClient;

	private final String API_URI = "/api/v1/register";

	private final String sampleValidUsername = "batman2";
	private final String sampleValidEmail = "batman@hotmail.com";
	private final String sampleValidPassword = "I am batman";
	private final String sampleValidName = "ben affleck jr.";
	// private final String sampleValidVeil = "B-A-T-M-A-N-2";
	private final String sampleValidVeil = "batman";

	// already existing in integration.sql
	private final String existingUsername = "batman";
	private final String existingEmail = "batman@gmail.com";

	// username required
	@Test
	void usernameRequired_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.USERNAME_REQUIRED);

	}

	// username too short
	@Test
	void shortUsername_badRequest() {

		String shortUsername = Generator.genString(ValidationConstants.MIN_USERNAME_LENGTH - 1, true);

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(shortUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.USERNAME_TOO_SHORT);

	}

	// username too long
	@Test
	void longUsername_badRequest() {

		String longUsername = Generator.genString(ValidationConstants.MAX_USERNAME_LENGTH + 1, true);

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(longUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.USERNAME_TOO_LONG);

	}

	// username invalid format
	@Test
	void invalidUsername_badRequest() {

		String invalidUsername = "zxc!";

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(invalidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.USERNAME_INVALID_FORMAT);
	}

	// username duplicate
	@Test
	void duplicateUsername_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(existingUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo("Username already exists.");

	}

	// email required
	@Test
	void requiredEmail_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.EMAIL_REQUIRED);
	}

	// email invalid
	@Test
	void invalidEmail_badRequest() {

		String invalidEmail = "x@gmail";

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(invalidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.EMAIL_INVALID);
	}

	// email already exists
	@Test
	void duplicateEmail_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(existingEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo("Email already exists.");
	}

	// password required
	@Test
	void requiredPassword_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.PASSWORD_REQUIRED);

	}

	// password too short
	@Test
	void shortPassword_badRequest() {

		String shortPassword = Generator.genString(ValidationConstants.MIN_PASSWORD_LENGTH - 1);

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(shortPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.PASSWORD_TOO_SHORT);
	}

	// password too long
	@Test
	void longPassword_badRequest() {

		String longPassword = Generator.genString(ValidationConstants.MAX_PASSWORD_LENGTH + 1);

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(longPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.PASSWORD_TOO_LONG);
	}

	// name required
	@Test
	void nameRequired_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.NAME_REQUIRED);
	}

	// name too
	@Test
	void shortName_badRequest() {

		String shortName = Generator.genStringLettersOnly(ValidationConstants.MIN_NAME_LENGTH - 1);

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(shortName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.NAME_TOO_SHORT);
	}

	// name too long
	@Test
	void longName_badRequest() {

		String longName = Generator.genStringLettersOnly(ValidationConstants.MAX_NAME_LENGTH + 1);

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(longName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.NAME_TOO_LONG);

	}

	// name invalid chars
	@Test
	void invalidName_badRequest() {

		String invalidName = "John!";

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(invalidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.NAME_INVALID);
	}

	// veil
	@Test
	void requiredVeil_badRequest() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.VEIL_REQUIRED);
	}

	// veil too short
	@Test
	void shortVeil_badRequest() {

		String shortVeil = Generator.genString(ValidationConstants.MIN_VEIL_LENGTH - 1, true);

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(shortVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.VEIL_TOO_SHORT);
	}

	// veil too long
	@Test
	void longVeil_badRequest() {

		String longVeil = Generator.genString(ValidationConstants.MAX_VEIL_LENGTH + 1, true);

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(longVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.VEIL_TOO_LONG);
	}

	// veil invalid chars
	@Test
	void invalidVeil_badRequest() {

		String invalidVeil = "zxc!";

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(invalidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isBadRequest()
			.expectBody()
			.jsonPath("$.message").isEqualTo(RegisterException.VEIL_INVALID_FORMAT);
	}

	// register OK
	@Test
	void OK() {

		RegisterDTO dto = new RegisterDTO();
		dto.setUsername(sampleValidUsername);
		dto.setEmail(sampleValidEmail);
		dto.setPassword(sampleValidPassword);
		dto.setName(sampleValidName);
		dto.setVeil(sampleValidVeil);

		webTestClient.post()
			.uri(API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isOk();
	}

}
