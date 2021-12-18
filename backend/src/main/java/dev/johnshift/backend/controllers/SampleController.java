package dev.johnshift.backend.controllers;

import java.util.Enumeration;
import javax.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class SampleController {

	@GetMapping("/check")
	public String handleCheck() {
		return "OK";
	}

	@GetMapping("/sample")
	public String getSample(HttpSession session) {

		log.debug("session-id = {}", session.getId());

		Enumeration<String> attrNames = session.getAttributeNames();
		log.debug("attrNames = {}", attrNames);

		while (attrNames.asIterator().hasNext()) {
			log.debug("attr = {}", attrNames.nextElement());
		}

		Object ambot = session.getAttribute("SPRING_SECURITY_CONTEXT");
		log.debug("ambot = {}", ambot);

		return "OK";
	}

	@GetMapping("/user-only")
	public String userOnly() {

		return "FUCK YOU";
	}

}
