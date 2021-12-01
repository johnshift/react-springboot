package dev.johnshift.backend.security;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
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
import dev.johnshift.backend.session.SessionDTO;
import dev.johnshift.backend.session.SessionException;
import dev.johnshift.backend.session.SessionService;
import dev.johnshift.backend.utils.Generator;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.servlet.http.Cookie;
import com.fasterxml.jackson.databind.ObjectMapper;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.cookie;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static dev.johnshift.backend.session.SessionConstants.SESSION_COOKIE_NAME;
import static dev.johnshift.backend.session.SessionConstants.SESSION_CSRF_HEADER_KEY;

@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = SecurityController.class)
public class SecurityTest {

	@MockBean
	PasswordEncoder passwordEncoder;

	@MockBean
	SessionService sessionService;

	@MockBean
	CredentialService credentialService;

	@MockBean
	UserDetailsService userDetailsService;

	@MockBean
	AuthenticationManager authenticationManager;

	@Autowired
	MockMvc mockMvc;

	private SessionDTO sampleSessionDTO = Generator.sessionDTO();
	private String samplePassword = Generator.randomString();

	// get permit-all, no session, no csrf -> OK
	@Test
	public void get_permitAll_noSession_noCsrf_OK() throws Exception {

		// mock session-filter create public session
		when(sessionService.createPublicSession()).thenReturn(sampleSessionDTO);

		// mock csrf-filter getCsrfToken
		String sessionId = sampleSessionDTO.getSessionId();
		String csrfToken = sampleSessionDTO.getCsrfToken();
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(sampleSessionDTO);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(sampleSessionDTO.getPrincipal()))
			.thenReturn(samplePassword);

