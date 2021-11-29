package dev.johnshift.backend.security;


import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import dev.johnshift.backend.security.filters.UserPassAuthFilter;
import dev.johnshift.backend.credential.CredentialService;
import dev.johnshift.backend.security.filters.AuthenticationFilter;
import dev.johnshift.backend.security.filters.CsrfFilter;
import dev.johnshift.backend.security.filters.ExceptionHandlerFilter;
import dev.johnshift.backend.security.filters.SessionFilter;
import dev.johnshift.backend.session.Session;
import dev.johnshift.backend.session.SessionService;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableScheduling
@RequiredArgsConstructor
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	/** Clear expired sessions every 5 mins. */
	private static final int CLEAR_SESSIONS_DELAY = 1000 * 60 * 5;

	private final PasswordEncoder passwordEncoder;
	private final SessionService sessionService;
	private final CredentialService credentialService;
	private final UserDetailsService userServiceImpl;

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
			.addFilterAfter(new ExceptionHandlerFilter(), ChannelProcessingFilter.class)
			.addFilterAfter(new SessionFilter(sessionService), UsernamePasswordAuthenticationFilter.class)
			.addFilterAfter(new CsrfFilter(sessionService), SessionFilter.class)
			.addFilterAfter(new UserPassAuthFilter(authenticationManager(), sessionService), CsrfFilter.class)
			.addFilterAfter(new AuthenticationFilter(credentialService, sessionService),
				UserPassAuthFilter.class)
			// Todo: extend session age on requests

			.authorizeRequests()

			// public endpoints
			// .antMatchers("/api/v1/session/csrf-token").permitAll()

			.anyRequest()
			.authenticated();
	}



	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.userDetailsService(userServiceImpl)
			.passwordEncoder(passwordEncoder);
	}

	// @Override
	// @Bean
	// public AuthenticationManager authenticationManagerBean() throws Exception {
	// return super.authenticationManagerBean();
	// }

	// @Override
	// @Bean
	// protected UserDetailsService userDetailsService() {

	// UserDetails user = User.builder()
	// .username("user")
	// .password(passwordEncoder.encode("pass"))
	// .roles("USER")
	// .build();


	// return new InMemoryUserDetailsManager(user);
	// }

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

	/** Runs session expiration every 1 hour */
	@Scheduled(fixedDelay = CLEAR_SESSIONS_DELAY)
	public void clearExpiredSessions() {
		List<Session> expiredSessions = sessionService.getExpiredSessions();
		if (!expiredSessions.isEmpty()) {
			for (Session session : expiredSessions) {
				sessionService.deleteSession(session.getId());
			}
		}
	}
}
