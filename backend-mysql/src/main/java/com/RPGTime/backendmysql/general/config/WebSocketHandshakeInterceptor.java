// com/RPGTime/backendmysql/general/config/WebSocketHandshakeInterceptor.java

package com.RPGTime.backendmysql.general.config;

import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;

@Component
public class WebSocketHandshakeInterceptor extends HttpSessionHandshakeInterceptor {

    @Override
    public boolean beforeHandshake(
            ServerHttpRequest request,
            ServerHttpResponse response,
            WebSocketHandler wsHandler,
            Map<String, Object> attributes) throws Exception {

        System.out.println("WebSocketHandshakeInterceptor - beforeHandshake invoked");

        MultiValueMap<String, String> queryParams = UriComponentsBuilder.fromUri(request.getURI())
                .build()
                .getQueryParams();

        List<String> tokenList = queryParams.get("access_token");
        List<String> sessionIdList = queryParams.get("sessionId");

        if (tokenList != null && !tokenList.isEmpty()) {
            String token = tokenList.get(0);
            attributes.put("token", token);
            System.out.println("Token extracted: " + token);
        } else {
            System.out.println("Token not found in query parameters");
        }

        if (sessionIdList != null && !sessionIdList.isEmpty()) {
            String sessionId = sessionIdList.get(0);
            attributes.put("sessionId", sessionId);
            System.out.println("Session ID extracted: " + sessionId);
        } else {
            System.out.println("Session ID not found in query parameters");
        }

        return super.beforeHandshake(request, response, wsHandler, attributes);
    }

}
