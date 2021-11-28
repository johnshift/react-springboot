package dev.johnshift.backend.user;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import lombok.Data;

@Data
@Entity
public class UserVeilEntity {

	@EmbeddedId
	private UserVeilId id;

}
