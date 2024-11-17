package com.RPGTime.backendmysql.game.user_lobby;

import com.RPGTime.backendmysql.game.user_lobby.model.UserLobby;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserLobbyRepository extends JpaRepository<UserLobby, Long> {

}
