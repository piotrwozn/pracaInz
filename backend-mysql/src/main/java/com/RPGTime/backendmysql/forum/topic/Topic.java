package com.RPGTime.backendmysql.forum.topic;

import com.RPGTime.backendmysql.forum.category.Category;
import com.RPGTime.backendmysql.forum.post.Post;
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

    @ManyToOne
    @JoinColumn(name = "CATEGORY_ID", nullable = false)
    private Category category;

    @Column(name = "TITLE", nullable = false)
    @NotNull
    @Size(min = 1, max = 200)
    private String title;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private User author;

    @OneToMany(
            mappedBy = "topic",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Post> posts = new HashSet<>();

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}