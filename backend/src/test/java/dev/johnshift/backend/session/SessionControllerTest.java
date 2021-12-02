package dev.johnshift.backend.session;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import dev.johnshift.backend.constants.Roles;
import dev.johnshift.backend.credential.CredentialService;
import dev.johnshift.backend.utils.Generator;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;
import static dev.johnshift.backend.session.SessionConstants.SESSION_CSRF_HEADER_KEY;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.Cookie;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = SessionController.class)
public class SessionControllerTest {

	@MockBean
	PasswordEncoder passwordEncoder;

	@MockBean
	CredentialService credentialService;

	@MockBean
	SessionService sessionService;

	@MockBean
	UserDetailsService userDetailsService;

	@MockBean
	AuthenticationManager authenticationManager;

	@Autowired
	MockMvc mockMvc;

	private final String SESSION_CSRF_TOKEN_URL = "/api/v1/session/csrf-token";
	private final String sampleSessionId = UUID.randomUUID().toString();
	private final String sampleCsrfToken = UUID.randomUUID().toString();
	private final String samplePrincipal = "some_principal";
	private final List<String> sampleAuthorities = Arrays.asList("ROLE_1", "ROLE_2");
	private final SessionDTO sampleSessionDTO = new SessionDTO(
		sampleSessionId, sampleCsrfToken, samplePrincipal, sampleAuthorities);

	// @BeforeAll
	// void prep() {
	// System.out.println("sampleSessionId: " + sampleSessionId);
	// System.out.println("sampleCsrfToken: " + sampleCsrfToken);
	// }

	@Test
	public void get_csrftoken_auto_public_session_OK() throws Exception {

		// mock create session returns sample session dto
		when(sessionService.getCsrfToken(any())).thenReturn(sampleCsrfToken);

		// mock calls from SessionFilter creating public session
		when(sessionService.createPublicSession()).thenReturn(sampleSessionDTO);

		// mock calls from CsrfFilter retrieving csrfToken
		when(sessionService.getCsrfToken(sampleSessionId)).thenReturn(sampleCsrfToken);

		mockMvc.perform(get(SESSION_CSRF_TOKEN_URL))
			.andExpect(status().isOk())
			.andExpect(cookie().value(SESSION_COOKIE_NAME, sampleSessionId))
			.andExpect(cookie().httpOnly(SESSION_COOKIE_NAME, true))
			.andExpect(cookie().maxAge(SESSION_COOKIE_NAME, 60 * 60))
			.andExpect(content().string(sampleCsrfToken));
	}

	@Test
	public void get_csrftoken_pubSession_OK() throws Exception {

		// mock public session
		String sessionId = Generator.uuid().toString();
		System.out.println("sessionID " + sessionId);
		String csrfToken = Generator.uuid().toString();
		System.out.println("csrfToken " + csrfToken);
		String principal = Generator.randomString();
		System.out.println("principal " + principal);
		SessionDTO pubSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			Collections.emptyList());

		// mock active session cookie
		Cookie sessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		sessionCookie.setMaxAge(60 * 60);
		sessionCookie.setHttpOnly(true);

		// mock create session returns sample session dto
		when(sessionService.getCsrfToken(any())).thenReturn(csrfToken);

		// mock calls from SessionFilter session lookup
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock calls from CsrfFilter retrieving csrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		mockMvc.perform(get(SESSION_CSRF_TOKEN_URL)
			.cookie(sessionCookie))
			.andExpect(status().isOk())
			.andExpect(content().string(csrfToken));
	}

	@Test
	public void get_csrfToken_activeSession_withCsrf_OK() throws Exception {

		// mock public session
		String sessionId = Generator.uuid().toString();
		String csrfToken = Generator.uuid().toString();
		String principal = Generator.randomString();
		String samplePassword = Generator.randomString();
		// active sessions are assign ROLE_USER in authority
		List<String> authorities = List.of("ROLE_USER");
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		grantedAuthorities.addAll(Roles.USER.getGrantedAuthorities());
		SessionDTO activeSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			authorities);

		// mock authentication
		Authentication userPassToken = new UsernamePasswordAuthenticationToken(principal, samplePassword,
			grantedAuthorities);

		// mock session-filter create public session
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(activeSession);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(activeSession);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(activeSession.getPrincipal()))
			.thenReturn(samplePassword);

		// mock authentication manager authenticate
		when(authenticationManager.authenticate(any())).thenReturn(userPassToken);

		// mock active-session cookie
		Cookie activeSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		activeSessionCookie.setMaxAge(60 * 60);
		activeSessionCookie.setHttpOnly(true);

		mockMvc.perform(get(SESSION_CSRF_TOKEN_URL)
			.cookie(activeSessionCookie)
			.header(SESSION_CSRF_HEADER_KEY, csrfToken))
			.andExpect(status().isOk())
			.andExpect(content().string(csrfToken));
	}

	@Test
	public void get_csrftoken_nonExisting_session_UNAUTHORIZED() throws Exception {

		// mock non-Existing public session cookie
		String invalidSessionId = "NON-EXISTING-ACTIVE-SESSIONID";
		Cookie invalidCookie = new Cookie(SESSION_COOKIE_NAME, invalidSessionId);
		invalidCookie.setMaxAge(60 * 60);
		invalidCookie.setHttpOnly(true);

		// mock session-filter get by session-id call
		when(sessionService.getSessionBySessionId(invalidSessionId)).thenThrow(SessionException.notFound());

		mockMvc.perform(
			get(SESSION_CSRF_TOKEN_URL)
				.cookie(invalidCookie))
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.type").value("AuthenticationException"))
			.andExpect(jsonPath("$.message").value("UNAUTHORIZED"))
			.andExpect(jsonPath("$.timestamp").exists());
	}
}
