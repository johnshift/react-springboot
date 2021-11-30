package dev.johnshift.backend.security;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/security")
public class SecurityController {

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

}
