package dev.johnshift.backend.credential;

import lombok.Data;

@Data
public class CredentialDTO {
	private final String username;
	private final String email;
	private final int userId;
	private final int veilId;

	public static CredentialDTO of(Credential credential) {

		return new CredentialDTO(
			credential.getUsername(),
			credential.getEmail(),
			credential.getUserVeil().getId().getUserId(),
			credential.getUserVeil().getId().getVeilId());
	}
}
