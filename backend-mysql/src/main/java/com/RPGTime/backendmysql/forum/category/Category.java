package com.RPGTime.backendmysql.forum.category;

import com.RPGTime.backendmysql.forum.topic.Topic;
import jakarta.persistence.*;
import lombok.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.Set;
import java.util.HashSet;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "CATEGORY")
@Table(name = "CATEGORY")
public class Category {

    @Id
    @SequenceGenerator(
            name = "CATEGORY_SEQUENCE",
            sequenceName = "CATEGORY_SEQUENCE",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "CATEGORY_SEQUENCE"
    )
    @Column(name = "ID", updatable = false)
    private Long id;

    @Column(name = "NAME", nullable = false, unique = true)
    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @Column(name = "DESCRIPTION")
    @Size(max = 500)
    private String description;

    @OneToMany(
            mappedBy = "category",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private Set<Topic> topics = new HashSet<>();
}