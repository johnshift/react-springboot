package dev.johnshift.backend.auth;

import java.util.Date;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    public static final long SESSION_AGE = 1000L * 60L * 60L;

    private final AuthSessionRepository sessionRepo;

    public AuthSessionDTO createSession() {

        AuthSessionEntity newSession = new AuthSessionEntity();
        newSession.setCsrfToken(UUID.randomUUID().toString());
        newSession.setSessionId(UUID.randomUUID().toString());
        newSession.setTimestamp(new Date());
        
        AuthSessionEntity session = sessionRepo.save(newSession);

        return AuthSessionDTO.of(session);

    }

    public AuthSessionDTO getSessionBySessionId(String sessionId) {

        AuthSessionEntity session = sessionRepo.findOneBySessionId(sessionId).orElse(null);

        return AuthSessionDTO.of(session);
    }

    /**
     * All sessions one hour ago are considered expired
     * @return
     */
    public List<AuthSessionEntity> getExpiredSessions() {
        Date oneHourAgo = new Date(System.currentTimeMillis() - SESSION_AGE);
        return sessionRepo.findByTimestampLessThan(oneHourAgo);
    }

    public void deleteSession(AuthSessionEntity session) {

        sessionRepo.delete(session);
    }

    
}
