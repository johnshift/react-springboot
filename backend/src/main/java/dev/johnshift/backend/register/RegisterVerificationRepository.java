package dev.johnshift.backend.register;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegisterVerificationRepository extends JpaRepository<RegisterVerification, UUID> {

}
