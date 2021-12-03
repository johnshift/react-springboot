package dev.johnshift.backend.security;

import java.time.Duration;
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
import dev.johnshift.backend.credential.CredentialRepository;
import dev.johnshift.backend.credential.CredentialService;
import dev.johnshift.backend.post.PostCreateRequest;
import dev.johnshift.backend.session.SessionRepository;
import dev.johnshift.backend.session.SessionService;

import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;
import static dev.johnshift.backend.session.SessionConstants.SESSION_CSRF_HEADER_KEY;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_MAX_AGE;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_HTTP_ONLY;


@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Sql({"/db/integration.sql"})
public class SecurityTestIT {

	@Autowired
	CredentialRepository credentialRepository;
	@Autowired
	CredentialService credentialService;
	@Autowired
	SessionRepository sessionRepository;
	@Autowired
	SessionService sessionService;
	@Autowired
	AuthService authService;
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	AccessDeniedHandler accessDeniedHandler;
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	WebTestClient webTestClient;

	private final String SECURITY_API_URI = "/api/v1/security";
	private final String LOGIN_API_URI = "/api/v1/login";

	// note: these are hard coded in integration.sql
	private final String pubSessionId = "8da7279e-75e9-4b6b-9949-b0c7edda455b";
	private final String pubCsrfToken = "202a96cd-dc51-447e-a88a-80d315561df1";
	private final String activeSessionId = "a2ab50d6-21fc-44b2-90d7-74d76924aeda";
	private final String activeCsrfToken = "a63f4ff3-9dd0-4bbd-b90c-d4b107e74057";
	private final String activePrincipal = "batman";
	private final String activePassword = "$2a$10$v18wFJddnl9tGLu37kQcG.EYvp4scbebr9HDWxEjhqXVDVRvIbFre";

	@Test
	public void get_notSecured_OK() {

		webTestClient.get().uri(SECURITY_API_URI + "/not-secured")
			.exchange()
			.expectStatus().isOk()
			.expectBody().toString().equals(SecurityController.NOT_SECURED);

	}

	@Test
	public void get_permitAll_noSession_noCsrf_OK() {

		webTestClient.get().uri(SECURITY_API_URI + "/permit-all")
			.exchange()
			.expectStatus().isOk()
			.expectCookie().exists(SESSION_COOKIE_NAME)
			.expectCookie().httpOnly(SESSION_COOKIE_NAME, SESSION_COOKIE_HTTP_ONLY)
			.expectCookie().maxAge(SESSION_COOKIE_NAME, Duration.ofSeconds(SESSION_COOKIE_MAX_AGE))
			.expectBody().toString().equals(SecurityController.PERMIT_ALL);
	}

	@Test
	public void get_permitAll_pubSession_noCsrf_OK() {

		webTestClient.get()
			.uri(SECURITY_API_URI + "/permit-all")
			.cookie(SESSION_COOKIE_NAME, pubSessionId)
			.exchange()
			.expectStatus().isOk()
			.expectBody().toString().equals(SecurityController.PERMIT_ALL);
	}

	@Test
	public void get_permitAll_pubSession_withCsrf_OK() {

		webTestClient.get()
			.uri(SECURITY_API_URI + "/permit-all")
			.cookie(SESSION_COOKIE_NAME, pubSessionId)
			.header(SESSION_CSRF_HEADER_KEY, pubCsrfToken)
			.exchange()
			.expectStatus().isOk()
			.expectBody().toString().equals(SecurityController.PERMIT_ALL);
	}

	@Test
	public void get_permitAll_invalidSession_UNAUTHORIZED() {

		String invalidSessionId = "INVALID-SESSION-ID";

		webTestClient.get()
			.uri(SECURITY_API_URI + "/permit-all")
			.cookie(SESSION_COOKIE_NAME, invalidSessionId)
			.header(SESSION_CSRF_HEADER_KEY, pubCsrfToken)
			.exchange()
			.expectStatus().isUnauthorized()
			.expectBody()
			.jsonPath("$.type").isEqualTo("AuthenticationException")
			.jsonPath("$.message").isEqualTo("UNAUTHORIZED")
			.jsonPath("$.timestamp").exists();
	}

