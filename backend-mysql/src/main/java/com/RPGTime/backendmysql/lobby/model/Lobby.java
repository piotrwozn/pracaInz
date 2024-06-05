package com.RPGTime.backendmysql.lobby.model;

import com.RPGTime.backendmysql.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Lobby")
@Table
public class Lobby {

    @Id
    @SequenceGenerator(name = "lobby_sequence", sequenceName = "lobby_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lobby_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "name", updatable = true)
    private String name;

    @Column(name = "description", updatable = true)
    private String description;

    @ManyToMany(mappedBy = "userLobby")
    private Set<User> users;

    @Column(name = "is_public")
    private boolean isPublic;
}
