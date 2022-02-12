package dev.johnshift.backend.services;

import java.util.List;
import dev.johnshift.backend.domains.dtos.PostDTO;

public interface PostService {

	PostDTO findById(int id);

	List<PostDTO> getAllPosts();
}
