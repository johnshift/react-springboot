package dev.johnshift.backend.auth;

import lombok.Data;

@Data
public class AuthCsrfDTO {
	private final String token;

	public static AuthCsrfDTO of(AuthSessionEntity session) {
		return new AuthCsrfDTO(session.getCsrfToken());
	}

	public static AuthCsrfDTO of(AuthSessionDTO sessionDTO) {
		return new AuthCsrfDTO(sessionDTO.getCsrfToken());
	}
}
