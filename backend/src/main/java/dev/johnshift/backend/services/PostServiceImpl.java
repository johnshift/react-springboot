package dev.johnshift.backend.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import org.springframework.stereotype.Service;
import dev.johnshift.backend.domains.dtos.PostDTO;
import dev.johnshift.backend.domains.entities.Post;
import dev.johnshift.backend.domains.entities.User;
import dev.johnshift.backend.exceptions.PostException;
import dev.johnshift.backend.repositories.PostRepository;
import dev.johnshift.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

	private final PostRepository postRepository;
	private final UserRepository userRepository;

	@Override
	public PostDTO findById(int id) {

		Post post = postRepository.findById(id)
			.orElseThrow(PostException::notFound);

		User user = userRepository.findById(post.getUserId())
			.orElseThrow(PostException::userNotFound);


		PostDTO dto = new PostDTO();
		dto.setId(post.getId());
		dto.setCreated(post.getCreated());
		dto.setBody(post.getBody());

		if (post.isAsVeil()) {
			dto.setOwner(user.getVeil());
			dto.setRoute(user.getVeil());
		} else {
			dto.setOwner(user.getName());
			dto.setRoute(user.getUsername());
		}

		// TODO: implementations of the following
		dto.setMentionIds(Collections.emptyList());
		dto.setVoteIds(Collections.emptyList());
		dto.setCommentIds(Collections.emptyList());

		return dto;
	}

	@Override
	public List<PostDTO> getAllPosts() {

		List<Post> allPosts = postRepository.findAll();
		List<PostDTO> dtos = new ArrayList<>();
		for (Post post : allPosts) {


			User user = userRepository.findById(post.getUserId())
				.orElseThrow(PostException::userNotFound);

			PostDTO dto = new PostDTO();
			dto.setId(post.getId());
			dto.setCreated(post.getCreated());
			dto.setBody(post.getBody());

			if (post.isAsVeil()) {
				dto.setOwner(user.getVeil());
				dto.setRoute(user.getVeil());
			} else {
				dto.setOwner(user.getName());
				dto.setRoute(user.getUsername());
			}

			// TODO: implementations of the following
			dto.setMentionIds(Collections.emptyList());
			dto.setCommentIds(Collections.emptyList());
			dto.setCommentIds(Collections.emptyList());

			dtos.add(dto);
		}

		return dtos;
	}

}
