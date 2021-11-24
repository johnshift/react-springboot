package dev.johnshift.backend.exceptions;


import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ExceptionDTO {
	private String type;
	private String message;
	private Date timestamp;

	public ExceptionDTO() {
		this.timestamp = new Date();
	}

	public ExceptionDTO(String type, String message) {
		this();
		this.type = type;
		this.message = message;
	}
}
