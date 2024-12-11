package com.RPGTime.backendmysql.forum;

import com.RPGTime.backendmysql.forum.category.Category;
import com.RPGTime.backendmysql.forum.post.dto.CreatePostRequest;
import com.RPGTime.backendmysql.forum.topic.Topic;
import com.RPGTime.backendmysql.forum.topic.dto.CreateTopicRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@CrossOrigin()
@RequestMapping("/api/forum")
@RequiredArgsConstructor
public class ForumController {

    private final ForumService forumService;

    @GetMapping("/topics/user")
    public ResponseEntity<List<Topic>> getUserTopics() {
        return ResponseEntity.ok(forumService.getUserTopics());
    }

    @GetMapping("/topics/all")
    public ResponseEntity<List<Topic>> getAllTopics() {
        return ResponseEntity.ok(forumService.getAllTopics());
    }

    @GetMapping("/topics/related")
    public ResponseEntity<List<Topic>> getRelatedTopics() {
        return ResponseEntity.ok(forumService.getRelatedTopics());
    }

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(forumService.getAllCategories());
    }

    @PostMapping("/topics")
    public ResponseEntity<Topic> createTopic(@RequestBody CreateTopicRequest request) {
        Topic created = forumService.createTopic(request);
        return ResponseEntity.ok(created);
    }

    // Nowe endpointy

    @GetMapping("/topics/{id}")
    public ResponseEntity<Topic> getTopicDetails(@PathVariable Long id) {
        Topic topic = forumService.getTopicById(id);
        return ResponseEntity.ok(topic);
    }

    @PostMapping("/posts")
    public ResponseEntity<?> createPost(@RequestBody CreatePostRequest request) {
        forumService.createPost(request);
        return ResponseEntity.ok().build();
    }
}
