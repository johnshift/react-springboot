package dev.johnshift.backend.session;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import com.vladmihalcea.hibernate.type.array.ListArrayType;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;
import lombok.Data;
import lombok.NoArgsConstructor;

/** Entity that reflects session table in DB */
@Entity
@Data
@NoArgsConstructor
@Table(name = "sessions")
@TypeDef(name = "list-array", typeClass = ListArrayType.class) // enable array type from db
public class SessionEntity {

	@Id
	@Column(name = "id")
	@Type(type = "pg-uuid")
	@GeneratedValue(strategy = GenerationType.AUTO)
	private UUID id;

	@Column(name = "csrf_token")
	@Type(type = "pg-uuid")
	private UUID csrfToken;

	@Column(name = "recent_ts")
	@Temporal(TemporalType.TIMESTAMP)
	private Date recentTs;

	@Type(type = "list-array")
	@Column(name = "roles", columnDefinition = "text[]")
	private List<String> roles;
}
