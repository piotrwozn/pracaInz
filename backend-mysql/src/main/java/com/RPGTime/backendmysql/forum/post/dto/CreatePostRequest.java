package com.RPGTime.backendmysql.forum.post.dto;

import lombok.Data;

@Data
public class CreatePostRequest {
    private Long topicId;
    private String content;
}
