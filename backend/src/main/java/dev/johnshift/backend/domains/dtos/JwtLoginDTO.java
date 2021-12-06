package dev.johnshift.backend.domains.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class JwtLoginDTO {
	private String principal;
	private String password;
}
