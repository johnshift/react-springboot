package dev.johnshift.backend.register;

import org.springframework.context.ApplicationEvent;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterCompleteEvent extends ApplicationEvent {
	private final String name;
	private final String email;
	private final int credentialId;

	public RegisterCompleteEvent(String name, String email, int credentialId) {
		super(email);

		this.name = name;
		this.email = email;
		this.credentialId = credentialId;
	}
}
