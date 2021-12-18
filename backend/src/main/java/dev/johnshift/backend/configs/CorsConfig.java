package dev.johnshift.backend.configs;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import lombok.extern.slf4j.Slf4j;

@Configuration
public class CorsConfig {

	@Bean
	CorsConfigurationSource corsConfigurationSource() {

		CorsConfiguration config = new CorsConfiguration();

		List<String> allowedOrigins = Arrays.asList(
			"https://veils-dev.vercel.app",
			"https://veils.vercel.app"
		// "http://localhost:3000", // WARNING: remove localhost in production!
		// "http://localhost:5000" // WARNING: remove localhost in production!
		);

		List<String> allowedHeaders = Arrays.asList(
			"Content-Type",
			"Authorization");

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
		config.setExposedHeaders(allowedHeaders);

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", config);

		return source;
	}
}
