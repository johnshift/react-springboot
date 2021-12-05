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
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import dev.johnshift.backend.security.filters.UserPassFilter;
import dev.johnshift.backend.credential.CredentialService;
import dev.johnshift.backend.security.filters.AuthenticationFilter;
import dev.johnshift.backend.security.filters.CsrfFilter;
import dev.johnshift.backend.security.filters.ExceptionHandlerFilter;
import dev.johnshift.backend.security.filters.LoggingFilter;
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

	private final SessionService sessionService;
	private final CredentialService credentialService;
	private final AuthenticationManager authenticationManager;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
			// .authorizeRequests(authorize -> authorize
			// .antMatchers(HttpMethod.POST, "/api/v1/users/{userId}/posts")
			// .access("@webSecurity.check(authentication,#userId)"))

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

			.exceptionHandling().accessDeniedHandler(accessDeniedHandler())
			.and()

			// Custom Auth Filter
			.addFilterAfter(new LoggingFilter(), ChannelProcessingFilter.class)
			.addFilterAfter(new ExceptionHandlerFilter(), LoggingFilter.class)
			.addFilterAfter(new SessionFilter(sessionService), UsernamePasswordAuthenticationFilter.class)
			.addFilterAfter(new CsrfFilter(sessionService), SessionFilter.class)
			.addFilterAfter(new UserPassFilter(authenticationManager, sessionService), CsrfFilter.class)
			.addFilterAfter(new AuthenticationFilter(credentialService, sessionService,
				authenticationManager),
				UserPassFilter.class)
			// Todo: extend session age on requests

			.authorizeRequests()

			// public endpoints
			.antMatchers(HttpMethod.GET, "/api/v1/session/csrf-token").permitAll()
			.antMatchers(HttpMethod.GET, "/api/v1/security/permit-all").permitAll()
			.antMatchers(HttpMethod.POST, "/api/v1/register").permitAll()
			.antMatchers(HttpMethod.GET, "/api/v1/register/verify*").permitAll()

			// role-specific endpoints
			.antMatchers(HttpMethod.GET, "/api/v1/security/user-only").hasAuthority("ROLE_USER")

			.anyRequest()
			.authenticated();
	}

	// NOT SECURED Endpoints
	@Override
	public void configure(WebSecurity webSecurity) throws Exception {
		webSecurity.ignoring()
			.antMatchers(HttpMethod.GET, "/api/v1/security/not-secured");
		// .antMatchers(HttpMethod.POST, "/api/v1/security/users/**");
	}

	@Bean
	public AccessDeniedHandler accessDeniedHandler() {
		return new CustomAccessDeniedHandler();
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
