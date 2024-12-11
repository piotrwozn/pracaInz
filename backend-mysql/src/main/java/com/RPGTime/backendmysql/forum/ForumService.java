package com.RPGTime.backendmysql.forum;

import com.RPGTime.backendmysql.forum.category.Category;
import com.RPGTime.backendmysql.forum.category.CategoryRepository;
import com.RPGTime.backendmysql.forum.post.Post;
import com.RPGTime.backendmysql.forum.post.PostRepository;
import com.RPGTime.backendmysql.forum.post.dto.CreatePostRequest;
import com.RPGTime.backendmysql.forum.topic.Topic;
import com.RPGTime.backendmysql.forum.topic.TopicRepository;
import com.RPGTime.backendmysql.forum.topic.dto.CreateTopicRequest;
import com.RPGTime.backendmysql.general.user.UserService;
import com.RPGTime.backendmysql.general.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ForumService {

    private final TopicRepository topicRepository;
    private final CategoryRepository categoryRepository;
    private final UserService userService;
    private final PostRepository postRepository; // Dodaj to repozytorium

    public List<Topic> getUserTopics() {
        User user = userService.getUserProfile();
        return topicRepository.findByAuthor(user);
    }

    public List<Topic> getAllTopics() {
        return topicRepository.findAll();
    }

    public List<Topic> getRelatedTopics() {
        User user = userService.getUserProfile();
        return topicRepository.findRelatedTopicsByUser(user);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Topic createTopic(CreateTopicRequest request) {
        User author = userService.getUserProfile();

        if (request.getCategoryIds() == null || request.getCategoryIds().isEmpty()) {
            throw new IllegalArgumentException("At least one category must be selected");
        }

        List<Category> chosenCategories = categoryRepository.findAllById(request.getCategoryIds());
        if (chosenCategories.isEmpty()) {
            throw new IllegalArgumentException("At least one category must be selected");
        }

        Topic topic = new Topic();
        topic.setTitle(request.getTitle());
        topic.setContents(request.getContents());
        topic.setAuthor(author);
        topic.setCategories(new HashSet<>(chosenCategories));
        return topicRepository.save(topic);
    }

    public Topic getTopicById(Long topicId) {
        return topicRepository.findById(topicId)
                .orElseThrow(() -> new RuntimeException("Topic not found"));
    }

    public void createPost(CreatePostRequest request) {
        User author = userService.getUserProfile();
        Topic topic = topicRepository.findById(request.getTopicId())
                .orElseThrow(() -> new RuntimeException("Topic not found"));

        Post post = new Post();
        post.setTopic(topic);
        post.setAuthor(author);
        post.setContent(request.getContent());
        postRepository.save(post);
    }
}
