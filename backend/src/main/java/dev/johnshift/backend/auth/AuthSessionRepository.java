package dev.johnshift.backend.auth;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AuthSessionRepository extends JpaRepository<AuthSessionEntity, Long> {

	/**
	 * Retrieves SessionEntity using session UUID
	 * @param sessionID
	 * @return
	 */
	@Query(value = "SELECT * FROM sessions WHERE session_id = ?1", nativeQuery = true)
	Optional<AuthSessionEntity> findOneBySessionId(String sessionId);

	/**
	 * Retrieves csrf-token from an existing session
	 * @param ts
	 * @return
	 */
	@Query(value = "SELECT csrf_token FROM sessions WHERE session_id = ?1", nativeQuery = true)
	Optional<String> getCsrfToken(String sessionId);

	List<AuthSessionEntity> findByTimestampLessThan(Date ts);
}
