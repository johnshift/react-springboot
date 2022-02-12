package dev.johnshift.backend.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.johnshift.backend.domains.dtos.PostDTO;
import dev.johnshift.backend.domains.reqres.CreatePostRequest;
import dev.johnshift.backend.domains.reqres.GenericMessageResponse;
import dev.johnshift.backend.services.PostService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

	private final PostService postService;

	@PostMapping
	public GenericMessageResponse handleCreatePost(@RequestBody CreatePostRequest req) {

		log.debug("req = {}", req);

		return new GenericMessageResponse("OK");
	}

	@GetMapping
	public List<PostDTO> handleGetAllPosts() {
		return postService.getAllPosts();
	}

}
