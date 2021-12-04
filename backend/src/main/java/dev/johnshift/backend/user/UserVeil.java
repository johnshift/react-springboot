package dev.johnshift.backend.user;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name = "user_veils")
@NoArgsConstructor
@AllArgsConstructor
public class UserVeil {

	@EmbeddedId
	private UserVeilId id;

	public static UserVeil of(UserVeilDTO dto) {

		UserVeilId uvId = new UserVeilId();
		uvId.setUserId(dto.getUserId());
		uvId.setVeilId(dto.getVeilId());

		return new UserVeil(uvId);
	}
}
