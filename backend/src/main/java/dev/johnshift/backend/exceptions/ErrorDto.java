package dev.johnshift.backend.exceptions;

import java.util.Date;

import org.springframework.stereotype.Component;

import lombok.Data;

@Data
@Component
public class ErrorDto {
  
  private String type;
  private String message;
  private Date timestamp;

  public ErrorDto() {
    timestamp = new Date();
  }

  public ErrorDto(String type, String message) {
    this();
    this.type = type;
    this.message = message;
  }

}