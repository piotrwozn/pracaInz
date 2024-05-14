package lobby;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin()
@RequestMapping("/api/lobby")
public class LobbyController {
    private final LobbyService lobbyService;

}
