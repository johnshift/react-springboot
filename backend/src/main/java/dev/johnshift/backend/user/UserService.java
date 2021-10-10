package dev.johnshift.backend.user;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
  
  private final UserRepository userRepo;

  public List<User> getUsers() {

    return userRepo.findAll();
  }

  public User getUserById(Long id) {

    return userRepo.findById(id)
        .orElseThrow(() -> new UserException(UserException.NOT_FOUND));
  }

  public User createUser(UserDto dto) {

    User user = new User();
    user.setUsername(dto.getUsername());
    user.setPassword(dto.getPassword());

    return userRepo.save(user);
  }

}
