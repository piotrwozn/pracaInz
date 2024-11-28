package com.RPGTime.backendmysql.game.chat.model;

import lombok.RequiredArgsConstructor;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;

@RestController
@CrossOrigin()
@RequiredArgsConstructor
@RequestMapping("/api/connected-users")
public class ConnectedUserController {
    private final ConnectedUserRepository connectedUserRepository;


    @PostMapping
    public ResponseEntity<List<ConnectedUser>> getConnectedUsers(@RequestBody String sessionId) {

        return new ResponseEntity<>(connectedUserRepository.findBySessionId(sessionId), HttpStatus.OK);
    }

}
