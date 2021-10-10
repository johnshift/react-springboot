package dev.johnshift.backend.user;


import java.util.List;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import dev.johnshift.backend.exceptions.ErrorDto;
import lombok.RequiredArgsConstructor;

/** . */
@RestController
@RequiredArgsConstructor
public class UserController {

  @Value("${FRONTEND_URL:not_assigned}")
  private String FrontendURL;
  
  private final UserService svc;

  @GetMapping("/env")
  public String handleGetEnv() {

    return "FRONTEND_URL = " + FrontendURL;
  }

  @GetMapping("/branch")
  public String handleGetBranch() {

    return "CICD!!!!";
  }

  @GetMapping("/users")
  public List<UserDto> handleGetUsers() {

    return UserDto.of(svc.getUsers());
  }

  @GetMapping("/users/{id}")
  public UserDto handleGetUser(@PathVariable(name = "id") Long id) {

    return UserDto.of(svc.getUserById(id));
  }

  @PostMapping("/users")
  @ResponseStatus(HttpStatus.CREATED)
  public UserDto handlePostUser(@RequestBody UserDto user) {

    return UserDto.of(svc.createUser(user));
  }


  // ======================================================================
  // ========================== USER EXCEPTIONS ===========================
  // ======================================================================

  /** . */
  @ExceptionHandler(value = {UserException.class})
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public ErrorDto handlerAmbot(WebRequest req, Exception ex) {
    
    return new ErrorDto(
      UserException.class.getSimpleName(), 
      ex.getMessage()
    );
  }

}
