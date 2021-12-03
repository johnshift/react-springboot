package dev.johnshift.backend.post;

import javax.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.johnshift.backend.auth.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {

	private final AuthService authService;

	@PostMapping
	public String handleCreatePost(@RequestBody PostCreateRequest reqPost, HttpServletRequest request) {

		log.debug("reqPost = " + reqPost.toString());

		// check if request is authorized to proceed
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String principal = (String) authentication.getPrincipal();
		authService.authPostCreate(principal, reqPost.getOwner(), reqPost.getUserId());

		return "CONGRATS";
	}
}
