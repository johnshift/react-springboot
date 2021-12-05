package dev.johnshift.backend.register;

import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "register_verification")
public class RegisterVerification {

	@Id
	@Column(name = "token")
	private UUID token;

	@Column(name = "credential_id")
	private int credentialId;
}
