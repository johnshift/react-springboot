package dev.johnshift.backend.session;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

/** This is sent on successful login. */
@Data
public class SessionCsrfDTO {
	@JsonProperty("csrf-token")
	private final String csrfToken;
}
