package dev.johnshift.backend.user;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import dev.johnshift.backend.utils.Generate;

@ExtendWith(SpringExtension.class)
public class UserServiceTest {

  @Mock
  UserRepository userRepo;

  @InjectMocks
  UserService svc;

  private final User user = Generate.user();
  private final List<User> users = Generate.users();

  @Test
  public void getUsers_OK() {

    when(userRepo.findAll()).thenReturn(users);

    List<User> result = svc.getUsers();

    assertEquals(users, result);
  }

  @Test
  public void getUser_OK() {

    when(userRepo.findById(anyLong())).thenReturn(Optional.of(user));

    User result = svc.getUserById(user.getId());

    assertEquals(user.getId(), result.getId());
    assertEquals(user.getUsername(), result.getUsername());
    assertEquals(user.getPassword(), result.getPassword());

  }

  @Test
  public void getUser_NotFound() {

    when(userRepo.findById(anyLong())).thenThrow(UserException.class);

    assertThrows(UserException.class, () -> svc.getUserById(0L));
  }

  @Test
  public void createUser_OK() {
    when(userRepo.save(any())).thenReturn(user);
    UserDto req = new UserDto(
      user.getId(), user.getUsername(), user.getPassword()
    );

    User result = svc.createUser(req);

    assertEquals(user.getId(), result.getId());
    assertEquals(user.getUsername(), result.getUsername());
    assertEquals(user.getPassword(), result.getPassword());


  }


}
