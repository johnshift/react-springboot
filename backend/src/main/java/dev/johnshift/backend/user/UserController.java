package dev.johnshift.backend.user;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/v1/users")
public class UserController {

	@PostMapping("/{id}/posts")
	public String handleUserCreatePost(@PathVariable(name = "id") int id) {

		log.debug("id = " + id);

		return "CONGRATS";
	}

}
