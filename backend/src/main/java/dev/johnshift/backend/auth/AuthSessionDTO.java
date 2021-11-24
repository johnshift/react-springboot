package dev.johnshift.backend.auth;

import lombok.Data;

@Data
public class AuthSessionDTO {
    private final String sessionId;
    private final String csrfToken;

    public static AuthSessionDTO of(AuthSessionEntity session) {
        return new AuthSessionDTO(
            session.getSessionId(), 
            session.getCsrfToken()
        );
    }
}
