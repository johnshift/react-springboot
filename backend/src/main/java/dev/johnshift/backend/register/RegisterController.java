package dev.johnshift.backend.register;

import javax.validation.Valid;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
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

	@PostMapping
	public String handleRegister(@Valid @RequestBody RegisterDTO regReq) {

		log.debug("regReq = " + regReq.toString());

		registerService.register(regReq);

		return "OK";
	}

}
