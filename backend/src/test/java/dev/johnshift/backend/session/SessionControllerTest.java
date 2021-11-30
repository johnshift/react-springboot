package dev.johnshift.backend.session;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.Cookie;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = SessionController.class)
public class SessionControllerTest {

	@MockBean
	PasswordEncoder passwordEncoder;

	@MockBean
	SessionRepository sessionRepo;

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
	public void get_csrftoken_with_session_OK() throws Exception {

		// mock active session cookie
		Cookie sessionCookie = new Cookie(SESSION_COOKIE_NAME, sampleSessionId);
		sessionCookie.setMaxAge(60 * 60);
		sessionCookie.setHttpOnly(true);

		// mock create session returns sample session dto
		when(sessionService.getCsrfToken(any())).thenReturn(sampleCsrfToken);

		// mock calls from SessionFilter session lookup
		when(sessionService.getSessionBySessionId(sampleSessionId)).thenReturn(sampleSessionDTO);

		// mock calls from CsrfFilter retrieving csrfToken
		when(sessionService.getCsrfToken(sampleSessionId)).thenReturn(sampleCsrfToken);

		mockMvc.perform(get(SESSION_CSRF_TOKEN_URL)
			.cookie(sessionCookie))
			.andExpect(status().isOk())
			.andExpect(content().string(sampleCsrfToken));
	}

	@Test
	public void get_csrftoken_nonExisting_session_OK() throws Exception {

		// mock create session returns sample session dto
		when(sessionService.getCsrfToken(any())).thenReturn(sampleCsrfToken);

		// mock calls from SessionFilter creating public session
		when(sessionService.createPublicSession()).thenReturn(sampleSessionDTO);

		// mock calls from CsrfFilter retrieving csrfToken
		when(sessionService.getCsrfToken(sampleSessionId)).thenReturn(sampleCsrfToken);

		// mock non-Existing public session cookie
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, "NON-EXISTING-ACTIVE-SESSIONID");
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		mockMvc.perform(get(SESSION_CSRF_TOKEN_URL))
			.andExpect(status().isOk())
			.andExpect(cookie().value(SESSION_COOKIE_NAME, sampleSessionId))
			.andExpect(cookie().httpOnly(SESSION_COOKIE_NAME, true))
			.andExpect(cookie().maxAge(SESSION_COOKIE_NAME, 60 * 60))
			.andExpect(content().string(sampleCsrfToken));
	}
}
