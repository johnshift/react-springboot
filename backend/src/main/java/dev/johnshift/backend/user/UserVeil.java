package dev.johnshift.backend.user;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "user_veils")
public class UserVeil {

	@EmbeddedId
	private UserVeilId id;

}
