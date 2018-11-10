package com.example.ekm.Repository;

import com.example.ekm.Model.Point;
import com.example.ekm.Model.Trail;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PointRepository extends CrudRepository<Point, Long> {
    List<Point> findAllByTrail(Trail trail);

    List<Point> findAll();
}
