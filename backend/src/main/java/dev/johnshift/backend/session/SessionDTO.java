package dev.johnshift.backend.session;

import java.util.List;
import lombok.Data;

@Data
public class SessionDTO {
	private final String sessionId;
	private final String csrfToken;
	private final String principal;
	private final List<String> authorities;

	public static SessionDTO of(Session session) {
		return new SessionDTO(
			session.getId().toString(),
			session.getCsrfToken().toString(),
			session.getPrincipal(),
			session.getAuthorities());
	}

}

