package dev.johnshift.backend.security;

import javax.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.johnshift.backend.auth.AuthService;
import dev.johnshift.backend.post.PostCreateRequest;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/security")
@RequiredArgsConstructor
public class SecurityController {

	private final AuthService authService;

	public static final String CONGRATS = "Congrats!";
	public static final String NOT_SECURED = "This endpoint is NOT SECURED. Anyone can access it.";
	public static final String PERMIT_ALL =
		"This endpoint uses permitAll(). Any public/active session w/ or w/o authorizations";
	public static final String USER_ONLY = "This endpoint needs Authentication + ROLE_USER Authorization";

	@GetMapping("/not-secured")
	public String getNotSecured() {
		return NOT_SECURED;
	}

	@GetMapping("/permit-all")
	public String getPublic() {
		return PERMIT_ALL;
	}

	@GetMapping("/user-only")
	public String getUserOnly() {
		return USER_ONLY;
	}

	@PostMapping("/users")
	// @PreAuthorize("#userReq.username + 'black' == 'batmanblack'")
	public String getUserById(@RequestBody UserReq userReq) {

		// log.debug("pathvariable id = " + id);
		log.debug("userReq = " + userReq.toString());

		return CONGRATS;
	}

	@PostMapping("/posts")
	public String handleCreatePost(@RequestBody PostCreateRequest reqPost, HttpServletRequest request) {

		log.debug("reqPost = " + reqPost.toString());

		// check if request is authorized to proceed
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String principal = (String) authentication.getPrincipal();
		authService.authPostCreate(principal, reqPost.getOwner(), reqPost.getUserId());

		return CONGRATS;
	}

	@Data
	@NoArgsConstructor
	public static class UserReq {
		private int id;
		private String username;
	}

}
