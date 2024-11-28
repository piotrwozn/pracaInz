package com.RPGTime.backendmysql.game.chat;

import com.RPGTime.backendmysql.game.chat.model.ConnectedUser;
import com.RPGTime.backendmysql.game.chat.model.ConnectedUserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class WebSocketEventListener {

    private final ConnectedUserRepository connectedUserRepository;
    private final SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        System.out.println("handleWebSocketConnectListener invoked");

        Authentication authentication = (Authentication) event.getUser();

        if (authentication != null) {
            String username = authentication.getName();
            StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
            String sessionId = (String) accessor.getSessionAttributes().get("sessionId");

            System.out.println("Authentication is not null. Username: " + username + ", Session ID: " + sessionId);

            if (sessionId != null) {
                ConnectedUser sessionUser = new ConnectedUser();
                sessionUser.setUsername(username);
                sessionUser.setSessionId(sessionId);
                connectedUserRepository.save(sessionUser);

                sendSessionUserUpdate(sessionId);
                System.out.println("User Connected: " + username + ", Session ID: " + sessionId);
            } else {
                System.out.println("Session ID is null in handleWebSocketConnectListener");
            }
        } else {
            System.out.println("Authentication is null in handleWebSocketConnectListener");
        }
    }

    @EventListener
    @Transactional
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        Principal principal = event.getUser();

        if (principal != null) {
            String username = principal.getName();

            connectedUserRepository.deleteAllByUsername(username);

            System.out.println("User Disconnected: Username: " + username + ", Session ID: " + sessionId);
        } else {
            System.out.println("Principal is null in handleWebSocketDisconnectListener");
        }
    }

    private void sendSessionUserUpdate(String sessionId) {
        List<ConnectedUser> users = connectedUserRepository.findBySessionId(sessionId);
        messagingTemplate.convertAndSend("/topic/session-users/" + sessionId, users);
    }
}
