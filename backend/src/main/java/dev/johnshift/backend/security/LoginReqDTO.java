package dev.johnshift.backend.security;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LoginReqDTO {
	private String principal;
	private String password;
}
