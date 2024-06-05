package com.RPGTime.backendmysql.lobby;

import com.RPGTime.backendmysql.lobby.model.Lobby;
import com.RPGTime.backendmysql.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LobbyRepository extends JpaRepository<Lobby, Long> {
    List<Lobby> getLobbiesByIsPublicIsTrue();
    List<Lobby> getLobbiesByUsersContains(User user);
}