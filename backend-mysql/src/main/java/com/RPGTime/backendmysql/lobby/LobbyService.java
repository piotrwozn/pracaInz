package com.RPGTime.backendmysql.lobby;

import com.RPGTime.backendmysql.lobby.model.Lobby;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LobbyService {
    private LobbyRepository lobbyRepository;


    public List<Lobby> getPublicLobbies() {
        return lobbyRepository.getLobbiesByIsPublicIsTrue();
    }
}