		mockMvc.perform(get("/api/v1/security/permit-all"))
			.andExpect(status().isOk())
			.andExpect(cookie().value(SESSION_COOKIE_NAME, sampleSessionDTO.getSessionId()))
			.andExpect(cookie().httpOnly(SESSION_COOKIE_NAME, true))
			.andExpect(cookie().maxAge(SESSION_COOKIE_NAME, 60 * 60))
			.andExpect(content().string(SecurityController.PERMIT_ALL));
	}

	// get permit-all, pub-session, no csrf -> OK
	@Test
	public void get_permitAll_pubSession_noCsrf_OK() throws Exception {

		// mock public session
		String sessionId = Generator.uuid().toString();
		String csrfToken = Generator.uuid().toString();
		String principal = Generator.randomString();
		SessionDTO pubSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			Collections.emptyList());

		// mock session-filter create public session
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(sampleSessionDTO.getPrincipal()))
			.thenReturn(samplePassword);

		// mock pub-session cookie
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		mockMvc.perform(
			get("/api/v1/security/permit-all")
				.cookie(pubSessionCookie))
			// note: sending back the cookie is browser behaviour -> no need to test returned cookie
			.andExpect(status().isOk())
			.andExpect(content().string(SecurityController.PERMIT_ALL));
	}

	// get permit-all, pub-session, w/ csrf -> OK
	@Test
	public void get_permitAll_pubSession_withCsrf_OK() throws Exception {

		// mock public session
		String sessionId = Generator.uuid().toString();
		String csrfToken = Generator.uuid().toString();
		String principal = Generator.randomString();
		SessionDTO pubSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			Collections.emptyList());

		// mock session-filter create public session
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(sampleSessionDTO.getPrincipal()))
			.thenReturn(samplePassword);

		// mock pub-session cookie
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		mockMvc.perform(
			get("/api/v1/security/permit-all")
				.cookie(pubSessionCookie)
				.header(SESSION_CSRF_HEADER_KEY, csrfToken))
			// note: sending back the cookie is browser behaviour -> no need to test returned cookie
			.andExpect(status().isOk())
			.andExpect(content().string(SecurityController.PERMIT_ALL));
	}

	// get permit-all, invalid session-id -> Unauthorized
	@Test
	public void get_permitAll_invalidSession_Unauthorized() throws Exception {

		// mock invalid sessionId;
		String invalidSessionId = "SOME-INVALID-SESSION-ID";

		// mock session cookie
		Cookie invalidSessionCookie = new Cookie(SESSION_COOKIE_NAME, invalidSessionId);
		invalidSessionCookie.setMaxAge(60 * 60);
		invalidSessionCookie.setHttpOnly(true);

		// mock session-filter get by session-id call
		when(sessionService.getSessionBySessionId(invalidSessionId)).thenThrow(SessionException.notFound());

		mockMvc.perform(
			get("/api/v1/security/permit-all")
				.cookie(invalidSessionCookie))
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.type").value("AuthenticationException"))
			.andExpect(jsonPath("$.message").value("UNAUTHORIZED"))
			.andExpect(jsonPath("$.timestamp").exists());
	}

	// get permit-all, pub-session, invalid csrf -> Unauthorized
	@Test
	public void get_permitAll_pubSession_invalidCsrf_Unauthorized() throws Exception {

		// mock public session
		String sessionId = Generator.uuid().toString();
		String csrfToken = Generator.uuid().toString();
		String invalidCsrfToken = "THIS IS NOT A VALID CSRF-TOKEN";
		String principal = Generator.randomString();
		SessionDTO pubSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			Collections.emptyList());

		// mock session-filter create public session
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock pub-session cookie
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		mockMvc.perform(
			get("/api/v1/security/permit-all")
				.cookie(pubSessionCookie)
				.header(SESSION_CSRF_HEADER_KEY, invalidCsrfToken))
			// note: sending back the cookie is browser behaviour -> no need to test returned cookie
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.type").value("AuthenticationException"))
			.andExpect(jsonPath("$.message").value("UNAUTHORIZED"))
			.andExpect(jsonPath("$.timestamp").exists());
	}

	// get permit-all, active-session, no-csrf -> Unauthorized
	@Test
	public void get_permitAll_activeSession_noCsrf_Unauthorized() throws Exception {

		// mock active session
		String sessionId = Generator.uuid().toString();
		String csrfToken = Generator.uuid().toString();
		String principal = Generator.randomString();
		// active sessions are assign ROLE_USER in authority
		List<String> authorities = List.of("ROLE_USER");
		SessionDTO activeSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			authorities);

		// mock active-session cookie
		Cookie activeSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		activeSessionCookie.setMaxAge(60 * 60);
		activeSessionCookie.setHttpOnly(true);

		// mock session-filter create public session
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(activeSession);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		mockMvc.perform(
			get("/api/v1/security/permit-all")
				.cookie(activeSessionCookie))
			// note: sending back the cookie is browser behaviour -> no need to test returned cookie
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.type").value("AuthenticationException"))
			.andExpect(jsonPath("$.message").value("UNAUTHORIZED"))
			.andExpect(jsonPath("$.timestamp").exists());
	}

	// get permit-all, active-cession, invalid csrf -> Unauthorized
	@Test
	public void get_permitAll_activeSession_invalidCsrf_Unauthorized() throws Exception {

		// mock active session
		String sessionId = Generator.uuid().toString();
		String csrfToken = Generator.uuid().toString();
		String invalidCsrfToken = "THIS IS INVALID CSRF-TOKEN";
		String principal = Generator.randomString();
		// active sessions are assign ROLE_USER in authority
		List<String> authorities = List.of("ROLE_USER");
		SessionDTO activeSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			authorities);

		// mock active-session cookie
		Cookie activeSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		activeSessionCookie.setMaxAge(60 * 60);
		activeSessionCookie.setHttpOnly(true);

		// mock session-filter create public session
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(activeSession);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		mockMvc.perform(
			get("/api/v1/security/permit-all")
				.cookie(activeSessionCookie)
				.header(SESSION_CSRF_HEADER_KEY, invalidCsrfToken))
			// note: sending back the cookie is browser behaviour -> no need to test returned cookie
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.type").value("AuthenticationException"))
			.andExpect(jsonPath("$.message").value("UNAUTHORIZED"))
			.andExpect(jsonPath("$.timestamp").exists());
	}

	// get permit-all, active-session, with csrf -> OK
	@Test
	public void get_permitAll_activeSession_withCsrf_OK() throws Exception {

		// mock public session
		String sessionId = Generator.uuid().toString();
		String csrfToken = Generator.uuid().toString();
		String principal = Generator.randomString();
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

		// mock pub-session cookie
		Cookie activeSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		activeSessionCookie.setMaxAge(60 * 60);
		activeSessionCookie.setHttpOnly(true);

		mockMvc.perform(
			get("/api/v1/security/permit-all")
				.cookie(activeSessionCookie)
				.header(SESSION_CSRF_HEADER_KEY, csrfToken))
			// note: sending back the cookie is browser behaviour -> no need to test returned cookie
			.andExpect(status().isOk())
			.andExpect(content().string(SecurityController.PERMIT_ALL));


		/** Todo:
		 * <p>
		 * How to generalize Roles, Authorities data structure
		 * <p>
		 * AuthenticationFilter vs UserDetailsService
		 * <p>
		 * Whether to use Authentication manager in AuthenticationFilter */
	}

	// login, valid username, valid password -> OK
	@Test
	public void login_validUsername_validPassword_OK() throws Exception {

		// mock login request payload
		String username = Generator.randomString();
		String password = Generator.randomString();
		LoginReqDTO loginReq = new LoginReqDTO();
		loginReq.setPrincipal(username);
		loginReq.setPassword(password);
		ObjectMapper objectMapper = new ObjectMapper();
		String payload = objectMapper.writeValueAsString(loginReq);

		// mock public session
		String sessionId = Generator.uuid().toString();
		String csrfToken = Generator.uuid().toString();
		String principal = Generator.randomString();
		SessionDTO pubSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			Collections.emptyList());

		// mock session-filter create public session
		when(sessionService.createPublicSession()).thenReturn(pubSession);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(username))
			.thenReturn(password);

		// mock authentication manager authenticate
		Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
		grantedAuthorities.addAll(Roles.USER.getGrantedAuthorities());
		Authentication userPassToken = new UsernamePasswordAuthenticationToken(
			principal, samplePassword, grantedAuthorities);
		when(authenticationManager.authenticate(any())).thenReturn(userPassToken);

		// mock promote promote session
		SessionDTO promotedSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			Roles.USER.getAuthoritiesAsString());
		when(sessionService.promotePublicSession(sessionId, principal)).thenReturn(promotedSession);

		mockMvc.perform(
			post("/api/v1/login")
				.contentType(MediaType.APPLICATION_JSON.getType())
				.content(payload))
			.andExpect(status().isOk())
			.andExpect(header().string(SESSION_CSRF_HEADER_KEY, csrfToken));
	}


	// login, valid email, valid password -> OK
	// login, invalid principal -> Unauthorized
	// login, incorrect password -> Unauthorized

	// user-only, no session, no csrf -> unauthorized
	// user-only, no session, w/ csrf -> unauthorized
	// user-only , pub-session, no csrf -> unauthorized
	// user-only, pub-session, w/ csrf -> unauthorized
	// user-only, active-session no csrf -> unauthorized
	// user-only, active-session, w/ csrf, null password -> Unauthorized
	// user-only, active-session, w/ csrf, ok password -> OK

	// get post-1-write, no session -> unauthorized
	// get post-1-write, pub session -> unauthorized
	// get post-1-write, active session + csrf, null pass, no role_user, no_post-1-write -> unauthorized
	// get post-1-write, active session, w/ csrf, no pass, no role_user, no_post-1-write -> unauthorized
}
