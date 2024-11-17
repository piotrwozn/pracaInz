package com.RPGTime.backendmysql.game.lobby;

import com.RPGTime.backendmysql.game.lobby.model.Lobby;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LobbyService {
    private LobbyRepository lobbyRepository;


    public List<Lobby> getPublicLobbies() {
        return lobbyRepository.getLobbiesByIsPublicIsTrue();
    }
}
