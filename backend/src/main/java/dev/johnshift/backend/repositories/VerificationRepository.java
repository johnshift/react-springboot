package dev.johnshift.backend.repositories;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import dev.johnshift.backend.domains.entities.Verification;

public interface VerificationRepository extends JpaRepository<Verification, UUID> {

}
