package dev.johnshift.backend.integration;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.cors.CorsConfigurationSource;
import dev.johnshift.backend.repositories.UserRepository;
import dev.johnshift.backend.services.UserService;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class PrettyRouteIT {

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	CorsConfigurationSource corsConfigurationSource;

	@Autowired
	UserDetailsService userDetailsService;

	@Autowired
	DaoAuthenticationProvider daoAuthenticationProvider;

	@Autowired
	UserRepository userRepository;

	@Autowired
	UserService userService;

	@Autowired
	WebTestClient webTestClient;

	private final String API_URI = "/api/v1/pretty-route";

	@Test
	void invalidType_OK() {

		String name = "non-existing";

		webTestClient.get()
			.uri(API_URI + "/" + name)
			.exchange()
			.expectStatus().isOk()
			.expectBody()
			.jsonPath("$.name").isEqualTo(null)
			.jsonPath("$.description").isEqualTo(null)
			.jsonPath("$.type").isEqualTo("NOT_FOUND");

	}

	@Test
	void profileType_OK() {

		String name = "demo";

		webTestClient.get()
			.uri(API_URI + "/" + name)
			.exchange()
			.expectStatus().isOk()
			.expectBody()
			.jsonPath("$.name").isEqualTo("Demo User")
			.jsonPath("$.description").isEqualTo(null)
			.jsonPath("$.type").isEqualTo("PROFILE");

	}

	@Test
	void veilType_OK() {

		String name = "anonymous1";

		webTestClient.get()
			.uri(API_URI + "/" + name)
			.exchange()
			.expectStatus().isOk()
			.expectBody()
			.jsonPath("$.name").isEqualTo(name)
			.jsonPath("$.description").isEqualTo(null)
			.jsonPath("$.type").isEqualTo("VEIL");

	}


}
