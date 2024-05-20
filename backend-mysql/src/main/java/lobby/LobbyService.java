package lobby;

import org.springframework.stereotype.Service;

@Service
public class LobbyService {
    private final LobbyRepository lobbyRepository;

    public LobbyService(LobbyRepository lobbyRepository) {
        this.lobbyRepository = lobbyRepository;
    }


}
