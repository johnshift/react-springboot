package dev.johnshift.backend.user;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.reactive.server.WebTestClient;
import org.springframework.web.reactive.function.BodyInserters;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@Sql({"/db/users_schema.sql", "/db/users_sample.sql"})
public class UserIT {

  @Autowired
  WebTestClient webTestClient;

  @Autowired
  UserRepository userRepo;

  @Autowired
  UserService userService;
  
  @Test
  public void get_users_OK() throws Exception {

    webTestClient
      .get()
      .uri("/users")
      .exchange()
      .expectStatus().isOk()
      .expectBody()
      .jsonPath("$[0].id").isEqualTo(1L)
      .jsonPath("$[1].id").isEqualTo(2L)
      .jsonPath("$[2].id").isEqualTo(3L)
      .jsonPath("$[0].username").isEqualTo("user1")
      .jsonPath("$[1].username").isEqualTo("user2")
      .jsonPath("$[2].username").isEqualTo("user3")
      .jsonPath("$[0].password")
        .isEqualTo("YAu0A22EzG7LrAG4egWvmTBHyGGMPdyejdYq8qBHYVK5d7nPCOVvnPdQNVjDpRig")
      .jsonPath("$[1].password")
        .isEqualTo("ZxDKsUpC0041tLYCBaeFDroC13SUQZ6hB8bxahBuEWTK3jpRbpwUSzcyxTjTZnxq")
      .jsonPath("$[2].password")
        .isEqualTo("s5OeY8t7VX07PuJ2ov75qiO59Es5QhEgat9YJZli8322UIuPpoNIwdMTknE06aLZ");
  }

  @Test
  public void create_users_OK() throws Exception {


    UserDto user = new UserDto();
    user.setUsername("johnshift");
    user.setPassword("sadfgasd");

    webTestClient
      .post()
      .uri("/users")
      .contentType(MediaType.APPLICATION_JSON)
      .body(BodyInserters.fromValue(user))
      .exchange()
      .expectStatus().isCreated()
      .expectBody()
      .jsonPath("$.id").isNumber()
      .jsonPath("$.username").isEqualTo(user.getUsername())
      .jsonPath("$.password").isEqualTo(user.getPassword());


  }
}
