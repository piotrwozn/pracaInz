package com.RPGTime.backendmysql.game.lobby.model.dto;

import lombok.Data;

@Data
public class JoinLobbyRequest {
    private Long lobbyId;
    private String password;
}