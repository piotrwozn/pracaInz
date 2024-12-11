package com.RPGTime.backendmysql.forum.topic;

import com.RPGTime.backendmysql.general.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    // Tematy założone przez danego użytkownika
    List<Topic> findByAuthor(User author);

    // Wszystkie tematy zwracane przez findAll()

    // Tematy, w których użytkownik ma posty (powiązane)
    @Query("""
        SELECT DISTINCT t 
        FROM TOPIC t
        JOIN t.posts p
        WHERE p.author = :user
    """)
    List<Topic> findRelatedTopicsByUser(User user);
}
