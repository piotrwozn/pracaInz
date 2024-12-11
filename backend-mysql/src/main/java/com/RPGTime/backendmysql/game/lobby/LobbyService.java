package com.RPGTime.backendmysql.game.lobby;

import com.RPGTime.backendmysql.game.lobby.model.Lobby;
import com.RPGTime.backendmysql.game.lobby.model.dto.LobbyDTO;
import com.RPGTime.backendmysql.game.user_lobby.UserLobbyService;
import com.RPGTime.backendmysql.general.user.UserService;
import com.RPGTime.backendmysql.general.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LobbyService {

    private final LobbyRepository lobbyRepository;
    private final UserService userService;
    private final UserLobbyService userLobbyService;

    public List<Lobby> getPublicLobbies() {
        return lobbyRepository.getPublicLobbiesWithoutSpecificUser(userService.getUserProfile().getId());
    }

    public String createLobby(LobbyDTO lobbyDto) {

        boolean isPublic = lobbyDto.getPassword() == null || lobbyDto.getPassword().isBlank();

        if(!isPublic) {
            if(lobbyRepository.findLobbyByPassword(lobbyDto.getPassword()).isPresent()) {
                return "Password already taken";
            }
        }

        Lobby lobby = new Lobby();
        lobby.setName(lobbyDto.getName());
        lobby.setDescription(lobbyDto.getDescription());
        lobby.setPublic(isPublic);
        lobby.setPassword(isPublic ? null : lobbyDto.getPassword());
        lobbyRepository.save(lobby);
        userLobbyService.addUserToLobby(lobby);
        return "Success";
    }

    public List<Lobby> getUsersLobbies() {
        return lobbyRepository.getLobbiesByUserId(userService.getUserProfile().getId());
    }

    public HttpStatusCode joinLobby(Long lobbyId, String password) {
        User user = userService.getUserProfile();
        Optional<Lobby> optionalLobby;
        if (lobbyId == null) {
            optionalLobby = lobbyRepository.findLobbyByPassword(password);
        } else {
            optionalLobby = lobbyRepository.findById(lobbyId);
        }

        if (user != null && optionalLobby.isPresent()) {
            Lobby lobby = optionalLobby.get();
            boolean ans;
            if(lobby.isPublic()) {
                ans = userLobbyService.createConnection(lobby, user, null);
            } else {
                ans = userLobbyService.createConnection(lobby, user, password);
            }

            if(ans) {
                return HttpStatus.OK;
            } else {
                return HttpStatus.valueOf(403);
            }
        }
        return HttpStatus.valueOf(403);
    }

    public HttpStatusCode leaveLobby(Long lobbyId) {
        User user = userService.getUserProfile();

        Optional<Lobby> optionalLobby = lobbyRepository.findById(lobbyId);
        if (optionalLobby.isPresent()) {
            Lobby lobby = optionalLobby.get();
            boolean result = userLobbyService.removeUserFromLobby(lobby, user);
            if (result) {
                return HttpStatus.OK;
            } else {
                return HttpStatus.NOT_FOUND;
            }
        } else {
            return HttpStatus.NOT_FOUND;
        }
    }


}
