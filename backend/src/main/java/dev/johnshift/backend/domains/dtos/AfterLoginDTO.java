package dev.johnshift.backend.domains.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AfterLoginDTO {
	private String name;
	private String description;
	private String username;
	private boolean isVerified;
}
