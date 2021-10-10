package dev.johnshift.backend.user;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import dev.johnshift.backend.exceptions.ApiExceptionHandler;
import dev.johnshift.backend.utils.Generate;

/** . */
@ExtendWith(SpringExtension.class)
@WebMvcTest(controllers = UserController.class)
public class UserControllerTest {
  
  @Autowired
  MockMvc mockMvc;

  @MockBean
  UserRepository userRepo;

  @MockBean
  UserService svc;

  User user = Generate.user();
  List<User> users = Generate.users();

  @Autowired
  ObjectMapper jsonMapper = new ObjectMapper();

  @Test
  public void get_users_OK() throws Exception {

    when(svc.getUsers()).thenReturn(users);

    mockMvc.perform(get("/users"))

    .andExpect(status().isOk())
    .andExpect(jsonPath("$.length()").value(1))
    .andExpect(jsonPath("$.[0].id").value(users.get(0).getId()))
    .andExpect(jsonPath("$.[0].username").value(users.get(0).getUsername()))
    .andExpect(jsonPath("$.[0].password").value(users.get(0).getPassword()));
  }

  @Test
  public void get_user_OK() throws Exception {

    when(svc.getUserById(anyLong())).thenReturn(user);

    mockMvc.perform(get("/users/" + user.getId()))

    .andExpect(status().isOk())
    .andExpect(jsonPath("$.id").value(user.getId()))
    .andExpect(jsonPath("$.username").value(user.getUsername()))
    .andExpect(jsonPath("$.password").value(user.getPassword()));
  }

  @Test
  public void get_user_nonExistingId_throw_NotFound() throws Exception {

    Long nonExistingId = 1L;
    when(svc.getUserById(anyLong())).thenThrow(new UserException(UserException.NOT_FOUND));

    mockMvc.perform(get("/users/" + nonExistingId))
    
    .andExpect(status().isNotFound())
    .andExpect(jsonPath("$.type").value(UserException.class.getSimpleName()))
    .andExpect(jsonPath("$.message").value(UserException.NOT_FOUND))
    .andExpect(jsonPath("$.timestamp").exists());
  }


  @Test
  public void get_user_invalidId_throw_BadRequest() throws Exception {

    String invalidId = "asdf";

    mockMvc.perform(get("/users/" + invalidId))
      .andExpect(status().isBadRequest())
    .andExpect(jsonPath("$.type").value(ApiExceptionHandler.INVALID_TYPE))
    .andExpect(jsonPath("$.message").value(ApiExceptionHandler.INVALID_TYPE_MSG))
    .andExpect(jsonPath("$.timestamp").exists());
  }

  @Test
  public void post_user_OK() throws Exception {

    when(svc.createUser(any())).thenReturn(user);
    String requestBody = jsonMapper.writeValueAsString(user);

    mockMvc.perform(post("/users")
      .contentType(MediaType.APPLICATION_JSON)
      .content(requestBody))
      

    .andExpect(status().isCreated())
    .andExpect(jsonPath("$.id").value(user.getId()))
    .andExpect(jsonPath("$.username").value(user.getUsername()))
    .andExpect(jsonPath("$.password").value(user.getPassword()));
  }

}
