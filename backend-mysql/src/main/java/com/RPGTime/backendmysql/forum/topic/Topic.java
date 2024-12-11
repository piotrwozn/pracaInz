package com.RPGTime.backendmysql.forum.topic;

import com.RPGTime.backendmysql.forum.category.Category;
import com.RPGTime.backendmysql.forum.post.Post;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Set;
import java.util.HashSet;
import java.time.LocalDateTime;
import com.RPGTime.backendmysql.general.user.model.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "TOPIC")
@Table(name = "TOPIC")
public class Topic {

    @Id
    @SequenceGenerator(
            name = "TOPIC_SEQUENCE",
            sequenceName = "TOPIC_SEQUENCE",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "TOPIC_SEQUENCE"
    )
    @Column(name = "ID", updatable = false)
    private Long id;

    @Column(name = "TITLE", nullable = false)
    @NotNull
    @Size(min = 1, max = 200)
    private String title;

    @Column(name = "CONTENTS", nullable = false)
    @NotNull
    @Size(min = 1, max = 500)
    private String contents;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private User author;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Rodzic w relacji Topic-Post
    private Set<Post> posts = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "TOPIC_CATEGORY",
            joinColumns = @JoinColumn(name = "TOPIC_ID"),
            inverseJoinColumns = @JoinColumn(name = "CATEGORY_ID")
    )
    @JsonManagedReference("topic-categories") // Zarządzana strona relacji z Category
    private Set<Category> categories = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
