package com.example.ekm.Repository;

import com.example.ekm.Model.Game;
import com.example.ekm.Model.GameUser;
import com.example.ekm.Model.Point;
import com.example.ekm.Model.Trail;
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
public class GameRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private GameUserRepository users;

    @Autowired
    private GameRepository games;

    private GameUser gameUser = new GameUser();
    private GameUser gameUser1 = new GameUser();

    private Game game = new Game();
    private Game game1 = new Game();
    private Game game2 = new Game();

    private Point mois1 = new Point();
    private Point mois2 = new Point();

    private Point surnuaed1 = new Point();

    private Trail moisad = new Trail();
    private Trail surnuaiad = new Trail();

    @Before
    public void fillSomeDataIntoOurDb() {
        // Add new Trails to Database
        moisad = entityManager.persist(moisad);
        surnuaiad = entityManager.persist(surnuaiad);

        // Add Trails to Points
        mois1.setTrail(moisad);
        mois2.setTrail(moisad);
        surnuaed1.setTrail(surnuaiad);

        // Add new Points to Database
        surnuaed1.setName("Tartu surnuaed");
        entityManager.persist(mois1);
        entityManager.persist(mois2);

        entityManager.persist(surnuaed1);

        // Add names for Users
        gameUser.setUsername("mari");
        gameUser1.setUsername("jüri");

        // Add new Users to Database
        gameUser = entityManager.persist(gameUser);
        gameUser1 = entityManager.persist(gameUser1);

        // Add Users to Games
        game.setGameUser(gameUser);
        game1.setGameUser(gameUser1);
        game2.setGameUser(gameUser);

        game.setTrail(surnuaiad);
        game.setPoint(surnuaed1);

        // Add new Games to Database
        entityManager.persist(game);
        entityManager.persist(game1);
        entityManager.persist(game2);
    }

    @Test
    public void testFindByGameUser() {
        List<Game> userGames = games.findByGameUser(gameUser);

        assertEquals(2, userGames.size());
    }

    @Test
    public void testFindByTrailAndGameUser() {
        List<Game> userGames = games.findByTrailAndGameUser(surnuaiad, gameUser);

        assertEquals(1, userGames.size());
    }

    @Test
    public void testFindByPointAndGameUser() {
        Game userGame = games.findByPointAndGameUser(surnuaed1, gameUser);

        assertEquals("Tartu surnuaed", userGame.getPoint().getName());
        assertEquals("mari", userGame.getGameUser().getUsername());
    }
}
