package dev.johnshift.backend.constants;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Authority {

	POST_READ("post:read"), REACTION_READ("reaction:read");

	private final String authority;
}
