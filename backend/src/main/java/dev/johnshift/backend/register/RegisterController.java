package dev.johnshift.backend.register;

import javax.validation.Valid;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.util.StringUtils;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Validated
@RestController
@RequestMapping("/api/v1/register")
@RequiredArgsConstructor
public class RegisterController {

	private final RegisterService registerService;
	private final ApplicationEventPublisher eventPublisher;

	@PostMapping
	public String handleRegister(@Valid @RequestBody RegisterDTO regReq) {

		log.debug("regReq = " + regReq.toString());

		int credentialId = registerService.register(regReq);
		log.debug("credentialId = " + credentialId);

		eventPublisher.publishEvent(new RegisterCompleteEvent(
			StringUtils.capitalize(regReq.getName()),
			regReq.getEmail(),
			credentialId));

		return "OK";
	}

	@GetMapping("/verify")
	public String handleVerifyToken(@RequestParam String token) {

		log.debug("verification token = " + token);

		registerService.confirmVerificationToken(token);

		return "OK";
	}

}
