package com.RPGTime.backendmysql.game.user_lobby;

import com.RPGTime.backendmysql.game.lobby.model.Lobby;
import com.RPGTime.backendmysql.game.user_lobby.model.UserLobby;
import com.RPGTime.backendmysql.general.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserLobbyRepository extends JpaRepository<UserLobby, Long> {

    Optional<UserLobby> findByUserAndLobby(User user, Lobby lobby);
}
