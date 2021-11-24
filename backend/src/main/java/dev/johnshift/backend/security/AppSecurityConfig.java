package dev.johnshift.backend.security;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.header.HeaderWriterFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import dev.johnshift.backend.auth.AuthCsrfFilter;
import dev.johnshift.backend.auth.AuthService;
import dev.johnshift.backend.auth.AuthSessionEntity;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableScheduling
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class AppSecurityConfig extends WebSecurityConfigurerAdapter {

	private final PasswordEncoder passwordEncoder;
	private final AuthService authService;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http

			// disable spring security default csrf and session management
			// all session management is handled inside AuthFilter
			.csrf().disable()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()

			// cors settings
			.cors()
			.configurationSource(getCorsConfigurationSource())
			.and()

			// Custom Auth Filter
			.addFilterAfter(new AuthCsrfFilter(authService), HeaderWriterFilter.class)

			// Todo: extend session age on requests


			.authorizeRequests()

			// public endpoints
			.antMatchers(HttpMethod.GET, "/public").permitAll()
			.antMatchers(HttpMethod.GET, "/expired-sessions").permitAll();
	}

	@Override
	@Bean
	protected UserDetailsService userDetailsService() {

		UserDetails user = User.builder()
			.username("user")
			.password(passwordEncoder.encode("pass"))
			.roles("USER")
			.build();


		return new InMemoryUserDetailsManager(user);
	}

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	// CORS configuration
	private CorsConfigurationSource getCorsConfigurationSource() {

		CorsConfiguration config = new CorsConfiguration();

		List<String> allowedOrigins = Arrays.asList(

			// WARNING: remove localhost in production!
			"http://localhost:3000",
			"http://localhost:5000");

		List<String> allowedHeaders = Arrays.asList(
			"content-type",
			"x-veils-session",
			"x-veils-session-pub",
			"x-veils-csrf-token");

		List<String> allowedMethods = Arrays.asList(
			HttpMethod.GET.name(),
			HttpMethod.POST.name(),
			HttpMethod.PUT.name(),
			HttpMethod.DELETE.name(),
			HttpMethod.OPTIONS.name());

		boolean allowCredentials = true;

		config.setAllowedOriginPatterns(allowedOrigins);
		config.setAllowedHeaders(allowedHeaders);
		config.setAllowedMethods(allowedMethods);
		config.setAllowCredentials(allowCredentials);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return source;
	}

	/**
	 * Runs session expiration every 1 hour
	 */
	@Scheduled(fixedDelay = AuthService.SESSION_AGE)
	public void hello() {
		List<AuthSessionEntity> expiredSessions = authService.getExpiredSessions();
		if (!expiredSessions.isEmpty()) {
			for (AuthSessionEntity session : expiredSessions) {
				authService.deleteSession(session);
			}
		}
	}
}
