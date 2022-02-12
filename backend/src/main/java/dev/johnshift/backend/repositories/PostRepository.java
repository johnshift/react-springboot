package dev.johnshift.backend.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import dev.johnshift.backend.domains.entities.Post;

public interface PostRepository extends JpaRepository<Post, Integer> {

	Optional<Post> findById(int id);
}
