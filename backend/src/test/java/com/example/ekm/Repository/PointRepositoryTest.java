package com.example.ekm.Repository;

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
public class PointRepositoryTest {
    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private PointRepository pointRepository;

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
        entityManager.persist(mois1);
        entityManager.persist(mois2);

        entityManager.persist(surnuaed1);
    }

    @Test
    public void testFindAll() {
        List<Point> allPoints = pointRepository.findAll();

        assertEquals(3, allPoints.size());
    }

    @Test
    public void testFindAllByTrail() {
        List<Point> allPoints = pointRepository.findAllByTrail(moisad);

        assertEquals(2, allPoints.size());
    }
}
