package com.RPGTime.backendmysql.forum.topic.dto;

import lombok.Data;
import java.util.List;

@Data
public class CreateTopicRequest {
    private String title;
    private String contents;
    private List<Long> categoryIds;
}
