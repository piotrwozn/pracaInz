package com.RPGTime.backendmysql.forum.post;

import com.RPGTime.backendmysql.forum.topic.Topic;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import com.RPGTime.backendmysql.general.user.model.User;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "POST")
@Table(name = "POST")
public class Post {

    @Id
    @SequenceGenerator(
            name = "POST_SEQUENCE",
            sequenceName = "POST_SEQUENCE",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "POST_SEQUENCE"
    )
    @Column(name = "ID", updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "TOPIC_ID", nullable = false)
    private Topic topic;

    @ManyToOne
    @JoinColumn(name = "AUTHOR_ID", nullable = false)
    private User author;

    @Column(name = "CONTENT", nullable = false, columnDefinition = "TEXT")
    @NotNull
    @Size(min = 1)
    private String content;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}