// com/RPGTime/backendmysql/chat/ChatMessage.java
package com.RPGTime.backendmysql.game.chat;

public class ChatMessage {
    private String content;
    private String sender;

    // Getters and setters
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
}
