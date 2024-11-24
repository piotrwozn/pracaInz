package com.RPGTime.backendmysql.game.lobby.model;

import com.RPGTime.backendmysql.game.user_lobby.model.UserLobby;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "LOBBY")
@Table
public class Lobby {

    @Id
    @SequenceGenerator(name = "LOBBY_SEQUENCE", sequenceName = "LOBBY_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "LOBBY_SEQUENCE")
    @Column(name = "ID", updatable = false)
    private Long id;

    @Column(name = "NAME", nullable = false)
    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @Column(name = "DESCRIPTION")
    @Size(max = 500)
    private String description;

    @OneToMany(mappedBy = "lobby", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<UserLobby> userLobby = new HashSet<>();

    @Column(name = "IS_PUBLIC", nullable = false)
    private boolean isPublic;

    @Column(name = "PASSWORD")
    @Size(max = 50)
    private String password;
}