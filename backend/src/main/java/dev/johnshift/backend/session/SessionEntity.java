package dev.johnshift.backend.session;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity that reflects session table in DB
 */
@Entity
@Table(name = "sessions")
@Data
@NoArgsConstructor
public class SessionEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "session_id")
	private String sessionId;

	@Column(name = "csrf_token")
	private String csrfToken;

	@Column(name = "timestamp")
	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;

	@Column(name = "is_authenticated")
	private boolean isAuthenticated;
}
