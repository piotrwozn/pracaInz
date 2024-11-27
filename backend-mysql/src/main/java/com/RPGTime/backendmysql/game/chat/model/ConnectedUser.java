// ConnectedUser.java

package com.RPGTime.backendmysql.game.chat.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "connected_user")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ConnectedUser {

    @Id
    @SequenceGenerator(name = "USER_SEQUENCE", sequenceName = "USER_SEQUENCE", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SEQUENCE")
    @Column(name = "ID", updatable = false)
    private long id;

    private String username;
    private String sessionId;

}
