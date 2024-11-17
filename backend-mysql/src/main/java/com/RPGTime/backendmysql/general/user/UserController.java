package com.RPGTime.backendmysql.general.user;

import com.RPGTime.backendmysql.general.user.dto.UserChangeDto;
import com.RPGTime.backendmysql.general.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<String> updateMyProfile(@RequestBody UserChangeDto userDto) {
        return new ResponseEntity<>(userService.updateMyProfile(userDto), HttpStatus.OK);
    }

    @DeleteMapping("/me")
    public ResponseEntity<String> deleteMyProfile(@RequestBody String password) {
        return new ResponseEntity<>(userService.deleteMyProfile(password), HttpStatus.OK);
    }
    

}
