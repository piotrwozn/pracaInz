// com/RPGTime/backendmysql/game/chat/ChatController.java

package com.RPGTime.backendmysql.game.chat;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class ChatController {

    @MessageMapping("/chat/{sessionId}")
    @SendTo("/topic/messages/{sessionId}")
    public ChatMessage sendMessage(ChatMessage message, Principal principal) {
        if (principal != null) {
            String username = principal.getName();
            message.setSender(username);
        } else {
            message.setSender("Unknown");
        }
        return message;
    }
}
