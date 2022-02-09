package dev.johnshift.backend.events;

import org.springframework.context.ApplicationEvent;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterCompleteEvent extends ApplicationEvent {
	private final String name;
	private final String email;
	private final int userId;

	public RegisterCompleteEvent(String name, String email, int userId) {
		super(email);

		this.name = name;
		this.email = email;
		this.userId = userId;
	}
}
