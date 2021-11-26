package dev.johnshift.backend.session;

import lombok.Data;

@Data
public class SessionDTO {
	private final String sessionId;
	private final String csrfToken;

	public static SessionDTO of(SessionEntity session) {
		return new SessionDTO(
			session.getId().toString(),
			session.getCsrfToken().toString());
	}

}

