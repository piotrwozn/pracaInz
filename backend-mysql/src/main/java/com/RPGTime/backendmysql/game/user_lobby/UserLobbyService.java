package com.RPGTime.backendmysql.game.user_lobby;

import com.RPGTime.backendmysql.game.lobby.model.Lobby;
import com.RPGTime.backendmysql.game.user_lobby.model.UserLobby;
import com.RPGTime.backendmysql.game.user_lobby.model.UserRole;
import com.RPGTime.backendmysql.general.user.UserService;
import com.RPGTime.backendmysql.general.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserLobbyService {
    private final UserLobbyRepository userLobbyRepository;
    private final UserService userService;

    public boolean addUserToLobby(Lobby lobby) {
        User user = userService.getUserProfile();
        if (user != null) {
            UserLobby userLobby = new UserLobby();
            userLobby.setUser(user);
            userLobby.setLobby(lobby);
            userLobby.setUserRole(UserRole.GAME_MASTER);
            userLobbyRepository.save(userLobby);
            return true;
        } else {
            return false;
        }
    }

    public boolean createConnection(Lobby lobby,User user, String password) {
        if(user != null) {
            if(lobby.isPublic()) {
                if (userLobbyRepository.findByUserAndLobby(user, lobby).isPresent()) {
                    return true;
                } else {
                    UserLobby userLobby = new UserLobby();
                    userLobby.setUser(user);
                    userLobby.setLobby(lobby);
                    userLobby.setUserRole(UserRole.PLAYER);
                    userLobbyRepository.save(userLobby);
                    return true;
                }
            } else {
                if(userLobbyRepository.findByUserAndLobby(user, lobby).isPresent()) {
                    return true;
                } else {
                    if(password != null && password.equals(lobby.getPassword())) {
                        UserLobby userLobby = new UserLobby();
                        userLobby.setUser(user);
                        userLobby.setLobby(lobby);
                        userLobby.setUserRole(UserRole.PLAYER);
                        userLobbyRepository.save(userLobby);
                        return true;
                    }
                    return false;
                }
            }
        } else {
            return false;
        }
    }
}
