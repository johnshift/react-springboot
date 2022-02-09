package dev.johnshift.backend.domains.entities;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "verification")
public class Verification {

	@Id
	@Column(name = "token")
	private UUID token;

	@Column(name = "user_id")
	private int userId;
}
