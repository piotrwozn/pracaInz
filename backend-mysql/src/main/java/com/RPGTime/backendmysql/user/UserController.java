package com.RPGTime.backendmysql.user;

import com.RPGTime.backendmysql.user.dto.UserDto;
import com.RPGTime.backendmysql.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin()
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserDto> getMyProfile() {
        return new ResponseEntity<>(userService.getMyProfile(), HttpStatus.OK);
    }

    @PutMapping("/me")
    public ResponseEntity<String> updateMyProfile(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.updateMyProfile(userDto), HttpStatus.OK);
    }

}
