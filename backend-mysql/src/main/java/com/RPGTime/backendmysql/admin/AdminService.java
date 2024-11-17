package com.RPGTime.backendmysql.admin;

import com.RPGTime.backendmysql.general.user.UserRepository;
import com.RPGTime.backendmysql.general.user.dto.UserDto;
import com.RPGTime.backendmysql.general.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    public List<UserDto> allUsers() {
        return userRepository.findAll()
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public UserDto getUser(String id) {
        return userRepository.findById(parseId(id))
                .map(this::convertToDto)
                .orElse(null);
    }

    public UserDto convertToDto(User user) {
        return new UserDto(user.getUsername(), user.getEmail(), user.getRole().name());
    }


    private static long parseId(String id) {
        try{
            return Long.parseLong(id);
        }catch (NumberFormatException e) {
            return -1;
        }
    }
}
