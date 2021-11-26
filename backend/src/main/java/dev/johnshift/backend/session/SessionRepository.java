package dev.johnshift.backend.session;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface SessionRepository extends JpaRepository<SessionEntity, Long> {

	/** Retrieves SessionEntity using session id
	 * 
	 * @param sessionID
	 * @return */
	@Query(value = "SELECT * FROM sessions WHERE id = ?1", nativeQuery = true)
	Optional<SessionEntity> findOneBySessionId(UUID id);

	/** Retrieves csrf-token from an existing session
	 * 
	 * @param ts
	 * @return */
	@Query(value = "SELECT CAST(csrf_token as TEXT) FROM sessions WHERE id = ?1", nativeQuery = true)
	Optional<String> getCsrfToken(UUID id);

	/** Updates recent_ts of selected session
	 * 
	 * @param id */
	@Modifying
	@Query(value = "UPDATE sessions SET recent_ts = ?1 WHERE id = ?1", nativeQuery = true)
	void refreshSession(Date ts, UUID id);

	/** Retrieves a list of sessions with recent_ts less than specified date
	 * 
	 * @param ts
	 * @return */
	List<SessionEntity> findByRecentTsLessThan(Date recentTs);

	// /** Creates a new public session with empty role.
	// * <p>
	// * All three columns (id, csrf_token, recent_ts) are all generated by db. We only need to pass
	// * roles. Needed to manually handle this instead of save since repo returns null on default values
	// * from db */
	// @Query(value = "INSERT INTO sessions (roles) VALUES (array[]::text[])", nativeQuery = true)
	// SessionEntity createPublicSession();
}
