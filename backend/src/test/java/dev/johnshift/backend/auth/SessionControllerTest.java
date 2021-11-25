package dev.johnshift.backend.auth;

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
import dev.johnshift.backend.session.SessionController;
import dev.johnshift.backend.session.SessionDTO;
import dev.johnshift.backend.session.SessionRepository;
import dev.johnshift.backend.session.SessionService;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;

import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;

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

	private final String sampleSessionId = UUID.randomUUID().toString();
	private final String sampleCsrfToken = UUID.randomUUID().toString();
	private final SessionDTO sampleSessionDTO = new SessionDTO(sampleSessionId, sampleCsrfToken);

	@Test
	public void get_csrftoken_OK() throws Exception {

		// mock create session returns sample session dto
		when(sessionService.getCsrfTokenFromHttpRequest(any())).thenReturn(sampleCsrfToken);

		// mock calls from SessionFilter creating public session
		when(sessionService.createSession(false)).thenReturn(sampleSessionDTO);

		// mock calls from CsrfFilter retrieving csrfToken
		when(sessionService.getCsrfToken(sampleSessionId)).thenReturn(sampleCsrfToken);

		mockMvc.perform(get("/csrf-token"))
			.andExpect(status().isOk())
			.andExpect(cookie().value(SESSION_COOKIE_NAME, sampleSessionId))
			.andExpect(cookie().httpOnly(SESSION_COOKIE_NAME, true))
			.andExpect(cookie().maxAge(SESSION_COOKIE_NAME, 60 * 60))
			.andExpect(content().string(sampleCsrfToken));
	}

	@Test
	public void get_csrftoken_with_session_OK() throws Exception {

		// mock create session returns sample session dto
		when(sessionService.getCsrfTokenFromHttpRequest(any())).thenReturn(sampleCsrfToken);

		// mock calls from SessionFilter creating public session
		when(sessionService.createSession(false)).thenReturn(sampleSessionDTO);

		// mock calls from CsrfFilter retrieving csrfToken
		when(sessionService.getCsrfToken(sampleSessionId)).thenReturn(sampleCsrfToken);

		// mock active session cookie
		Cookie sessionCookie = new Cookie(SESSION_COOKIE_NAME, sampleSessionId);
		sessionCookie.setMaxAge(60 * 60);
		sessionCookie.setHttpOnly(true);

		mockMvc.perform(get("/csrf-token")
			.cookie(sessionCookie))
			.andExpect(status().isOk())
			.andExpect(cookie().value(SESSION_COOKIE_NAME, sampleSessionId))
			.andExpect(cookie().httpOnly(SESSION_COOKIE_NAME, true))
			.andExpect(cookie().maxAge(SESSION_COOKIE_NAME, 60 * 60))
			.andExpect(content().string(sampleCsrfToken));
	}

	@Test
	public void get_csrftoken_nonExisting_session_OK() throws Exception {

		// mock create session returns sample session dto
		when(sessionService.getCsrfTokenFromHttpRequest(any())).thenReturn(sampleCsrfToken);

		// mock calls from SessionFilter creating public session
		when(sessionService.createSession(false)).thenReturn(sampleSessionDTO);

		// mock calls from CsrfFilter retrieving csrfToken
		when(sessionService.getCsrfToken(sampleSessionId)).thenReturn(sampleCsrfToken);

		// mock non-Existing public session cookie
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, "NON-EXISTING-ACTIVE-SESSIONID");
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		mockMvc.perform(get("/csrf-token"))
			.andExpect(status().isOk())
			.andExpect(cookie().value(SESSION_COOKIE_NAME, sampleSessionId))
			.andExpect(cookie().httpOnly(SESSION_COOKIE_NAME, true))
			.andExpect(cookie().maxAge(SESSION_COOKIE_NAME, 60 * 60))
			.andExpect(content().string(sampleCsrfToken));
	}
}
