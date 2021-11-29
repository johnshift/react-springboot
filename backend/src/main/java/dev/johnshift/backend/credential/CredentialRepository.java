package dev.johnshift.backend.credential;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialRepository extends JpaRepository<Credential, Long> {

	Optional<Credential> findOneByUsername(String username);

	Optional<Credential> findOneByEmail(String email);
}
