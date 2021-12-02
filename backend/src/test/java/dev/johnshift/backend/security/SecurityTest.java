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
		String password = Generator.randomString();
		SessionDTO pubSession = new SessionDTO(
			sessionId,
			csrfToken,
			principal,
			Collections.emptyList());
		Authentication publicAuth = Generator.userPassToken(principal, password);

		// mock session-filter create public session
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSession);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(sampleSessionDTO.getPrincipal()))
			.thenReturn(samplePassword);

		// mock authenticationManager
		when(authenticationManager.authenticate(any())).thenReturn(publicAuth);

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

	// get permit-all, active-session, invalid csrf -> Unauthorized
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

		// mock active-session cookie
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
	}

	// login, valid principal, valid password -> OK
	@Test
	public void login_validPrincipal_validPassword_OK() throws Exception {

		// mock login request payload
		String principal = Generator.randomString();
		String password = Generator.randomString();
		LoginReqDTO loginReq = new LoginReqDTO();
		loginReq.setPrincipal(principal);
		loginReq.setPassword(password);
		ObjectMapper objectMapper = new ObjectMapper();
		String payload = objectMapper.writeValueAsString(loginReq);

		// mock public session
		SessionDTO pubSessionDTO = Generator.pubSessionDTO();
		String sessionId = pubSessionDTO.getSessionId();
		String csrfToken = pubSessionDTO.getCsrfToken();

		// mock session-filter create public session
		when(sessionService.createPublicSession()).thenReturn(pubSessionDTO);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId))
			.thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSessionDTO);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(password);

		// mock authentication manager authenticate
		Authentication userPassToken = Generator.userRoleAuth(principal, password);
		when(authenticationManager.authenticate(any())).thenReturn(userPassToken);

		// mock promote promote session
		SessionDTO promotedSession = Generator.promotedSessionDTO(sessionId, csrfToken, principal);
		when(sessionService.promotePublicSession(sessionId, principal))
			.thenReturn(promotedSession);

		mockMvc.perform(
			post("/api/v1/login")
				.contentType(MediaType.APPLICATION_JSON.getType())
				.content(payload))
			.andExpect(status().isOk())
			.andExpect(header().string(SESSION_CSRF_HEADER_KEY, csrfToken));
	}

	// login, invalid principal -> Unauthorized
	@Test
	public void login_invalidPrincipal_UNAUTHORIZED() throws Exception {

		// mock login request payload
		String invalidPrincipal = "THIS IS AN INVALID PRINCIPAL";
		String password = Generator.randomString();
		LoginReqDTO loginReq = new LoginReqDTO();
		loginReq.setPrincipal(invalidPrincipal);
		loginReq.setPassword(password);
		ObjectMapper objectMapper = new ObjectMapper();
		String payload = objectMapper.writeValueAsString(loginReq);

		// mock public session auto-generated by session filter
		SessionDTO pubSessionDTO = Generator.pubSessionDTO();
		String sessionId = pubSessionDTO.getSessionId();
		String csrfToken = pubSessionDTO.getCsrfToken();

		// mock session-filter create public session
		when(sessionService.createPublicSession()).thenReturn(pubSessionDTO);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId))
			.thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSessionDTO);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(invalidPrincipal))
			.thenReturn(null);

		// mock authentication manager throwing exception
		when(authenticationManager.authenticate(any()))
			.thenThrow(new AuthException("Incorrect username/email or password"));

		mockMvc.perform(
			post("/api/v1/login")
				.contentType(MediaType.APPLICATION_JSON.getType())
				.content(payload))
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.type").value("AuthenticationException"))
			.andExpect(jsonPath("$.message").value("UNAUTHORIZED"))
			.andExpect(jsonPath("$.timestamp").exists());
	}

	// login, incorrect password -> Unauthorized
	@Test
	public void login_invalidPassword_UNAUTHORIZED() throws Exception {

		// mock login request payload
		String principal = Generator.randomString();
		String invalidPassword = "THIS IS AN INVALID PASSWORD";
		LoginReqDTO loginReq = new LoginReqDTO();
		loginReq.setPrincipal(principal);
		loginReq.setPassword(invalidPassword);
		ObjectMapper objectMapper = new ObjectMapper();
		String payload = objectMapper.writeValueAsString(loginReq);

		// mock public session auto-generated by session filter
		SessionDTO pubSessionDTO = Generator.pubSessionDTO();
		String sessionId = pubSessionDTO.getSessionId();
		String csrfToken = pubSessionDTO.getCsrfToken();

		// mock session-filter create public session
		when(sessionService.createPublicSession()).thenReturn(pubSessionDTO);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId))
			.thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(pubSessionDTO);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(null);

		// mock authentication manager throwing exception
		when(authenticationManager.authenticate(any()))
			.thenThrow(new AuthException("Incorrect username/email or password"));

		mockMvc.perform(
			post("/api/v1/login")
				.contentType(MediaType.APPLICATION_JSON.getType())
				.content(payload))
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.type").value("AuthenticationException"))
			.andExpect(jsonPath("$.message").value("UNAUTHORIZED"))
			.andExpect(jsonPath("$.timestamp").exists());
	}

	// user-only, no session, no csrf -> Forbidden
	@Test
	public void userOnly_noSession_noCsrf_FORBIDDEN() throws Exception {


		SessionDTO publicSessionDTO = Generator.pubSessionDTO();
		String sessionId = publicSessionDTO.getSessionId();
		String csrfToken = publicSessionDTO.getCsrfToken();
		String principal = publicSessionDTO.getPrincipal();
		String password = Generator.genString();
		Authentication userPassToken = Generator.userPassToken(principal, password);

		// mock public session
		when(sessionService.createPublicSession()).thenReturn(publicSessionDTO);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(publicSessionDTO);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(password);

		// mock authenticationManager authenticate
		when(authenticationManager.authenticate(any())).thenReturn(userPassToken);

		mockMvc.perform(
			get("/api/v1/security/user-only"))
			.andExpect(status().isForbidden());
	}

	// user-only, no session, w/ csrf -> Forbidden
	@Test
	public void userOnly_noSession_withCsrf_FORBIDDEN() throws Exception {


		SessionDTO publicSessionDTO = Generator.pubSessionDTO();
		String sessionId = publicSessionDTO.getSessionId();
		String csrfToken = publicSessionDTO.getCsrfToken();
		String principal = publicSessionDTO.getPrincipal();
		String password = Generator.genString();
		Authentication userPassToken = Generator.userPassToken(principal, password);

		// mock public session
		when(sessionService.createPublicSession()).thenReturn(publicSessionDTO);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(publicSessionDTO);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(password);

		// mock authenticationManager authenticate
		when(authenticationManager.authenticate(any())).thenReturn(userPassToken);

		mockMvc.perform(
			get("/api/v1/security/user-only")
				.header(SESSION_CSRF_HEADER_KEY, csrfToken))
			.andExpect(status().isForbidden());
	}

	// user-only , pub-session, no csrf -> Forbidden
	@Test
	public void userOnly_pubSession_noCsrf_FORBIDDEN() throws Exception {


		SessionDTO publicSessionDTO = Generator.pubSessionDTO();
		String sessionId = publicSessionDTO.getSessionId();
		String csrfToken = publicSessionDTO.getCsrfToken();
		String principal = publicSessionDTO.getPrincipal();
		String password = Generator.genString();
		Authentication userPassToken = Generator.userPassToken(principal, password);
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		// mock public session
		when(sessionService.createPublicSession()).thenReturn(publicSessionDTO);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(publicSessionDTO);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(password);

		// mock authenticationManager authenticate
		when(authenticationManager.authenticate(any())).thenReturn(userPassToken);

		mockMvc.perform(
			get("/api/v1/security/user-only")
				.cookie(pubSessionCookie))
			.andExpect(status().isForbidden());
	}

	// user-only, pub-session, w/ csrf -> Forbidden
	@Test
	public void userOnly_pubSession_withCsrf_FORBIDDEN() throws Exception {


		SessionDTO publicSessionDTO = Generator.pubSessionDTO();
		String sessionId = publicSessionDTO.getSessionId();
		String csrfToken = publicSessionDTO.getCsrfToken();
		String principal = publicSessionDTO.getPrincipal();
		String password = Generator.genString();
		Authentication userPassToken = Generator.userPassToken(principal, password);
		Cookie pubSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		pubSessionCookie.setMaxAge(60 * 60);
		pubSessionCookie.setHttpOnly(true);

		// mock public session
		when(sessionService.createPublicSession()).thenReturn(publicSessionDTO);

		// mock csrf-filter getCsrfToken
		when(sessionService.getCsrfToken(sessionId)).thenReturn(csrfToken);

		// mock authentication-filter getSessionBySessionId
		when(sessionService.getSessionBySessionId(sessionId)).thenReturn(publicSessionDTO);

		// mock authentication-filter retrieve password by principal
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(password);

		// mock authenticationManager authenticate
		when(authenticationManager.authenticate(any())).thenReturn(userPassToken);

		mockMvc.perform(
			get("/api/v1/security/user-only")
				.cookie(pubSessionCookie)
				.header(SESSION_CSRF_HEADER_KEY, csrfToken))
			.andExpect(status().isForbidden());
	}

	// user-only, active-session no csrf -> unauthorized
	@Test
	public void userOnly_activeSession_noCsrf_UNAUTHORIZED() throws Exception {

		SessionDTO activeSession = Generator.activeSessionDTO();
		String sessionId = activeSession.getSessionId();
		String csrfToken = activeSession.getCsrfToken();
		String principal = activeSession.getPrincipal();
		String password = Generator.randomString();
		Cookie activeSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		activeSessionCookie.setMaxAge(60 * 60);
		activeSessionCookie.setHttpOnly(true);
		Authentication finalAuth = Generator.userRoleAuth(principal, password);

		// mock session-filter retrieve session from db
		when(sessionService.getSessionBySessionId(sessionId))
			.thenReturn(activeSession);

		// mock csrf-filter retrieve csrfToken from db
		when(sessionService.getCsrfToken(sessionId))
			.thenReturn(csrfToken);

		// mock authentication-filter
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(password);

		// mock authenticationManager
		when(authenticationManager.authenticate(any())).thenReturn(finalAuth);


		mockMvc.perform(
			get("/api/v1/security/user-only")
				.cookie(activeSessionCookie))
			// note: no csrf-token
			.andExpect(status().isUnauthorized())
			.andExpect(jsonPath("$.type").value("AuthenticationException"))
			.andExpect(jsonPath("$.message").value("UNAUTHORIZED"))
			.andExpect(jsonPath("$.timestamp").exists());
	}

	// user-only, active-session, w/ csrf, null password -> Forbidden
	@Test
	public void userOnly_activeSession_withCsrf_nullPassword_FORBIDDEN() throws Exception {

		SessionDTO activeSession = Generator.activeSessionDTO();
		String sessionId = activeSession.getSessionId();
		String csrfToken = activeSession.getCsrfToken();
		String principal = activeSession.getPrincipal();
		Cookie activeSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		activeSessionCookie.setMaxAge(60 * 60);
		activeSessionCookie.setHttpOnly(true);

		// mock session-filter retrieve session from db
		when(sessionService.getSessionBySessionId(sessionId))
			.thenReturn(activeSession);

		// mock csrf-filter retrieve csrfToken from db
		when(sessionService.getCsrfToken(sessionId))
			.thenReturn(csrfToken);

		// mock authentication-filter: notice null returned
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(null);

		// mock authenticationManager
		when(authenticationManager.authenticate(any()))
			.thenThrow(new AuthException("Incorrect username/email or password"));


		mockMvc.perform(
			get("/api/v1/security/user-only")
				.cookie(activeSessionCookie)
				.header(SESSION_CSRF_HEADER_KEY, csrfToken))
			.andExpect(status().isForbidden());
	}

	// user-only, active-session, w/ csrf, ok password -> OK
	@Test
	public void userOnly_activeSession_withCsrf_withPassword_FORBIDDEN() throws Exception {

		SessionDTO activeSession = Generator.activeSessionDTO();
		String sessionId = activeSession.getSessionId();
		String csrfToken = activeSession.getCsrfToken();
		String principal = activeSession.getPrincipal();
		Cookie activeSessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
		activeSessionCookie.setMaxAge(60 * 60);
		activeSessionCookie.setHttpOnly(true);
		String password = Generator.randomString();
		Authentication finalAuth = Generator.userRoleAuth(principal, password);

		// mock session-filter retrieve session from db
		when(sessionService.getSessionBySessionId(sessionId))
			.thenReturn(activeSession);

		// mock csrf-filter retrieve csrfToken from db
		when(sessionService.getCsrfToken(sessionId))
			.thenReturn(csrfToken);

		// mock authentication-filter: notice null returned
		when(credentialService.getPasswordByPrincipalOrNull(principal))
			.thenReturn(password);

		// mock authenticationManager
		when(authenticationManager.authenticate(any())).thenReturn(finalAuth);

		mockMvc.perform(
			get("/api/v1/security/user-only")
				.cookie(activeSessionCookie)
				.header(SESSION_CSRF_HEADER_KEY, csrfToken))
			.andExpect(status().isOk())
			.andExpect(content().string(SecurityController.USER_ONLY));
	}

	// get post-1-write, no session -> unauthorized
	// get post-1-write, pub session -> unauthorized
	// get post-1-write, active session + csrf, null pass, no role_user, no_post-1-write -> unauthorized
	// get post-1-write, active session, w/ csrf, no pass, no role_user, no_post-1-write -> unauthorized
}
