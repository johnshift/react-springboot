package dev.johnshift.backend.credential;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinColumns;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import dev.johnshift.backend.user.UserVeil;
import lombok.Data;

@Data
@Entity
@Table(name = "credentials")
public class Credential {

	@Id
	@Column(name = "id")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;

	@Column(name = "username")
	private String username;

	@Column(name = "email")
	private String email;

	@Column(name = "password")
	private String password;

	@Column(name = "name")
	private String name;

	@Column(name = "veil")
	private String veil;

	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumns({
			@JoinColumn(name = "user_id", referencedColumnName = "user_id"),
			@JoinColumn(name = "veil_id", referencedColumnName = "veil_id")
	})
	private UserVeil userVeil;

	@Column(name = "is_verified")
	private boolean isVerified;
}


