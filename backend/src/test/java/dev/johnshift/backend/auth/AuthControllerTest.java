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
import static org.mockito.ArgumentMatchers.anyBoolean;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import static dev.johnshift.backend.auth.AuthController.SESSION_COOKIE_NAME;

import java.util.UUID;

import javax.servlet.http.Cookie;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = AuthController.class)
public class AuthControllerTest {

	@MockBean
	PasswordEncoder passwordEncoder;

	@MockBean
	AuthSessionRepository sessionRepo;

	@MockBean
	AuthService authService;

	@MockBean
	UserDetailsService userDetailsService;

	@MockBean
	AuthenticationManager authenticationManager;

	@Autowired
	MockMvc mockMvc;

	private final String sampleSessionId = UUID.randomUUID().toString();
	private final String sampleCsrfToken = UUID.randomUUID().toString();
	private final AuthCsrfDTO sampleCsrfDTO = new AuthCsrfDTO(sampleCsrfToken);
	private final AuthSessionDTO sampleSessionDTO = new AuthSessionDTO(sampleSessionId, sampleCsrfToken);

	@Test
	public void get_csrftoken_OK() throws Exception {

		// mock create session returns sample session dto
		when(authService.createSession(anyBoolean())).thenReturn(sampleSessionDTO);

		mockMvc.perform(get("/csrf-token"))
			.andExpect(status().isOk())
			.andExpect(cookie().value(SESSION_COOKIE_NAME, sampleSessionId))
			.andExpect(cookie().httpOnly(SESSION_COOKIE_NAME, true))
			.andExpect(cookie().maxAge(SESSION_COOKIE_NAME, 60 * 60))
			.andExpect(jsonPath("$.token").value(sampleCsrfToken));
	}

	@Test
	public void get_csrftoken_with_session_OK() throws Exception {

		// mock service call returns csrfDTO
		when(authService.getCsrfToken(anyString())).thenReturn(sampleCsrfDTO);

		// mock active session cookie
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, sampleSessionId);
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		mockMvc.perform(get("/csrf-token").cookie(pubSessionCookie))
			.andExpect(status().isOk())
			.andExpect(jsonPath("$.token").value(sampleCsrfToken));

		// note: no need to check if cookie is sent back as response (it is default behaviour by browsers)
	}

	@Test
	public void get_csrftoken_nonExisting_session_OK() throws Exception {

		// mock any calls by getting session should return null for non-existing session
		when(authService.getCsrfToken(anyString())).thenReturn(null);

		// mock create session returns sample session dto
		when(authService.createSession(anyBoolean())).thenReturn(sampleSessionDTO);

		// mock non-Existing public session cookie
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, "NON-EXISTING-ACTIVE-SESSIONID");
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		mockMvc.perform(get("/csrf-token"))
			.andExpect(status().isOk())
			.andExpect(cookie().value(SESSION_COOKIE_NAME, sampleSessionId))
			.andExpect(cookie().httpOnly(SESSION_COOKIE_NAME, true))
			.andExpect(cookie().maxAge(SESSION_COOKIE_NAME, 60 * 60))
			.andExpect(jsonPath("$.token").value(sampleCsrfToken));
	}
}
