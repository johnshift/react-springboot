package dev.johnshift.backend.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import dev.johnshift.backend.domains.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);
}
