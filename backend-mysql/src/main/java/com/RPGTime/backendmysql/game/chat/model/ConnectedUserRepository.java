package com.RPGTime.backendmysql.game.chat.model;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectedUserRepository extends JpaRepository<ConnectedUser, Long> {
    List<ConnectedUser> findBySessionId(String sessionId);

    Optional<ConnectedUser> findBySessionIdAndUsername(String username, String sessionId);
    void deleteAllByUsername(String username);
}
