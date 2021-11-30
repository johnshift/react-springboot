package dev.johnshift.backend.session;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import dev.johnshift.backend.utils.Generator;

@ExtendWith(MockitoExtension.class)
public class SessionServiceImplTest {

	@Mock
	SessionRepository sessionRepository;

	@InjectMocks
	SessionServiceImpl svc;

	private final Session sampleSession = Generator.session();
	private final SessionDTO sampleSessionDTO = SessionDTO.of(sampleSession);
	private final List<Session> sampleExpiredSessions = Arrays.asList(sampleSession);

	@Test
	void create_public_session_OK() {

		// mock active session role_user
		Session session = Generator.session();
		session.setPrincipal("");
		session.setAuthorities(Collections.emptyList());

		// mock repository save
		when(sessionRepository.save(any())).thenReturn(session);

		// call service method
		SessionDTO newSession = svc.createPublicSession();

		// assert
		assertEquals(session.getId().toString(), newSession.getSessionId());
		assertEquals(session.getCsrfToken().toString(), newSession.getCsrfToken());
		assertEquals(session.getPrincipal(), newSession.getPrincipal());
		assertEquals(session.getAuthorities(), newSession.getAuthorities());
	}

	@Test
	void promote_public_session_OK() {

		// mock active session role_user
		UUID sessionId = Generator.uuid();
		String principal = Generator.randomString();

		Session session = Generator.session();
		session.setId(sessionId);
		session.setPrincipal(principal);
		session.setAuthorities(Collections.emptyList());

		// mock repository save
		when(sessionRepository.save(any())).thenReturn(session);

		// call service method
		SessionDTO newSession = svc.promotePublicSession(sessionId.toString(), principal);

		// assert
		assertEquals(session.getId().toString(), newSession.getSessionId());
		assertEquals(session.getCsrfToken().toString(), newSession.getCsrfToken());
		assertEquals(session.getPrincipal(), newSession.getPrincipal());
		assertEquals(session.getAuthorities(), newSession.getAuthorities());
	}

	@Test
	void get_session_by_sessionId_OK() {

		// mock repository call
		UUID sessionId = sampleSession.getId();
		when(sessionRepository.findOneBySessionId(sessionId)).thenReturn(Optional.of(sampleSession));

		// call service method
		SessionDTO sessionDTO = svc.getSessionBySessionId(sessionId.toString());

		// assert refresh called
		verify(sessionRepository, times(1)).refreshSession(any(), any());

		// assert
		assertEquals(sampleSessionDTO, sessionDTO);
	}

	@Test
	void get_session_by_sessionId_throws_SessionException() throws Exception {

		// mock repository call
		UUID sessionId = sampleSession.getId();
		String sessionIdStr = sessionId.toString();
		when(sessionRepository.findOneBySessionId(sessionId)).thenReturn(Optional.empty());

		// assert refresh not called
		verify(sessionRepository, times(0)).refreshSession(any(), any());

		// assert throws exception
		assertThrows(SessionException.class, () -> svc.getSessionBySessionId(sessionIdStr));
	}

	@Test
	void get_csrf_token_OK() {

		// mock call to repo
		UUID sessionId = sampleSession.getId();
		String sessionCsrfToken = sampleSessionDTO.getCsrfToken();
		when(sessionRepository.getCsrfToken(sessionId))
			.thenReturn(Optional.of(sessionCsrfToken));

		// call service method
		String csrfToken = svc.getCsrfToken(sessionId.toString());

		// assert refresh called
		verify(sessionRepository, times(1)).refreshSession(any(), any());

		// assert result
		assertEquals(sampleSessionDTO.getCsrfToken(), csrfToken);
	}

	@Test
	void get_csrf_token_throws_SessionException() throws Exception {

		// mock call to repo
		UUID sessionId = sampleSession.getId();
		String sessionIdStr = sessionId.toString();
		when(sessionRepository.getCsrfToken(sessionId)).thenReturn(Optional.empty());

		// assert refresh not called
		verify(sessionRepository, times(0)).refreshSession(any(), any());

		// assert throws exception
		assertThrows(SessionException.class, () -> svc.getCsrfToken(sessionIdStr));
	}

	@Test
	void get_expired_session_OK() {

		// mock repository call
		when(sessionRepository.findByRecentTsLessThan(any())).thenReturn(sampleExpiredSessions);

		List<Session> expiredSessions = svc.getExpiredSessions();

		// assert
		assertEquals(sampleExpiredSessions, expiredSessions);

	}

	@Test
	void delete_session_OK() {
		assertDoesNotThrow(() -> svc.deleteSession(sampleSession.getId()));
	}

	@Test
	void refresh_session_OK() {
		assertDoesNotThrow(() -> svc.refreshSession(sampleSession.getId().toString()));
	}
}
