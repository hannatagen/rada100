package com.example.ekm.Repository;

import com.example.ekm.Model.GameUser;
import com.example.ekm.Model.Point;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@DataJpaTest
public class GameUserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private GameUserRepository users;

    private GameUser gameUser = new GameUser();

    @Before
    public void fillSomeDataIntoOurDb() {
        gameUser.setUsername("mari");

        // Add new User to Database
        entityManager.persist(gameUser);
    }

    @Test
    public void testFindByUsername() {
        GameUser gameUser = users.findByUsername("mari");

        assertEquals("mari", gameUser.getUsername());
    }
}
