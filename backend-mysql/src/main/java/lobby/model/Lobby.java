package lobby.model;

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
@Table
@Entity(name = "Lobby")
public class Lobby {

    @Id
    @SequenceGenerator(name = "lobby_sequence", sequenceName = "lobby_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lobby_sequence")
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToMany
    private Set<User> users;

    @Column
    private boolean isPublic;

}
