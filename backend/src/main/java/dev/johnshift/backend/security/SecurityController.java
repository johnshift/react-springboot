package dev.johnshift.backend.security;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/security")
public class SecurityController {

	public static final String NOT_SECURED = "This endpoint is NOT SECURED. Anyone can access it.";
	public static final String PERMIT_ALL =
		"This endpoint uses permitAll(). Any public/active session w/ or w/o authorizations";
	public static final String USER_ONLY = "This endpoint needs Authentication + ROLE_USER Authorization";
	public static final String POST_1_WRITE = "This endpoint needs Authentication + post-1-write Authorization";

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

	@GetMapping("/post-1-write")
	public String getPost1Write() {
		return POST_1_WRITE;
	}

	@PostMapping("/users")
	// @PreAuthorize("#userReq.username + 'black' == 'batmanblack'")
	public String getUserById(@RequestBody UserReq userReq) {

		// log.debug("pathvariable id = " + id);
		log.debug("userReq = " + userReq.toString());

		return "CONGRATS";
	}

	@Data
	@NoArgsConstructor
	public static class UserReq {
		private int id;
		private String username;
	}

}
