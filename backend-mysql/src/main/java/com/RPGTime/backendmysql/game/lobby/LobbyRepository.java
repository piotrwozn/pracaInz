package com.RPGTime.backendmysql.game.lobby;

import com.RPGTime.backendmysql.game.lobby.model.Lobby;
import com.RPGTime.backendmysql.game.user_lobby.model.UserLobby;
import org.apache.kafka.common.protocol.types.Field;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LobbyRepository extends JpaRepository<Lobby, Long> {

    @Query("""
        SELECT l FROM LOBBY l
        WHERE l.isPublic = true
        AND NOT EXISTS (
            SELECT ul FROM USER_LOBBY ul
            WHERE ul.lobby = l
            AND ul.user.id = :userId
        )
    """)
    List<Lobby> getPublicLobbiesWithoutSpecificUser(@Param("userId") Long userId);

    @Query("""
        SELECT DISTINCT l FROM LOBBY l
        JOIN l.userLobby ul
        WHERE ul.user.id = :userId
    """)
    List<Lobby> getLobbiesByUserId(@Param("userId") Long userId);

    Optional<Lobby> findLobbyByPassword(String password);

}
