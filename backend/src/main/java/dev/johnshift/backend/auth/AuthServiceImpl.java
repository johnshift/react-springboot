package dev.johnshift.backend.auth;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

	private final AuthSessionRepository sessionRepo;

	@Override
	public AuthSessionDTO createSession(boolean isAuthenticated) {

		AuthSessionEntity newSession = new AuthSessionEntity();
		newSession.setCsrfToken(UUID.randomUUID().toString());
		newSession.setSessionId(UUID.randomUUID().toString());
		newSession.setTimestamp(new Date());
		newSession.setAuthenticated(isAuthenticated);

		AuthSessionEntity session = sessionRepo.save(newSession);

		return AuthSessionDTO.of(session);
	}

	@Override
	public AuthCsrfDTO getCsrfToken(String sessionId) {

		String csrfToken = sessionRepo.getCsrfToken(sessionId).orElse(null);

		return new AuthCsrfDTO(csrfToken);
	}

	@Override
	public List<AuthSessionEntity> getExpiredSessions() {

		Date oneHourAgo = new Date(System.currentTimeMillis() - SESSION_AGE);
		return sessionRepo.findByTimestampLessThan(oneHourAgo);
	}

	@Override
	public void deleteSession(AuthSessionEntity session) {

		sessionRepo.delete(session);
	}
}
