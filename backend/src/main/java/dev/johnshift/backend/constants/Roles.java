package dev.johnshift.backend.constants;

import java.util.Set;
import java.util.stream.Collectors;
import com.google.common.collect.Sets;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import static dev.johnshift.backend.constants.Authority.POST_READ;
import static dev.johnshift.backend.constants.Authority.REACTION_READ;

@Getter
@RequiredArgsConstructor
public enum Roles {

	USER(Sets.newHashSet(POST_READ, REACTION_READ));

	private final Set<Authority> authorities;

	public Set<GrantedAuthority> getGrantedAuthorities() {

		// append authorities "post:read", "reaction:read", etc etc .,
		Set<GrantedAuthority> grantedAuthorities = getAuthorities().stream()
			.map(gA -> new SimpleGrantedAuthority(gA.getAuthority()))
			.collect(Collectors.toSet());

		// append "ROLE_USER" into authorities
		grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));

		return grantedAuthorities;
	}
}