	@Test
	public void get_permitAll_pubSession_invalidCsrf_UNAUTHORIZED() {

		String invalidCsrfToken = "INVALID-CSRF-TOKEN";

		webTestClient.get()
			.uri(SECURITY_API_URI + "/permit-all")
			.cookie(SESSION_COOKIE_NAME, pubSessionId)
			.header(SESSION_CSRF_HEADER_KEY, invalidCsrfToken)
			.exchange()
			.expectStatus().isUnauthorized()
			.expectBody()
			.jsonPath("$.type").isEqualTo("AuthenticationException")
			.jsonPath("$.message").isEqualTo("UNAUTHORIZED")
			.jsonPath("$.timestamp").exists();
	}

	@Test
	public void get_permitAll_activeSession_noCsrf_UNAUTHORIZED() {

		webTestClient.get()
			.uri(SECURITY_API_URI + "/permit-all")
			.cookie(SESSION_COOKIE_NAME, activeCsrfToken)
			.exchange()
			.expectStatus().isUnauthorized()
			.expectBody()
			.jsonPath("$.type").isEqualTo("AuthenticationException")
			.jsonPath("$.message").isEqualTo("UNAUTHORIZED")
			.jsonPath("$.timestamp").exists();
	}

	@Test
	public void get_permitAll_activeSession_invalidCsrf_UNAUTHORIZED() {

		String invalidCsrfToken = "INVALID-CSRF-TOKEN";

		webTestClient.get()
			.uri(SECURITY_API_URI + "/permit-all")
			.cookie(SESSION_COOKIE_NAME, activeCsrfToken)
			.header(SESSION_CSRF_HEADER_KEY, invalidCsrfToken)
			.exchange()
			.expectStatus().isUnauthorized()
			.expectBody()
			.jsonPath("$.type").isEqualTo("AuthenticationException")
			.jsonPath("$.message").isEqualTo("UNAUTHORIZED")
			.jsonPath("$.timestamp").exists();
	}

	@Test
	public void get_permitAll_activeSession_withCsrf_OK() {

		webTestClient.get()
			.uri(SECURITY_API_URI + "/permit-all")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.exchange()
			.expectStatus().isOk()
			.expectBody().toString().equals(SecurityController.PERMIT_ALL);
	}

	@Test
	public void get_userOnly_noSession_noCsrf_FORBIDDEN() {
		webTestClient.get()
			.uri(SECURITY_API_URI + "/user-only")
			.exchange()
			.expectStatus().isForbidden();
	}

	@Test
	public void get_userOnly_noSession_withCsrf_UNAUTHORIZED() {
		webTestClient.get()
			.uri(SECURITY_API_URI + "/user-only")
			.header(SESSION_CSRF_HEADER_KEY, pubCsrfToken)
			.exchange()
			.expectStatus().isUnauthorized()
			.expectBody()
			.jsonPath("$.type").isEqualTo("AuthenticationException")
			.jsonPath("$.message").isEqualTo("UNAUTHORIZED")
			.jsonPath("$.timestamp").exists();
	}

	@Test
	public void get_userOnly_pubSession_noCsrf_4xx() {
		webTestClient.get()
			.uri(SECURITY_API_URI + "/user-only")
			.cookie(SESSION_COOKIE_NAME, pubSessionId)
			.exchange()
			.expectStatus().is4xxClientError();
	}

	@Test
	public void get_userOnly_pubSession_pubCsrf_4xx() {
		webTestClient.get()
			.uri(SECURITY_API_URI + "/user-only")
			.cookie(SESSION_COOKIE_NAME, pubSessionId)
			.header(SESSION_CSRF_HEADER_KEY, pubCsrfToken)
			.exchange()
			.expectStatus().is4xxClientError();
	}

	@Test
	public void get_userOnly_activeSession_noCsrf_4xx() {
		webTestClient.get()
			.uri(SECURITY_API_URI + "/user-only")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.exchange()
			.expectStatus().is4xxClientError();
	}

	@Test
	public void get_userOnly_activeSession_withCsrf_OK() {
		webTestClient.get()
			.uri(SECURITY_API_URI + "/user-only")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.exchange()
			.expectStatus().isOk();
	}

