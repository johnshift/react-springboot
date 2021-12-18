package dev.johnshift.backend.configs;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.access.channel.ChannelProcessingFilter;
import org.springframework.web.cors.CorsConfigurationSource;
import dev.johnshift.backend.filters.JwtLoginFilter;
import dev.johnshift.backend.filters.JwtVerifyFilter;
import dev.johnshift.backend.filters.LogFilter;
import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final CorsConfigurationSource corsConfigurationSource;
	private final DaoAuthenticationProvider daoAuthenticationProvider;

	@Override
	protected void configure(HttpSecurity http) throws Exception {

		http
			.csrf().disable()
			// .csrf(csrf -> csrf
			// .csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse()))

			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			.and()

			.addFilterAfter(new LogFilter(), ChannelProcessingFilter.class)

			.addFilter(new JwtLoginFilter(authenticationManager()))
			.addFilterAfter(new JwtVerifyFilter(), JwtLoginFilter.class)

			.cors()
			.configurationSource(corsConfigurationSource)
			.and()

			.authorizeRequests()

			.antMatchers(HttpMethod.GET, "/sample").permitAll()
			.antMatchers(HttpMethod.POST, "/api/v1/login").permitAll()
			.antMatchers(HttpMethod.GET, "/user-only").hasRole("USER")

			.anyRequest()
			.authenticated();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.authenticationProvider(daoAuthenticationProvider);
	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/check");
	}

}
