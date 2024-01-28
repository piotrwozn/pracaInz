package com.RPGTime.backendmysql.services;

import com.RPGTime.backendmysql.enums.Role;
import com.RPGTime.backendmysql.models.User;
import com.RPGTime.backendmysql.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> allUsers() {
        return userRepository.findAll();
    }

    public User getUser(String id) {
        Optional<User> optionalUser = userRepository.findById(parseId(id));

        return optionalUser.orElse(null);
    }

    public String register(Map<String, String> payload) {
        Optional<User> optionalUser = userRepository.findByUsername(payload.get("username"));

        if(optionalUser.isPresent()) {
            return "UsernameTaken";
        }

        optionalUser = userRepository.findByEmail(payload.get("email"));

        if(optionalUser.isPresent()) {
            return "EmailTaken";
        }

        User user = new User(payload.get("username"),payload.get("password"),payload.get("email"), Role.USER);
        userRepository.save(user);

        return "UserAdded";

    }

    private static long parseId(String id) {
        try{
            return Long.parseLong(id);
        }catch (NumberFormatException e) {
            return -1;
        }

    }

}
