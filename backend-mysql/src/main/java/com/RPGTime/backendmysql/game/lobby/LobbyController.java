package com.RPGTime.backendmysql.game.lobby;

import com.RPGTime.backendmysql.game.lobby.model.Lobby;
import com.RPGTime.backendmysql.game.lobby.model.dto.*;
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

    @GetMapping("/usersLobby")
    public ResponseEntity<List<Lobby>> getUsersLobbies() {
        return new ResponseEntity<>(lobbyService.getUsersLobbies(), HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<?> joinLobby(@RequestBody JoinLobbyRequest request) {
        return new ResponseEntity<>(lobbyService.joinLobby(request.getLobbyId(), request.getPassword()));
    }

    @PostMapping
    public ResponseEntity<String> createLobby(@RequestBody LobbyDTO lobbyDTO) {
        return new ResponseEntity<>(lobbyService.createLobby(lobbyDTO), HttpStatus.OK);
    }

    @PostMapping("/leave")
    public ResponseEntity<?> leaveLobby(@RequestBody LeaveLobbyRequest request) {
        return new ResponseEntity<>(lobbyService.leaveLobby(request.getLobbyId()));
    }

}
