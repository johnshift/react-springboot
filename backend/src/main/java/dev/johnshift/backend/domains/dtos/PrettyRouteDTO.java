package dev.johnshift.backend.domains.dtos;

import lombok.Data;

@Data
public class PrettyRouteDTO {
	private String name;
	private String type;
	private String description;
}
