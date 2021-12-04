package dev.johnshift.backend.user;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class UserVeilId implements Serializable {

	@Column(name = "user_id")
	private int userId;

	@Column(name = "veil_id")
	private int veilId;
}
