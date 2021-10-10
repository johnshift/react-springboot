package dev.johnshift.backend.user;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
  
  private Long id;
  private String username;
  private String password;

  public static UserDto of(User user) {
    return new UserDto(user.getId(), user.getUsername(), user.getPassword());
  }

  public static List<UserDto> of(List<User> users) {

    List<UserDto> dtos = new ArrayList<>();
    for (User user : users) {
      dtos.add(UserDto.of(user));
    }
    
    return dtos;
  }
}

