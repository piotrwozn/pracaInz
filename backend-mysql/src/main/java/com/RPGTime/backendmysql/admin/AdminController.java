package com.RPGTime.backendmysql.admin;

import com.RPGTime.backendmysql.user.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/admin")
public class AdminController {
    private final AdminService adminService;

    @GetMapping("user/all")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return new ResponseEntity<>(adminService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("user/{id}")
    public ResponseEntity<UserDto> getUser(@PathVariable String id) {
        return new ResponseEntity<>(adminService.getUser(id),HttpStatus.OK);
    }

}
