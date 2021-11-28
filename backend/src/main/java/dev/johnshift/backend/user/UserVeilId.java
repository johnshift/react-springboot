package dev.johnshift.backend.user;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.Data;

@Data
@Embeddable
public class UserVeilId implements Serializable {

	@Column(name = "user_id")
	private int userId;

	@Column(name = "veil_id")
	private int veilId;
}
