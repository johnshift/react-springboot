package dev.johnshift.backend.controllers;

import org.apache.commons.lang3.StringUtils;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dev.johnshift.backend.domains.dtos.RegisterDTO;
import dev.johnshift.backend.domains.dtos.UserDTO;
import dev.johnshift.backend.events.RegisterCompleteEvent;
import dev.johnshift.backend.exceptions.UserException;
import dev.johnshift.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import static dev.johnshift.backend.constants.ValidationConstants.*;
import static dev.johnshift.backend.exceptions.UserException.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/v1/register")
@RequiredArgsConstructor
public class RegisterController {

	private final UserService userService;
	private final ApplicationEventPublisher eventPublisher;

	@GetMapping("/users")
	public List<UserDTO> handleGetUsers() {


		return userService.getAllUsers();
	}

	private void validate(RegisterDTO dto) {

		log.debug("validate dto = {} ", dto);

		String username = dto.getUsername();
		String email = dto.getEmail();
		String password = dto.getPassword();
		String name = dto.getName();
		String veil = dto.getVeil();
		String description = dto.getDescription();
		String veilDescription = dto.getVeilDescription();

		// required
		if (StringUtils.isBlank(username) || StringUtils.isEmpty(username)) {
			throw new UserException(USERNAME_REQUIRED, HttpStatus.BAD_REQUEST);
		}
		if (StringUtils.isBlank(email) || StringUtils.isEmpty(email)) {
			throw new UserException(EMAIL_REQUIRED, HttpStatus.BAD_REQUEST);
		}
		if (StringUtils.isBlank(password) || StringUtils.isEmpty(password)) {
			throw new UserException(PASSWORD_REQUIRED, HttpStatus.BAD_REQUEST);
		}
		if (StringUtils.isBlank(name) || StringUtils.isEmpty(name)) {
			throw new UserException(NAME_REQUIRED, HttpStatus.BAD_REQUEST);
		}
		if (StringUtils.isBlank(veil) || StringUtils.isEmpty(veil)) {
			throw new UserException(VEIL_REQUIRED, HttpStatus.BAD_REQUEST);
		}
		if (StringUtils.isBlank(description) || StringUtils.isEmpty(description)) {
			throw new UserException(DESCRIPTION_REQUIRED, HttpStatus.BAD_REQUEST);
		}
		if (StringUtils.isBlank(veilDescription) || StringUtils.isEmpty(veilDescription)) {
			throw new UserException(VEIL_DESCRIPTION_REQUIRED, HttpStatus.BAD_REQUEST);
		}

		// username
		if (dto.getUsername().length() < MIN_USERNAME_LENGTH) {
			throw new UserException(USERNAME_TOO_SHORT, HttpStatus.BAD_REQUEST);
		}
		if (dto.getUsername().length() > MAX_USERNAME_LENGTH) {
			throw new UserException(USERNAME_TOO_LONG, HttpStatus.BAD_REQUEST);
		}
		if (!(dto.getUsername().matches(NEAT_URI_REGEXP))) {
			throw new UserException(USERNAME_INVALID, HttpStatus.BAD_REQUEST);
		}

		// email
		if (!(dto.getEmail().matches(EMAIL_REGEXP))) {
			throw new UserException(EMAIL_INVALID, HttpStatus.BAD_REQUEST);
		}

		// password
		if (dto.getPassword().length() < MIN_PASSWORD_LENGTH) {
			throw new UserException(PASSWORD_TOO_SHORT, HttpStatus.BAD_REQUEST);
		}
		if (dto.getPassword().length() > MAX_PASSWORD_LENGTH) {
			throw new UserException(PASSWORD_TOO_LONG, HttpStatus.BAD_REQUEST);
		}

		// name
		if (dto.getName().length() < MIN_NAME_LENGTH) {
			throw new UserException(NAME_TOO_SHORT, HttpStatus.BAD_REQUEST);
		}
		if (dto.getName().length() > MAX_NAME_LENGTH) {
			throw new UserException(NAME_TOO_LONG, HttpStatus.BAD_REQUEST);
		}
		if (!(dto.getName().matches(NAMES_REGEXP))) {
			throw new UserException(NAME_INVALID, HttpStatus.BAD_REQUEST);
		}

		// veil
		if (dto.getVeil().length() < MIN_VEIL_LENGTH) {
			throw new UserException(VEIL_TOO_SHORT, HttpStatus.BAD_REQUEST);
		}
		if (dto.getVeil().length() > MAX_VEIL_LENGTH) {
			throw new UserException(VEIL_TOO_LONG, HttpStatus.BAD_REQUEST);
		}
		if (!(dto.getVeil().matches(NEAT_URI_REGEXP))) {
			throw new UserException(VEIL_INVALID, HttpStatus.BAD_REQUEST);
		}

		// username-veil conflict
		if (dto.getUsername() == dto.getVeil()) {
			throw new UserException(USERNAME_VEIL_CONFLICT, HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping
	public UserDTO handleRegister(@RequestBody RegisterDTO dto) {

		log.debug("HANDLER DTO = {}", dto);

		validate(dto);

		UserDTO savedUser = userService.register(dto);
		log.debug("savedUser = " + savedUser);

		eventPublisher.publishEvent(new RegisterCompleteEvent(
			savedUser.getName(),
			savedUser.getEmail(),
			savedUser.getId()));

		return savedUser;
	}

	@PostMapping("/verification/{token}")
	public void handleVerification(@PathVariable String token) {
		log.debug("verification token = " + token);
		userService.confirmVerification(token);
	}
}
