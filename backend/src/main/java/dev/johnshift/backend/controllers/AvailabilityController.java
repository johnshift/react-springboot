package dev.johnshift.backend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.johnshift.backend.exceptions.UserException;
import dev.johnshift.backend.services.UserService;
import java.util.Objects;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;

import static dev.johnshift.backend.constants.ValidationConstants.MIN_USERNAME_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.MAX_USERNAME_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.NEAT_URI_REGEXP;
import static dev.johnshift.backend.constants.ValidationConstants.EMAIL_REGEXP;
import static dev.johnshift.backend.constants.ValidationConstants.MIN_VEIL_LENGTH;
import static dev.johnshift.backend.constants.ValidationConstants.MAX_VEIL_LENGTH;

@RestController
@RequestMapping("/api/v1/availability")
@RequiredArgsConstructor
public class AvailabilityController {

	private final UserService userService;

	@GetMapping("/username/{value}")
	public boolean handleUsernameAvailability(@PathVariable("value") String username) throws InterruptedException {

		TimeUnit.SECONDS.sleep(1);


		// check if valid username
		if (username.length() < MIN_USERNAME_LENGTH) {
			return false;
		}
		if (username.length() > MAX_USERNAME_LENGTH) {
			return false;
		}
		if (!(username.matches(NEAT_URI_REGEXP))) {
			return false;
		}

		try {
			userService.findByUsername(username);
			return false;
		} catch (Exception e) {

			// try if existing in veil names
			try {
				userService.findByVeil(username);
				return false;
			} catch (Exception e2) {
				return Objects.equals(e.getMessage(), UserException.notFound().getMessage());
			}
		}

	}

	@GetMapping("/email/{value}")
	public boolean handleEmailAvailability(@PathVariable("value") String email) throws InterruptedException {

		TimeUnit.SECONDS.sleep(1);

		// check valid email
		if (!(email.matches(EMAIL_REGEXP))) {
			return false;
		}

		try {
			userService.findByEmail(email);
			return false;
		} catch (Exception e) {
			return Objects.equals(e.getMessage(), UserException.notFound().getMessage());
		}

	}

	@GetMapping("/veil/{value}")
	public boolean handleVeilAvailability(@PathVariable("value") String veil) throws InterruptedException {

		TimeUnit.SECONDS.sleep(1);

		if (veil.length() < MIN_VEIL_LENGTH) {
			return false;
		}
		if (veil.length() > MAX_VEIL_LENGTH) {
			return false;
		}
		if (!(veil.matches(NEAT_URI_REGEXP))) {
			return false;
		}

		try {
			userService.findByVeil(veil);
			return false;
		} catch (Exception e) {

			// try if existing in usernames
			try {
				userService.findByUsername(veil);
				return false;
			} catch (Exception e2) {
				return Objects.equals(e.getMessage(), UserException.notFound().getMessage());
			}
		}

	}
}
