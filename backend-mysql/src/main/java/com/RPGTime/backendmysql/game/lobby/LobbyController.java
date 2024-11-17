package com.RPGTime.backendmysql.game.lobby;

import com.RPGTime.backendmysql.game.lobby.model.Lobby;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@CrossOrigin()
@RequestMapping("/api/lobby")
public class LobbyController {
    private final LobbyService lobbyService;

    @GetMapping("/public")
    public ResponseEntity<List<Lobby>> getPublicLobbies() {
        return new ResponseEntity<>(lobbyService.getPublicLobbies(), HttpStatus.OK);
    }
}
