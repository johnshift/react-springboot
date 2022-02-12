package dev.johnshift.backend.domains.models;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mention {
	private int userId;
	private String name;
}
