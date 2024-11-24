package com.RPGTime.backendmysql.general.user;

import com.RPGTime.backendmysql.general.user.dto.UserChangeDto;
import com.RPGTime.backendmysql.general.user.dto.UserDto;
import com.RPGTime.backendmysql.general.user.model.User;
import com.RPGTime.backendmysql.game.lobby.LobbyRepository;
import com.RPGTime.backendmysql.game.lobby.model.Lobby;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserDto getMyProfile() {
        Optional<User> userOptional = getOptionalUser();
        return userOptional.map(this::convertToDto).orElse(null);
    }

    public User getUserProfile() {
        Optional<User> userOptional = getOptionalUser();
        return userOptional.orElse(null);
    }

    public String updateMyProfile(UserChangeDto userDto) {
        Optional<User> userOptional = getOptionalUser();
        if (!userOptional.isPresent()) {
            return "UserNotFound";
        }
        User user = userOptional.get();

        boolean isUpdated = false;

        if (userDto.getUsername() != null) {
            if (userRepository.findByUsername(userDto.getUsername()).isEmpty()) {
                user.setUsername(userDto.getUsername());
                isUpdated = true;
            } else {
                return "UsernameTaken";
            }
        }

        if (userDto.getEmail() != null) {
            if (userRepository.findByEmail(userDto.getEmail()).isEmpty()) {
                user.setEmail(userDto.getEmail());
                isUpdated = true;
            } else {
                return "EmailTaken";
            }
        }

        if (userDto.getNewPassword() != null) {
            if (passwordEncoder.matches(userDto.getOldPassword(), user.getPassword())) {
                user.setPassword(passwordEncoder.encode(userDto.getNewPassword()));
                isUpdated = true;
            } else {
                return "WrongOldPassword";
            }
        }

        if (isUpdated) {
            userRepository.save(user);
            return "SaveComplete";
        } else {
            return "NoChangesMade";
        }
    }

    @Transactional
    public String deleteMyProfile(String password) {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (password != null && passwordEncoder.matches(password, user.getPassword())) {
                try {
                    userRepository.delete(user);
                } catch (Exception e) {
                    return "DeletionFailed";
                }
            } else {
                return "WrongPassword";
            }
        } else {
            return "UserNotFound";
        }
        return "DeleteComplete";
    }


    private Optional<User> getOptionalUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        return userRepository.findByUsername(username);
    }

    private UserDto convertToDto(User user) {
        return new UserDto(user.getUsername(), user.getEmail(), user.getRole().name());
    }

}
