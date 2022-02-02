package dev.johnshift.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.johnshift.backend.domains.dtos.PrettyRouteDTO;
import dev.johnshift.backend.domains.dtos.UserDTO;
import dev.johnshift.backend.services.UserService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/pretty-route")
@RequiredArgsConstructor
public class PrettyRouteController {

	private final UserService userService;

	@GetMapping("/{name}")
	public PrettyRouteDTO handlePrettyRoute(@PathVariable String name) {

		PrettyRouteDTO dto = new PrettyRouteDTO();

		// try find user by username
		try {
			UserDTO user = userService.findByUsername(name);
			dto.setType("PROFILE");
			dto.setName(user.getName());
			dto.setDescription(user.getDescription());
		} catch (Exception e) {

			// try find user by veil
			try {
				UserDTO user = userService.findByVeil(name);
				dto.setType("VEIL");

				// for veil profiles, name = veil name
				dto.setName(name);
				dto.setDescription(user.getDescription());

			} catch (Exception e2) {
				dto.setType("NOT_FOUND");
			}
		}

		return dto;

	}
}