	@Test
	public void createPost_usingPublicUser_OK() {

		// mock post request
		PostCreateRequest req = new PostCreateRequest();
		req.setUserId(1);
		req.setOwner("ben affleck");
		req.setBody("Another post by ben affleck");

		webTestClient.post()
			.uri(SECURITY_API_URI + "/posts")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(req))
			.exchange()
			.expectStatus().isOk()
			.expectBody().toString().equals(SecurityController.CONGRATS);
	}

	@Test

	public void createPost_usingVeil_OK() {

		// mock post request
		PostCreateRequest req = new PostCreateRequest();
		req.setUserId(2);
		req.setOwner("B-A-T-M-A-N");
		req.setBody("Anonymous post by someone named b.a.t.m.a.n!");

		webTestClient.post()
			.uri(SECURITY_API_URI + "/posts")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(req))
			.exchange()
			.expectStatus().isOk()
			.expectBody().toString().equals(SecurityController.CONGRATS);
	}

	@Test
	public void createPost_usingPublicUser_unmatch_FORBIDDEN() {

		// mock post request
		PostCreateRequest req = new PostCreateRequest();
		req.setUserId(2); // unmatch id
		req.setOwner("ben affleck");
		req.setBody("Body for unmatched");
		webTestClient.post()
			.uri(SECURITY_API_URI + "/posts")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(req))
			.exchange()
			.expectStatus().isForbidden();

		// unmatch owner
		req.setUserId(1);
		req.setOwner("B-A-T-M-A-N");
		webTestClient.post()
			.uri(SECURITY_API_URI + "/posts")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(req))
			.exchange()
			.expectStatus().isForbidden();
	}

	@Test
	public void createPost_usingVeil_unmatch_FORBIDDEN() {

		// mock post request
		PostCreateRequest req = new PostCreateRequest();
		req.setUserId(1); // unmatch id
		req.setOwner("B-A-T-M-A-N");
		req.setBody("Body for unmatched");

		webTestClient.post()
			.uri(SECURITY_API_URI + "/posts")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(req))
			.exchange()
			.expectStatus().isForbidden();


		req.setUserId(2);
		req.setOwner("ben affleck"); // unmatch owner

		webTestClient.post()
			.uri(SECURITY_API_URI + "/posts")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(req))
			.exchange()
			.expectStatus().isForbidden();
	}

	@Test
	public void createPost_nonExisting_FORBIDDEN() {

		int nonExistingId = 999;
		String nonExistingOwner = "NON-EXISTING-OWNER";

		// mock post request
		PostCreateRequest req = new PostCreateRequest();
		req.setUserId(nonExistingId); // non-existing id
		req.setOwner("ben affleck");
		req.setBody("Body for non-existing content");

		webTestClient.post()
			.uri(SECURITY_API_URI + "/posts")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(req))
			.exchange()
			.expectStatus().isForbidden();

		req.setUserId(1);
		req.setOwner(nonExistingOwner); // non-existing owner

		webTestClient.post()
			.uri(SECURITY_API_URI + "/posts")
			.cookie(SESSION_COOKIE_NAME, activeSessionId)
			.header(SESSION_CSRF_HEADER_KEY, activeCsrfToken)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(req))
			.exchange()
			.expectStatus().isForbidden();

	}

	@Test
	public void login_invalidPrincipal_UNAUTHORIZED() {

		String invalidPrincipal = "THIS-IS-NOT-A-VALID-PRINCIPAL";

		LoginReqDTO dto = new LoginReqDTO();
		dto.setPrincipal(invalidPrincipal);
		dto.setPassword(activePassword);

		webTestClient.post()
			.uri(LOGIN_API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isUnauthorized()
			.expectBody()
			.jsonPath("$.type").isEqualTo("AuthenticationException")
			.jsonPath("$.message").isEqualTo("UNAUTHORIZED")
			.jsonPath("$.timestamp").exists();

	}

	@Test
	public void login_invalidPassword_UNAUTHORIZED() {

		String invalidPassword = "THIS-IS-AN-INVALID-PASSWORD";

		LoginReqDTO dto = new LoginReqDTO();
		dto.setPrincipal(activePrincipal);
		dto.setPassword(invalidPassword);

		webTestClient.post()
			.uri(LOGIN_API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isUnauthorized()
			.expectBody()
			.jsonPath("$.type").isEqualTo("AuthenticationException")
			.jsonPath("$.message").isEqualTo("UNAUTHORIZED")
			.jsonPath("$.timestamp").exists();

	}

	@Test
	public void login_OK() {

		LoginReqDTO dto = new LoginReqDTO();
		dto.setPrincipal(activePrincipal);
		dto.setPassword(activePassword);

		webTestClient.post()
			.uri(LOGIN_API_URI)
			.contentType(MediaType.APPLICATION_JSON)
			.body(BodyInserters.fromValue(dto))
			.exchange()
			.expectStatus().isOk()
			.expectHeader().exists(SESSION_CSRF_HEADER_KEY);

	}
}
