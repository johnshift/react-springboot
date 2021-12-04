package dev.johnshift.backend.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class UserVeilDTO {
	private int userId;
	private int veilId;

	public static UserVeilDTO of(UserVeil uv) {

		return new UserVeilDTO(
			uv.getId().getUserId(),
			uv.getId().getVeilId());
	}
}
