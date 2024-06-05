package com.RPGTime.backendmysql.user;

import com.RPGTime.backendmysql.user.dto.UserDto;
import com.RPGTime.backendmysql.user.model.User;
import com.RPGTime.backendmysql.lobby.LobbyRepository;
import com.RPGTime.backendmysql.lobby.model.Lobby;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private LobbyRepository lobbyRepository;

    public UserDto getMyProfile() {
        Optional<User> userOptional = getOptionalUser();
        return userOptional.map(this::convertToDto).orElse(null);
    }

    public String updateMyProfile(UserDto userDto) {
        Optional<User> userOptional = getOptionalUser();
        User user = null;


        if (userOptional.isPresent()) {
            user = userOptional.get();
            if (!userDto.getUsername().isEmpty()) {
                if (userRepository.findByUsername(userDto.getUsername()).isEmpty()) {
                    user.setUsername(userDto.getUsername());
                } else {
                    return "UsernameTaken";
                }
            } else if (!userDto.getEmail().isEmpty()) {
                if (userRepository.findByEmail(userDto.getEmail()).isEmpty()) {
                    user.setEmail(userDto.getEmail());
                } else {
                    return "EmailTaken";
                }
            }
        }
        assert user != null;
        userRepository.save(user);

        return "SaveComplete";
    }

    public String deleteMyProfile() {
        Optional<User> userOptional = getOptionalUser();
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            userRepository.delete(user);
        } else {
            return "UserNotFound";
        }
        return "DeleteComplete";
    }

    public List<Lobby> getUserLobby() {
        Optional<User> userOptional = getOptionalUser();
        if(userOptional.isPresent()) {
            return lobbyRepository.getLobbiesByUsersContains(userOptional.get());
        } else {
            return new ArrayList<>();
        }
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
