// com/RPGTime/backendmysql/general/config/JwtChannelInterceptor.java

package com.RPGTime.backendmysql.general.config;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.messaging.support.ChannelInterceptor;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

@RequiredArgsConstructor
@Component
public class JwtChannelInterceptor implements ChannelInterceptor {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {

        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);

        if (StompCommand.CONNECT.equals(accessor.getCommand()) || StompCommand.SEND.equals(accessor.getCommand())) {
            String jwtToken = (String) accessor.getSessionAttributes().get("token");
            String sessionId = (String) accessor.getSessionAttributes().get("sessionId");

            System.out.println("JwtChannelInterceptor - preSend invoked");
            System.out.println("Token from session attributes: " + jwtToken);
            System.out.println("Session ID from session attributes: " + sessionId);

            if (jwtToken != null) {
                if (jwtToken.startsWith("Bearer ")) {
                    jwtToken = jwtToken.substring(7);
                }

                String username = jwtService.extractUsername(jwtToken);
                UserDetails userDetails = userDetailsService.loadUserByUsername(username);

                if (jwtService.isTokenValid(jwtToken, userDetails)) {
                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities());
                    accessor.setUser(authentication);
                    System.out.println("Authentication set in accessor for user: " + username);

                    if (sessionId != null) {
                        accessor.getSessionAttributes().put("sessionId", sessionId);
                    }
                } else {
                    System.out.println("Token is invalid");
                }
            } else {
                System.out.println("JWT token is null");
            }
        }

        return MessageBuilder.createMessage(message.getPayload(), accessor.getMessageHeaders());
    }
}