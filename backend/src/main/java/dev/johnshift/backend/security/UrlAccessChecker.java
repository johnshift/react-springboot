package dev.johnshift.backend.security;

import javax.servlet.http.HttpServletRequest;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class UrlAccessChecker {

	public boolean check(Authentication authentication, HttpServletRequest request) {

		log.debug("WEB SECURITY CALLED");

		return true;
	}

}
