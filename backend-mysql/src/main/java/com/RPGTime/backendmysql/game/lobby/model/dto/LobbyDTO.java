package com.RPGTime.backendmysql.game.lobby.model.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LobbyDTO {

    private Long id;

    @NotNull
    @Size(min = 1, max = 100)
    private String name;

    @Size(max = 500)
    private String description;

    private boolean isPublic;

    @Size(max = 50)
    private String password;
}
